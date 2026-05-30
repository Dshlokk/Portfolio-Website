/**
 * RippleGrid - Vanilla JS Version
 * Ported from React Bits component
 */
class RippleGrid {
    constructor(options = {}) {
        this.container = options.container || document.body;
        this.config = {
            enableRainbow: options.enableRainbow !== undefined ? options.enableRainbow : false,
            gridColor: options.gridColor || '#6366f1',
            rippleIntensity: options.rippleIntensity !== undefined ? options.rippleIntensity : 0.05,
            gridSize: options.gridSize !== undefined ? options.gridSize : 10.0,
            gridThickness: options.gridThickness !== undefined ? options.gridThickness : 20.0,
            fadeDistance: options.fadeDistance !== undefined ? options.fadeDistance : 1.5,
            vignetteStrength: options.vignetteStrength !== undefined ? options.vignetteStrength : 2.0,
            glowIntensity: options.glowIntensity !== undefined ? options.glowIntensity : 0.2,
            opacity: options.opacity !== undefined ? options.opacity : 0.8,
            gridRotation: options.gridRotation !== undefined ? options.gridRotation : 0,
            mouseInteraction: options.mouseInteraction !== undefined ? options.mouseInteraction : true,
            mouseInteractionRadius: options.mouseInteractionRadius !== undefined ? options.mouseInteractionRadius : 1.2
        };

        this.mousePosition = { x: 0.5, y: 0.5 };
        this.targetMouse = { x: 0.5, y: 0.5 };
        this.mouseInfluence = 0;
        this.targetInfluence = 0;

        this.init();
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
            : [1, 1, 1];
    }

