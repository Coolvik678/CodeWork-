# Ferrero Rocher Premium Luxury Website

A professional, elegant website for the Ferrero Rocher premium chocolate brand featuring modern design patterns, smooth animations, and a luxurious aesthetic.

## 🎨 Design Vision

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary Gold** | #D4AF37 | Accents, buttons, highlights |
| **Dark Chocolate** | #3D2314 | Primary backgrounds, text |
| **Milk Chocolate** | #8B5A2B | Secondary elements |
| **Cream** | #F5E6D3 | Light backgrounds |
| **White Gold** | #FAF9F6 | Cards, sections |
| **Black** | #1A1A1A | Premium contrast sections |

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body**: Montserrat (clean sans-serif)
- **Accent**: Great Vibes (script font)

## 📁 Project Structure

```
ferrero-rocher-website/
├── index.html              # Main HTML file with all sections
├── css/
│   └── styles.css          # All custom styles
├── js/
│   └── main.js             # Interactivity and animations
├── images/                 # Image assets (placeholder)
└── README.md               # Project documentation
```

## 🚀 Features

### Navigation
- Fixed/sticky header with blur effect on scroll
- Smooth scroll to sections
- Mobile hamburger menu with animation
- Active section highlighting

### Hero Section
- Full viewport height with gradient background
- Animated text entrance
- Call-to-action buttons with hover effects
- Scroll indicator with animation

### Products Section
- 6 product cards in responsive grid (3/2/1 columns)
- Hover zoom and overlay effects
- Gold underline animations on links
- Staggered entrance animations

### About Section
- Two-column layout with image and content
- Elegant gold border frame
- Timeline of brand milestones
- Floating experience badge

### Stats Section
- Animated counter numbers
- Grid layout with hover effects
- Dark chocolate background with gold accents

### Contact Section
- Validated contact form
- Contact information with icons
- Social media links
- Success/error states

### Footer
- Multi-column layout
- Newsletter signup
- Social media icons
- Gold accent styling

## 🛠️ Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: No frameworks needed
- **Google Fonts**: Playfair Display, Montserrat, Great Vibes
- **Font Awesome 6**: Icons

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ✨ JavaScript Features

1. **Smooth Scrolling**: Anchor links with offset for fixed header
2. **Scroll Animations**: Intersection Observer for fade-in effects
3. **Counter Animation**: Stats numbers count up on scroll
4. **Form Validation**: Real-time validation with error messages
5. **Mobile Menu**: Hamburger toggle with smooth transitions
6. **Sticky Header**: Background appears on scroll
7. **Parallax Effect**: Subtle hero background movement
8. **Back to Top**: Appears after scrolling down

## 🎭 Animation Classes

- `fadeInUp`: Elements fade in and slide up
- `fadeIn`: Simple fade in
- `aos-animate`: Triggered by Intersection Observer

## 📝 Form Validation

### Contact Form
- **Full Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Message**: Required, minimum 10 characters

### Newsletter Form
- **Email**: Required, valid email format

## 🎯 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Installation

No build process required. Simply open `index.html` in a browser.

```bash
# Clone or download the project
cd ferrero-rocher-website

# Open in browser
open index.html
```

## 🖼️ Adding Images

Place your images in the `images/` folder and update the placeholder elements:

```html
<!-- For product images -->
<img src="images/products/ferrero-classic.jpg" alt="Ferrero Rocher Classic">

<!-- For hero background -->
<div class="hero-bg" style="background-image: url('images/hero-bg.jpg')">
```

## 🔧 Customization

### Colors
Update CSS variables in `:root`:

```css
:root {
    --gold-primary: #D4AF37;
    --chocolate-dark: #3D2314;
    /* ... */
}
```

### Fonts
Change Google Fonts import in HTML head:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Then update CSS variables:

```css
:root {
    --font-heading: 'Your Font', serif;
}
```

## 📄 License

This is a demonstration project. Ferrero Rocher is a registered trademark of Ferrero S.p.A.

## 🙏 Credits

- Design: Custom luxury chocolate brand aesthetic
- Icons: Font Awesome 6
- Fonts: Google Fonts
- Inspiration: Premium chocolate brand websites

---

**Built with ❤️ for Ferrero Rocher**
