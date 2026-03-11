# Par-A-Dice Content System

A modular content production engine for multi-outlet hospitality brands. Built as a spec project for [Par-A-Dice Hotel Casino](https://www.paradicehotel.com/) in East Peoria, IL.

**[Live Demo →](https://pad-content.vercel.app)**

---

## What It Does

Generates shot-by-shot video storyboards with style recommendations, equipment lists, and platform-ready captions — all tuned to individual venue brands.

### The Problem
Multi-outlet properties need consistent, high-quality content across brands with very different identities. A bar & grill and a steakhouse at the same casino shouldn't look the same on Instagram.

### The Solution
1,200 visual production styles organized into 25 categories, mapped to 4 outlets with brand-aware generation. The system understands that William B's Steakhouse wants slow, warm, sophisticated — while Tin Lizard Bar & Grill wants fast, loud, fun.

---

## Features

### 🎬 Storyboard Generator
- **Outlet → Mood → Duration → Full Storyboard** in seconds
- Shot-by-shot breakdowns with action descriptions, intent lines, and style references
- Visual timeline proportional to shot duration
- 8 mood presets that bias style selection (Intimate, High Energy, Cinematic, etc.)
- Creativity slider from "Brand Lock" to "Wild Card"

### 📂 Style Browser
- 1,200 styles across 25 categories (Typography, Camera, Lighting, Aerial, Thermal, 360°, BTS, and more)
- Fuzzy search with outlet filtering
- Add individual styles to shot lists

### 🎚️ Equipment Integration
- Full gear registry (cinema cameras, drones, lenses, lighting, audio, motion)
- Smart gear-to-shot matching based on beat type AND style content
- Drone-specific recommendations (indoor → Mini 4 Pro, cinematic → Mavic 4 Pro, thermal → Matrice 4TD)

### 🧠 Learning Engine
- Contextual signals: tracks outlet, mood, beat type, and timestamp per interaction
- 14-day half-life decay so preferences evolve
- Negative signals from compare-view losers
- Taste Profile dashboard showing category tendencies, top styles, outlet activity
- Export/import JSON for cross-device sync

### ⚖️ Compare View
Side-by-side storyboard comparison with "Pick Winner" — the system learns from your choices.

### 📑 Treatment Export
Print-ready production treatment layout with timeline, shot cards, gear lists, CTA, and caption.

---

## Outlets

| Outlet | Type | Brand Profile |
|--------|------|---------------|
| 🦎 Tin Lizard | Bar & Grill | Fast, loud, warm, casual, fun |
| 🥩 William B's | Steakhouse | Slow, quiet, warm, refined, serious |
| 🥪 Nelson's Deli | Quick Service | Very fast, moderate, neutral, casual |
| 🎰 Par-A-Dice | Casino & Hotel | Moderate pace, high energy, prestigious |

---

## Tech

- React + Vite
- Zero backend — all client-side
- localStorage persistence + JSON export for portability
- Deployed on Vercel

---

## Development

```bash
npm install
npm run dev
```

---

*Spec portfolio project by JSDetail LLC. Not affiliated with Par-A-Dice Hotel Casino or Boyd Gaming.*
