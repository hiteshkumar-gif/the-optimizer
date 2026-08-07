# ABTalks — 60-Day Developer Challenge

> **Problem Statement 1 — Redesign ABTalks**  
> *60 Days. One Streak. A Better Developer.*

ABTalks is a mobile-first coding challenge platform designed to help college developers build daily consistency, ship real proof of work to GitHub & LinkedIn, and never break their streak.

---

## 🗺️ Route Map

Provide the three routes below, one per line, in this exact order:

```text
/
/dashboard
/day/12
```

---

## 💡 Innovation — Streak Shield

**Streak Shield** is a UX innovation designed to prevent streak loss during high-risk days:

- When a student is about to miss a day or wants to safeguard momentum, the dashboard presents an emergency 5-minute quick-win challenge: **Fix 3 JavaScript Bugs**.
- Solving the interactive debugging task instantly activates the **Streak Shield**, protecting the user's 12-day streak without lowering quality standards.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Dark-mode first, glassmorphism, responsive at 390px)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Celebration Effects**: Canvas Confetti

---

## 📊 Mock Data Architecture

All student statistics, streak days, daily task details, achievement badges, and leaderboard rankings are driven by local JSON structures located in:
```text
/data/mockData.json
/lib/data.ts
/lib/types.ts
```

The app also includes a live **Judge Inspector & Edge Case Switcher** floating control allowing judges to test:
- **Normal State** (Day 12 Active)
- **New User** (0-Day Streak fallback)
- **Missed Day** (Streak Paused state)
- **Empty Profile** (Safe fallback values without `null` or `NaN`)

---

## 💻 Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/hiteshkumar/the_optimisers.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser (preferably in 390px mobile device view).

---

## ☁️ Deployment

Deploy easily to **Vercel**:

```bash
npx vercel
```

Or connect the GitHub repository directly to Vercel with automatic Next.js framework detection.

---

<div align="center">

### ✨ Vibe Coded by Hitesh Kumar

</div>
