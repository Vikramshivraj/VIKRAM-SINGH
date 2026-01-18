
# 📸 Vicky Photography Portfolio

A premium, minimal photography portfolio featuring a Pinterest-style masonry layout, cinematic animations, and Gemini AI integration.

## 🚀 Quick Start: Hosting Your Site

This project is optimized for "No-Build" deployment, meaning you can serve it directly as static files.

### 1. Host with Vercel (Recommended)
1. **Upload to GitHub**: Create a new repository and push your files.
2. **Import to Vercel**: Connect your repo at [vercel.com](https://vercel.com).
3. **Env Vars**: Add `API_KEY` (Gemini) in Settings > Environment Variables.

### 2. Adding a Custom Domain
To make your site "functional" with a personalized URL (e.g., `www.yourname.com`):

1. **In Vercel**: Go to **Settings > Domains**, type your domain, and click **Add**.
2. **Update DNS at your Registrar** (GoDaddy, Namecheap, etc.):
   - **Type A**: Name `@`, Value `76.76.21.21`
   - **Type CNAME**: Name `www`, Value `cname.vercel-dns.com`
3. **Wait**: DNS changes can take up to 24 hours to propagate worldwide.

## 🛠 Features
- **Zero-Build Architecture**: Uses ESM Import Maps for lightning-fast loading.
- **Dynamic SEO**: Pre-configured Meta Tags for professional social sharing.
- **AI-Powered Contact Form**: Uses Gemini 3 Flash for personalized automated replies.
- **Cinematic Motion**: Integrated Veo video generation for photo animation.

## 🎨 Aesthetic Guidelines
- **Typography**: Playfair Display (Serif) & Inter (Sans).
- **Colors**: `#F8F8F6` (Alabaster), `#1C1C1C` (Ebony), `#7A8F7A` (Sage).
