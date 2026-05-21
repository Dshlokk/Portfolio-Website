# Portfolio Website

A modern, responsive portfolio website showcasing web development, creative direction, and video editing work.

## Features

- **Homepage**: Personal introduction with profile photo and social media links (Instagram & LinkedIn)
- **Web Development Page**: Interactive website showcase with iframe previews
- **Creative Direction Page**: YouTube playlist embed and Instagram Reel showcasing creative work
- **Video Editing Page**: Canva portfolio integration with interactive preview

## File Structure

```
portfolio/
├── index.html          # Homepage
├── web-dev.html        # Web Development portfolio
├── creative.html       # Creative Direction showcase
├── video.html          # Video Editing portfolio
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

1. **Add Your Photo**:
   - Replace the SVG placeholder in `index.html` (line 28-33) with your actual photo:
   ```html
   <img src="your-photo.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover;">
   ```

2. **Update Social Media Links**:
   - In `index.html`, find the floating social links section (around line 66)
   - Replace `yourusername` and `yourprofile` with your actual Instagram and LinkedIn handles

3. **Customize Personal Information**:
   - Update the hero title and description in `index.html`
   - Add your name and personal details

4. **Open in VS Code**:
   - Open the folder in VS Code
   - Install "Live Server" extension (optional but recommended)
   - Right-click on `index.html` and select "Open with Live Server"

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Grid/Flexbox)
- Vanilla JavaScript
- Google Fonts (Archivo Black & Work Sans)
- Responsive Design
- CSS Animations

## Color Scheme

- Primary: #6366F1 (Indigo Blue)
- Secondary: #8B5CF6 (Purple)
- Accent: #EC4899 (Pink)
- Cyan: #06B6D4 (Bright Cyan)
- Dark: #0F172A (Deep Navy)
- Light: #F1F5F9 (Soft White)

**Theme**: Techy creative vibe with purplish-blue gradients

## Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## Features Highlight

### Web Development Page
- Floating website preview buttons
- Modal with embedded iframe previews
- Direct links to live websites
- Technology stack showcase

### Creative Direction Page
- YouTube playlist embed
- Project details with role breakdown
- Key responsibilities showcase
- Skills display

### Video Editing Page
- Canva portfolio embed
- Interactive preview overlay
- Editing capabilities grid
- Software tools showcase

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

- Optimized CSS with variables
- Lazy loading for iframes
- Smooth animations with CSS transforms
- Minimal JavaScript for better performance

## Customization

To customize colors, update the CSS variables in `styles.css`:

```css
:root {
    --primary: #FF6B35;
    --secondary: #004E89;
    --accent: #F7B801;
    /* ... other variables */
}
```

## License

This portfolio template is free to use and modify for personal projects.

## Credits

- Fonts: Google Fonts
- Icons: SVG icons
- Design: Custom modern aesthetic

---

**Note**: Remember to replace placeholder content with your actual information and images before deploying!
