
# 📸 Vicky Photography Portfolio

A premium, minimal photography portfolio featuring a Pinterest-style masonry layout, cinematic animations, and Gemini AI integration.

## 🚀 Quick Start: Hosting Your Site

This project is optimized for "No-Build" deployment, meaning you can serve it directly as static files.

### Option 1: Vercel (Recommended)
Vercel is the best platform for this portfolio. It offers global CDN performance and easy environment variable management.

1.  **Upload to GitHub**: Create a new repository and push your files.
2.  **Import to Vercel**: Go to [vercel.com](https://vercel.com), click "New Project", and select your repo.
3.  **Configure Environment Variables**:
    - Under **Settings > Environment Variables**, add a key named `API_KEY`.
    - Set the value to your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
4.  **Deploy**: Click "Deploy". No build command is required.

### Option 2: Netlify
1.  **Drag & Drop**: You can literally drag this project folder into the Netlify "Drop" zone.
2.  **Env Vars**: Go to **Site Configuration > Environment Variables** to add your `API_KEY`.

### Option 3: GitHub Pages
1.  **Enable Pages**: Go to your Repo Settings > Pages.
2.  **Source**: Set to "Deploy from a branch" (usually `main`).
3.  **Note**: GitHub Pages does not support server-side environment variables (`process.env.API_KEY`). For the contact form to work on GH Pages, you would need to hardcode the key (not recommended) or use a proxy. **Vercel/Netlify are much better for this reason.**

## 🛠 Features
- **Zero-Build Architecture**: Uses ESM Import Maps for lightning-fast loading without a complex build pipeline.
- **Masonry Layout**: A fluid, responsive Pinterest-style grid.
- **Interactive Lightbox**: Full-screen viewing with "Like" and "Share" functionality.
- **Persistent Likes**: Your favorite photos stay liked even after refreshing (using LocalStorage).
- **AI-Powered Contact Form**: Uses Gemini 3 Flash to generate personalized confirmation messages.
- **Veo Video Generation**: Integrated cinematic video generation for the "Animate Photo" feature.

## 🔑 API Configuration
This app requires a **Google Gemini API Key**.
- For **Contact Form**: Uses the `API_KEY` defined in your hosting provider's environment variables.
- For **Veo Video Generation**: The app uses the `window.aistudio.openSelectKey()` protocol, allowing users to select their own paid billing projects for heavy video workloads.

## 🎨 Aesthetic Guidelines
- **Typography**: Playfair Display (Serif) for headings, Inter (Sans) for body.
- **Colors**: `#F8F8F6` (Alabaster), `#1C1C1C` (Ebony), `#7A8F7A` (Sage).
- **Textures**: Subtle film grain and paper textures applied via CSS overlays.
