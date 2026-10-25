# NOIR — Premium Clothing Store Demo

A polished, responsive luxury-streetwear storefront built with **React + Vite + Tailwind CSS** for Built By Amos.

## Included

- Editorial cream/beige luxury design
- Responsive desktop and mobile navigation
- Product grid with category filters
- Product quick view with size selection
- Wishlist toggle
- Interactive shopping bag with quantity controls
- WhatsApp order message prefilled with items and subtotal
- Newsletter UI interaction
- Story, journal, service highlights and footer
- Built By Amos attribution

> This is a front-end demo. It does not include a payment gateway, inventory system, database, real newsletter service, or order management backend. Product photography is loaded from Unsplash and requires an internet connection.

## Requirements

- Node.js 18+ (Node.js 20 LTS recommended)
- npm

## Run locally

1. Extract the ZIP and open the `noir-clothing-store` folder in VS Code.
2. Open a terminal in that folder.
3. Install packages:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL Vite prints, usually `http://localhost:5173`.

## Configure WhatsApp

Open `src/App.jsx` and find this line inside `orderOnWhatsApp`:

```js
const phone = '919999999999'
```

Replace it with the store owner's WhatsApp number in international format, digits only (country code + number, no `+`, spaces or dashes). Example format for India: `91XXXXXXXXXX`.

## Build for production

```bash
npm run build
npm run preview
```

Vite outputs the production site to the `dist/` folder.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the repository.
4. Keep the defaults:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
5. Select **Deploy**.

## Deploy to Netlify

1. Push the project to GitHub or upload the project to Netlify.
2. Create a new site from the repository.
3. Set build command to `npm run build`.
4. Set publish directory to `dist`.
5. Deploy.

## Deploy to GitHub Pages (optional)

For Vite projects hosted at `https://USERNAME.github.io/REPOSITORY/`, set the Vite `base` option to `'/REPOSITORY/'` in `vite.config.js`, then build and publish `dist` using GitHub Pages. For a custom domain or root-domain deployment, the base can remain `/`.

## Before showing this to a real client

- Replace demo product names, descriptions, prices and photos with the client's assets.
- Configure the correct WhatsApp number.
- Add real contact details, shipping/return policies, privacy policy and terms.
- Connect a real newsletter provider if needed.
- Add a backend, inventory, payment gateway and order management for a production store.
- Verify product image rights and final brand assets before launch.

## Brand concept

**NOIR — Considered essentials.** A fictional demo brand created to showcase the kind of premium storefront Built By Amos can deliver.
