# Shilong Wang's Personal Homepage

A modern, responsive, and bilingual personal homepage website designed to showcase professional skills, academic achievements, and project experience.

## Features

- 📱 **Fully Responsive**: Looks great on all devices, from mobile phones to desktops.
- 🌐 **Bilingual Support**: Easily switch between English and Chinese.
- 🎨 **Modern UI/UX**: Clean design with smooth animations and interactive elements.
- 🚀 **Fast & Lightweight**: Optimized with vanilla JavaScript for fast loading times.
- 🧩 **Component-Based Sections**: Clearly organized sections for profile, skills, publications, projects, and awards.

## Tech Stack

- **HTML5**: Semantic and well-structured markup.
- **CSS3**: Modern styling with Flexbox, Grid, and animations.
- **JavaScript (ES6+)**: Vanilla JS for interactivity and internationalization (i18n).
- **Font Awesome**: For a rich set of high-quality icons.

## How to Use Icons from Font Awesome

This project uses [Font Awesome](https://fontawesome.com/icons) for all its icons. Here’s how you can easily find and use new icons to customize your site:

### 1. Find an Icon

Go to the [Font Awesome Icons Gallery](https://fontawesome.com/icons). Use the search bar to find an icon that fits your needs. For example, search for "email", "code", or "robot".

### 2. Select the Right Style

Font Awesome offers different icon styles (called "prefixes"). The free version of this project primarily uses:
- `fas`: Solid style (e.g., `<i class="fas fa-rocket"></i>`)
- `fab`: Brand style for logos (e.g., `<i class="fab fa-github"></i>`)

Make sure to select an icon from the **Free** collection.

### 3. Copy the HTML Code

Click on the icon you want. A window will pop up with the HTML code snippet. It will look something like this:
```html
<i class="fas fa-envelope"></i>
```
Simply copy this code.

### 4. Paste it into Your `index.html`

Paste the copied code into your `index.html` file where you want the icon to appear. For example, in the skills section:

```html
<li><i class="fas fa-file-code"></i> <span data-i18n="skill_cpp_python"></span></li>
```

**Important**: Always double-check that the icon name and prefix (`fas`, `fab`, etc.) are correct. If an icon doesn't show up, it's often because the name is misspelled or it belongs to the paid Pro version.

## Project Structure

```
personal_homepage/
├── index.html          # Main HTML file (the template)
├── styles.css          # All CSS styles
├── script.js           # JavaScript for interactivity and i18n
├── translations.js     # All text content for EN and ZH
└── README.md           # Project documentation
```

## Getting Started

1. **Clone or download the project:**
   ```bash
   git clone <repository-url>
   cd personal_homepage
   ```

2. **Open in your browser:**
   Simply open the `index.html` file in your web browser. No complex setup is needed.

## Customization Guide

### 1. Update Personal Information
All text content is managed in the `translations.js` file. To change your name, bio, project descriptions, etc., find the corresponding key (e.g., `"profile_name"`) and update its value for both `zh` (Chinese) and `en` (English).

### 2. Update Skills
- **Structure**: Modify the skills list in `index.html`.
- **Content**: Update the corresponding skill translations in `translations.js`.

### 3. Update Social & Project Links
Hardcoded links, such as your CSDN blog URL or social media links, can be found and updated directly in `index.html`.

## Future Improvements

- [ ] Dark/Light mode toggle
- [ ] SEO enhancements
- [ ] Add a blog section

---
⭐ If you find this project helpful, please give it a star!