# PTHREE Expo Attract Presentation

This is a premium, full-screen React animation experience for PTHREE, designed to run continuously on a TV placed outside an expo stall.

## Setup Instructions

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173/expo-attract` (Actually we set this up on `/` for simplicity, just open `http://localhost:5173/`)
4. Press `F` for browser fullscreen
5. Press `M` to view operator controls
6. Build for production: `npm run build`

## Assets to Add

- **Real PTHREE Logo:** Place `pthree-logo.svg` in `/public/` and update `src/components/LogoReveal.jsx`.
- **Demo QR Code:** Place `pthree-demo-qr.png` in `/public/` and update `src/components/RoiCtaScene.jsx`.
