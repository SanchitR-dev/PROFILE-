# Sanchit Rawool — Portfolio

A modern, fast, and responsive developer portfolio showcasing projects, skills, certifications, and services. Built with semantic HTML, custom CSS, and vanilla JavaScript plus a few lightweight libraries for animations and polish.

## Live preview
- Local: open `index.html` in your browser
- Hosting: drag-and-drop the folder to Netlify, Vercel, or enable GitHub Pages (Settings → Pages → Deploy from branch → `/` root)

## Features
- Hero with particles and smooth AOS scroll animations
- Professional tagline and About section
- Dark/Light mode toggle (saved via localStorage)
- Statistics/Achievements counters (animated on scroll)
- Featured Projects with expandable case studies
- Services section (Full‑Stack, UI/UX, AI Tools)
- Contact section with glassmorphism styling and social links
- Loading screen with a blue “ghost” micro‑animation
- Performance optimizations: lazy‑loaded images, GPU‑accelerated transforms, IntersectionObserver, throttled/RAF scroll, SEO meta tags

## Tech stack
- HTML5, CSS3, JavaScript (no build step)
- TailwindCSS CDN (utility classes), Font Awesome, Google Fonts
- AOS (Animate On Scroll), Particles.js

## Project structure
```
my-portfolio/
├─ index.html        # Main page (sections, content, SEO)
├─ style.css         # Custom styles, glassmorphism, themes, animations
├─ script.js         # Interactivity, theme, counters, lazy loading, AOS/particles
├─ Feed.jpg          # Project image (Feedback app)
├─ QR.jpg            # Project image (Digi MenuCard)
├─ MH.jpg            # Project image (Hotel Maharaja)
├─ Foodie .jpg       # Project image (Foodie Friend)
└─ README.md         # This file
```

## Customize
- About text: `index.html` → section `#about`
- Social links: `index.html` → section `#contact`
- Stats numbers: `index.html` → section `#stats` → `data-target` on `.stat-number`
- Projects: `index.html` → section `#projects` (update titles, links, images, and optional case studies)
- Loading screen: `index.html` → `#loading-screen`; styles in `style.css`; fade‑out timing in `script.js`
- SEO: update `og:url` and `twitter:url` in `<head>` of `index.html`

## How to run locally
- Double‑click `index.html` to open in your browser, or
- Use VS Code + Live Server for auto‑reload

## Deployment
- GitHub Pages: Settings → Pages → Deploy from branch (main) → root; wait for green check and open the provided URL
- Netlify: drag and drop the folder on app.netlify.com; or connect the repo and deploy from `main`

## Notes
- Keep image file names consistent with references in `index.html`
- You can add more projects by duplicating one project block and updating content/links
- The theme toggle uses `data-theme` on `<html>`; styles live under `[data-theme="dark"]` in `style.css`

## Credits
- AOS: https://michalsnik.github.io/aos/
- Particles.js: https://vincentgarreau.com/particles.js/
- Font Awesome: https://fontawesome.com/
- Tailwind CDN: https://cdn.tailwindcss.com/

## License
No license specified. Add a LICENSE file if you intend others to reuse your work.

## Contact
- Email: sanchitrawool@gmail.com | mac44srm@gmail.com
- GitHub: https://github.com/SanchitRawool36
- LinkedIn: https://in.linkedin.com/in/sanchit-rawool-136879313
