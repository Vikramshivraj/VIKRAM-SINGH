
# Vicky Photography Portfolio

A premium, minimal photography portfolio featuring a Pinterest-style masonry layout and an AI-powered contact form.

## Hosting the Website

This project is built to be hosted on any modern static hosting platform.

### Quick Deployment (Recommended)

1. **Vercel**: 
   - Push this code to a GitHub repository.
   - Import the repository into [Vercel](https://vercel.com).
   - Add an environment variable named `API_KEY` and set it to your Gemini API key (from [Google AI Studio](https://aistudio.google.com/)).
   - Vercel will automatically handle the build and hosting.

2. **Netlify**:
   - Similar to Vercel, connect your repo.
   - Set the `API_KEY` in the Site Settings > Environment Variables.

## How the "Backend" Works

The contact form uses a **Client-Side Backend** logic via the Google Gemini API. 
Instead of sending a simple email, it "processes" the message to create a personalized AI response for the user, demonstrating a high-tech, modern studio experience.

### For Real Email Delivery
To receive actual emails in your inbox, you can replace the `handleSubmit` logic in `components/Contact.tsx` with a service like **Formspree** or **Netlify Forms**:

```javascript
// Example Formspree integration
const response = await fetch('https://formspree.io/f/your-form-id', {
  method: 'POST',
  body: JSON.stringify(formData),
  headers: { 'Accept': 'application/json' }
});
```

## Features
- **Masonry Grid**: Fluid Pinterest-style layout for photos.
- **Smart Form**: AI-generated confirmations.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop.
- **Minimal Aesthetic**: Focused on typography and photography.
