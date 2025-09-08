# LEGACY Store

Modern storefront for digital and non-digital products. Powered by Firebase Firestore and deployed on Vercel. Built with TypeScript, vanilla JS, and CSS.

## Pages
- `/` Landing (featured products)
- `/shop` Shop (featured + catalog)
- `/about` About & Rules (content from Firestore `settings/rules`)
- `/admin` Admin panel (ID + password gate; CRUD for products and rules)

## Firebase
- Firestore collections:
  - `products` documents:
    - `title` (string)
    - `description` (string)
    - `price` (number)
    - `imageUrl` (string)
    - `buyUrl` (string)
    - `featured` (boolean)
    - `createdAt` (number)
    - `updatedAt` (number)
  - `settings/rules` document:
    - `markdown` (string)
    - `updatedAt` (number)

- Security rules in `public/firestore.rules` (public read, no public writes). For admin writes, use the `/admin` panel; it writes from the client for simplicity. For production, move writes to server functions.

## Branding
- Name: LEGACY
- Colors: black, white, lime green

## Deploy
- Host `public/` as static assets on Vercel. API routes are optional.