    init() {
        // Create canvas container
        this.canvasContainer = document.createElement('div');
        this.canvasContainer.className = 'ripple-grid-wrapper';
        Object.assign(this.canvasContainer.style, {
            position: 'fixed',
            inset: '0',
            zIndex: '-1',
            pointerEvents: 'none',
            overflow: 'hidden'
        });
        this.container.appendChild(this.canvasContainer);

        const { Renderer, Program, Triangle, Mesh } = ogl;

        this.renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true
        });
        this.gl = this.renderer.gl;
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        
        this.gl.canvas.style.width = '100%';
        this.gl.canvas.style.height = '100%';
        this.canvasContainer.appendChild(this.gl.canvas);

        const vert = `
            attribute vec2 position;
            varying vec2 vUv;
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const frag = `
            precision highp float;
            uniform float iTime;
            uniform vec2 iResolution;
            uniform bool enableRainbow;
            uniform vec3 gridColor;
            uniform float rippleIntensity;
            uniform float gridSize;
            uniform float gridThickness;
            uniform float fadeDistance;
            uniform float vignetteStrength;
            uniform float glowIntensity;
            uniform float opacity;
            uniform float gridRotation;
            uniform bool mouseInteraction;
            uniform vec2 mousePosition;
            uniform float mouseInfluence;
            uniform float mouseInteractionRadius;
            varying vec2 vUv;

            float pi = 3.141592;

            mat2 rotate(float angle) {
                float s = sin(angle);
                float c = cos(angle);
                return mat2(c, -s, s, c);
            }

            void main() {
                vec2 uv = vUv * 2.0 - 1.0;
                uv.x *= iResolution.x / iResolution.y;

                if (gridRotation != 0.0) {
                    uv = rotate(gridRotation * pi / 180.0) * uv;
                }

                float dist = length(uv);
                float func = sin(pi * (iTime - dist));
                vec2 rippleUv = uv + uv * func * rippleIntensity;

                if (mouseInteraction && mouseInfluence > 0.0) {
                    vec2 mouseUv = (mousePosition * 2.0 - 1.0);
                    mouseUv.x *= iResolution.x / iResolution.y;
                    float mouseDist = length(uv - mouseUv);
                    
                    float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
                    
                    float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
                    rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
                }

                vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
                vec2 b = abs(a);

                float aaWidth = 0.5;
                vec2 smoothB = vec2(
                    smoothstep(0.0, aaWidth, b.x),
                    smoothstep(0.0, aaWidth, b.y)
                );

                vec3 color = vec3(0.0);
                color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
                color += exp(-gridThickness * smoothB.y);
                color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
                color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

                if (glowIntensity > 0.0) {
                    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
                    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
                }

                float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
                
                vec2 vignetteCoords = vUv - 0.5;
                float vignetteDistance = length(vignetteCoords);
                float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
                vignette = clamp(vignette, 0.0, 1.0);
                
                vec3 t;
                if (enableRainbow) {
                    t = vec3(
                        uv.x * 0.5 + 0.5 * sin(iTime),
                        uv.y * 0.5 + 0.5 * cos(iTime),
                        pow(cos(iTime), 4.0)
                    ) + 0.5;
                } else {
                    t = gridColor;
                }

                float finalFade = ddd * vignette;
                float alpha = length(color) * finalFade * opacity;
                gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
            }
        `;

        this.uniforms = {
            iTime: { value: 0 },
            iResolution: { value: [1, 1] },
            enableRainbow: { value: this.config.enableRainbow },
            gridColor: { value: this.hexToRgb(this.config.gridColor) },
            rippleIntensity: { value: this.config.rippleIntensity },
            gridSize: { value: this.config.gridSize },
            gridThickness: { value: this.config.gridThickness },
            fadeDistance: { value: this.config.fadeDistance },
            vignetteStrength: { value: this.config.vignetteStrength },
            glowIntensity: { value: this.config.glowIntensity },
            opacity: { value: this.config.opacity },
            gridRotation: { value: this.config.gridRotation },
            mouseInteraction: { value: this.config.mouseInteraction },
            mousePosition: { value: [0.5, 0.5] },
            mouseInfluence: { value: 0 },
            mouseInteractionRadius: { value: this.config.mouseInteractionRadius }
        };

        const geometry = new Triangle(this.gl);
        const program = new Program(this.gl, { vertex: vert, fragment: frag, uniforms: this.uniforms });
        this.mesh = new Mesh(this.gl, { geometry, program });

        this.resize = () => {
            if (!this.canvasContainer) return;
            const w = window.innerWidth;
            const h = window.innerHeight;
            this.renderer.setSize(w, h);
            this.uniforms.iResolution.value = [w, h];
        };

        this.handleMouseMove = e => {
            if (!this.config.mouseInteraction) return;
            const x = e.clientX / window.innerWidth;
            const y = 1.0 - (e.clientY / window.innerHeight);
            this.targetMouse = { x, y };
        };

        this.handleMouseEnter = () => {
            if (!this.config.mouseInteraction) return;
            this.targetInfluence = 1.0;
        };

        this.handleMouseLeave = () => {
            if (!this.config.mouseInteraction) return;
            this.targetInfluence = 0.0;
        };

        window.addEventListener('resize', this.resize);
        if (this.config.mouseInteraction) {
            window.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseenter', this.handleMouseEnter);
            document.addEventListener('mouseleave', this.handleMouseLeave);
        }

        this.resize();
        this.render = this.render.bind(this);
        requestAnimationFrame(this.render);
    }

    render(t) {
        this.uniforms.iTime.value = t * 0.001;

        const lerpFactor = 0.1;
        this.mousePosition.x += (this.targetMouse.x - this.mousePosition.x) * lerpFactor;
        this.mousePosition.y += (this.targetMouse.y - this.mousePosition.y) * lerpFactor;

        const currentInfluence = this.uniforms.mouseInfluence.value;
        this.uniforms.mouseInfluence.value += (this.targetInfluence - currentInfluence) * 0.05;

        this.uniforms.mousePosition.value = [this.mousePosition.x, this.mousePosition.y];

        this.renderer.render({ scene: this.mesh });
        this.frameRequest = requestAnimationFrame(this.render);
    }

    destroy() {
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseenter', this.handleMouseEnter);
        document.removeEventListener('mouseleave', this.handleMouseLeave);
        cancelAnimationFrame(this.frameRequest);
        if (this.canvasContainer && this.canvasContainer.parentNode) {
            this.canvasContainer.parentNode.removeChild(this.canvasContainer);
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.rippleGrid = new RippleGrid();
});
