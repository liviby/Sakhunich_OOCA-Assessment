# Mooca — Warm-Up Body & Mind Before You Go!

A short, guided warm-up flow (countdown → breathing → movement → focus → wrap-up) built as a lightweight, dependency-free HTML/CSS/JS web app with animated SVG scenes for each step.

## Project Structure

```
mooca/
├── index.html              # App shell — loads CSS/JS and mounts each screen
├── css/
│   └── style.css           # All styles (layout, animations, curtain background)
├── js/
│   ├── loader.js           # Fetches screens/*.html and injects them into the DOM, then loads app.js
│   └── app.js               # All app logic: countdown, breathing cycle, movement steps, screen transitions
└── screens/                 # Each screen (SVG scene + markup) as its own file
    ├── curtains.html         # Opening/closing curtain overlay (shared across screens)
    ├── start.html             # Start screen
    ├── count.html             # Countdown screen
    ├── breathe.html           # Breathing exercise (inhale / hold / exhale)
    ├── move.html              # Body movement screen
    ├── focus.html             # Focus screen
    ├── preend.html            # Pre-ending screen
    └── ending.html            # Ending screen
```

## Flow

`start → count → breathe → move → focus → preend → ending`

Each transition is driven by custom events (`mooca:countdown-done`, `mooca:breathing-done`, `mooca:move-done`) dispatched from `app.js`, so each stage triggers the next automatically.

## Tech Stack

- Plain HTML, CSS, and JavaScript — no frameworks, no build step
- Inline SVG for all illustrations and animations
- Google Fonts (Prompt) for typography
