# ⚡ VISIONARY '26 // HARSHIT MISHRA

Yo! Welcome to my personal portfolio playground. This isn't your typical template-copy corporate page. It's a loud, cell-shaded, neubrutalist creative deck built to showcase the tools I build, how I build them, and the stack I weaponize daily.

👉 Check out the live build here: [helpful-medovik-d996bb.netlify.app](https://helpful-medovik-d996bb.netlify.app/)

Original Figma design specs: [Generate Preview Feature](https://www.figma.com/design/RqKZWxWMcueNEfEyaOPi7A/Generate-Preview-Feature)

---

## 🛠️ The Feature Set

### 1. The Services Orbit (Scroll-Pinning)
A timeline services wheel that locks the screen in place as you scroll. It spins a custom orbit displaying cards for **Websites, E-Commerce, CRMs, Automations, and Custom Mobile Apps** before unlocking. Made using React state offsets so it stays butter-smooth on mobile and desktop without lagging.

### 2. Smart Spec Previews (Interactive Generator)
An interactive layout compiler. Type in a concept name, paste a prompt description, select a brand color, and hit generate. 
* **The Telemetry Console**: Prints real-time compiling logs inside a terminal mockup while parsing.
* **Context-Aware Previews**: The engine scans your text keywords (like *crypto*, *finance*, *music*, *ai*, *bot*) and dynamically customizes the mocked metrics, layout tabs, icons, and dialogue bubbles to match the theme of your prompt.

### 3. The Arsenal (Tactical Tech HUD)
An interactive loadout matrix above the contact sheet styled like retro-game weapon cards. It tracks:
* **Primary Weapons** (React, Next.js, TS, Tailwind)
* **Heavy Artillery** (Node, PostgreSQL, Python, GraphQL)
* **Tactical Gear** (Git, Docker, Figma, VS Code)
Every card has hover-tilt springs, telemetry stats (Caliber, Ammo, Speed), and glowing status loaders.

### 4. Cyber-Brutalism Dark Mode
A floating theme switcher on the navigation bar that toggles a high-contrast Cyber-Brutalism dark mode theme. It overrides all neubrutalist card backgrounds, borders, scrollbar tracks, selection highlights, and parallax floating svg assets instantly to keep layouts perfectly legible and gorgeous in low-light environments. Persists automatically using local storage!

---

## ⚡ Running Locally

To run this on your machine:

1. **Install dependencies:**
   ```bash
   npm i
   ```

2. **Start local dev server:**
   ```bash
   npm run dev
   ```

3. **Build production assets:**
   ```bash
   npm run build
   ```