# Project Instructions: Portfolio Website

This document provides foundational mandates, architectural patterns, and development workflows for the Portfolio Website project.

## 1. Project Overview
A modern, responsive portfolio website showcasing Web Development, Creative Direction, and Video Editing. The aesthetic is a "techy creative vibe" using purplish-blue gradients and smooth animations.

## 2. Technology Stack
- **Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Styling:** Vanilla CSS using CSS Variables for theme management.
- **Fonts:** Archivo Black (Display) and Work Sans (Body) via Google Fonts.
- **Assets:** SVGs for icons, images stored in `/assets`.

## 3. Architecture & File Structure
- `index.html`: Main landing page.
- `web-dev.html`: Web development showcase.
- `creative.html`: Creative direction portfolio.
- `video.html`: Video editing portfolio.
- `styles.css`: Central stylesheet for all pages.
- `script.js`: Shared JavaScript logic (animations, navigation, smooth scrolling).
- `/assets/`: Directory for images, icons, and favicons.

## 4. Coding Conventions

### 4.1. Styling (CSS)
- **Variables First:** Always use CSS variables defined in `:root` for colors, spacing, and transitions.
- **Responsive Design:** Follow mobile-first or desktop-first patterns consistently as established. 
  - Desktop: 1024px+
  - Tablet: 768px - 1023px
  - Mobile: < 768px
- **Units:** Use `rem` or `em` for font sizes and spacing where appropriate; use `px` for fine-tuned borders/shadows.

### 4.2. Interactivity (JavaScript)
- **Vanilla Only:** Do not add external libraries (jQuery, etc.) unless specifically requested.
- **DOM Content Loaded:** Ensure scripts run after the DOM is fully loaded.
- **Performance:** Use `IntersectionObserver` for scroll-based animations to keep performance high.

### 4.3. HTML
- **Semantic Tags:** Use `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` for structure.
- **Accessibility:** Ensure images have `alt` tags and interactive elements have proper focus states.

## 5. Development Workflow
- **Surgical Updates:** When modifying styles, target specific classes in `styles.css` rather than adding inline styles.
- **Testing:** Verify changes across all three main pages (`index`, `web-dev`, `creative`, `video`) as they share `styles.css` and `script.js`.
- **Media Assets:** Optimize all images before adding them to the `/assets` folder.
