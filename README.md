# RD AI Labs Website

A dark, futuristic company website built with **React (Vite)**, **Tailwind CSS**, **Framer Motion** and **React Three Fiber (Three.js)**.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # test the production build locally
```

Requires Node.js 18 or newer.

## Folder structure

```
rd-ai-labs/
├── index.html              SEO meta tags, Open Graph, structured data
├── package.json
├── vite.config.js          Chunk splitting (3D code loads lazily)
├── tailwind.config.js      Brand colors, fonts, glow shadows
├── postcss.config.js
├── vercel.json             SPA routing for Vercel
├── .env.example            EmailJS keys template
├── public/
│   ├── favicon.svg
│   ├── logo.png            Your logo (shown in the page-load animation)
│   ├── _redirects          SPA routing for Netlify
│   └── robots.txt
└── src/
    ├── main.jsx            Entry + router
    ├── App.jsx             Page layout, routes, loader
    ├── data.js             ALL your content: edit this file
    ├── hooks.js            Smooth-scroll navigation helper
    ├── index.css           Theme, glass, gradient borders, animations
    └── components/
        ├── Navbar.jsx          Sticky glass navbar, active link, mobile menu
        ├── Hero.jsx            Animated headline + 3D / fallback switch
        ├── HeroScene.jsx       React Three Fiber neural-network sphere
        ├── Services.jsx        7 tilt cards
        ├── About.jsx           Story, mission, vision, counters, values, team
        ├── Portfolio.jsx       3 sample case studies with hover overlay
        ├── Careers.jsx         Perks + open positions
        ├── Blog.jsx            3 sample posts
        ├── Contact.jsx         Validated form, info, WhatsApp, map, hours
        ├── Footer.jsx
        ├── LegalPage.jsx       /privacy and /terms starter pages
        ├── Loader.jsx, CursorGlow.jsx, WhatsAppButton.jsx
        └── Reveal.jsx, TiltCard.jsx, Counter.jsx, Visual.jsx, Logo.jsx, SectionHeading.jsx
```

## 1. Replace the placeholders

Open **`src/data.js`** and edit the `COMPANY` block at the top:

| Field | What to put |
|-------|-------------|
| `email` | Your business email |
| `phone` | Phone number shown on the page |
| `whatsapp` | Digits only with country code, e.g. `919876543210` |
| `address` | Office address (also drives the Google Map) |
| `social` | Your LinkedIn, Instagram, X and GitHub links |
| `hours` | Working hours |

Also update `STATS` (counters), `TEAM`, `PROJECTS`, `JOBS` and `POSTS` with your real content.
Portfolio and blog entries are **sample content**, so replace them before launch.

In `index.html`, replace `https://www.yourdomain.com/` with your real domain.

**Team photos:** put images in `public/team/` and set `photo: '/team/name.jpg'` in `TEAM`.

## 2. Make the contact form send email (EmailJS)

1. Create a free account at https://www.emailjs.com
2. Add an **Email Service** (Gmail, Outlook, etc.) and an **Email Template**.
   In the template use these variables: `{{from_name}}`, `{{reply_to}}`, `{{phone}}`, `{{message}}`.
3. Copy `.env.example` to `.env` and fill in:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
   ```
4. Restart `npm run dev`.

Until the keys are set, the form falls back to opening the visitor's email app with the message pre-filled.

## 3. Deploy

### Vercel
1. Push the project to GitHub.
2. Go to https://vercel.com, click **Add New, Project**, and import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist`.
4. Under **Environment Variables**, add the three `VITE_EMAILJS_*` values.
5. Click **Deploy**. Then add your custom domain under **Settings, Domains**.

### Netlify
1. Push the project to GitHub.
2. Go to https://app.netlify.com, click **Add new site, Import an existing project**.
3. Build command `npm run build`, publish directory `dist`.
4. Under **Site configuration, Environment variables**, add the three `VITE_EMAILJS_*` values.
5. Click **Deploy**. Add your domain under **Domain management**.

(Drag-and-drop also works: run `npm run build` and drop the `dist` folder onto Netlify.)

## Performance and fallbacks

- The 3D scene is code-split and only downloads on capable devices.
- **Mobile, low-end devices (2 or fewer CPU cores / 2 GB or less RAM), no-WebGL browsers and users with "reduce motion" turned on** get a lightweight CSS animation instead of WebGL.
- The 3D render loop pauses when the hero is scrolled off-screen.

## Good to know

- The theme colors live in `tailwind.config.js` (`brand` and `ink`).
- The privacy and terms pages are **starter templates**. Have them reviewed before publishing.
- For better Google ranking later, you can migrate to Next.js. The components move over with little change.
