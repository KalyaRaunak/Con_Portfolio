# Pull Request Review Guide (Converge Portfolio Optimizations)

Hello! This guide outlines the performance optimizations, codebase refactoring, and animation adjustments made to this repository, along with the steps to merge and run the updated site locally.

---

## 📁 1. Codebase Modularity (Fixing Large Files)
To improve load speed, code readability, and build efficiency, we broke up the two largest files (`App.tsx` and `FilterGrid.tsx`) into dedicated sub-components and a shared data file:

* **`src/data/projects.ts` [NEW]:** Houses the project databases (`PROJECTS` and `FEATURED_PROJECTS`), separating raw static data arrays from React UI rendering code.
* **`src/components/FilterProjectCard.tsx` [NEW]:** Handles the card preview logic in the filterable work grid.
* **`src/components/LightboxModal.tsx` [NEW]:** Contains the responsive fullscreen slide carousel/video modal overlay.
* **`src/components/StatBlock.tsx` [NEW]:** Modular stats counter block.
* **`src/components/TorchLogoReveal.tsx` [NEW]:** Modular Mechanical online/offline logo reveal block.
* **`src/App.tsx` [MODIFIED]:** Cleaned and streamlined (reduced from 520 lines to under 150 lines).
* **`src/components/FilterGrid.tsx` [MODIFIED]:** Cleaned and streamlined (reduced from 930 lines to under 170 lines).
* **`src/components/ProjectCard.tsx` [MODIFIED]:** Fixed typing mismatch variables (`NodeJS.Timeout` typed to browser-safe context).

---

## ⚡ 2. Performance & Playback Optimizations

To resolve browser lags and CPU/GPU spikes caused by multiple background video decoders running simultaneously, we introduced a smarter rendering pipeline:
* **Option B: Play on Hover (Desktop):** Step previews remain as static cover/poster images by default. A video or slideshow cycles **only when the user hovers their mouse over that card**. This cuts active video decoders to exactly 0 or 1 on desktop load, preventing hardware freezes.
* **Viewport scroll triggers (Mobile):** Reels autoplay only when scrolled into the center viewport and instantly unload when scrolled away.
* **Reel Cover Images:** Restored poster image overlays for reels cards.
* **Ignored Custom Customization Assets:** Added `.agents/` to `.gitignore` to prevent tracking local helper skills.

---

## ⚙️ 3. "How We Work" Timeline Scroll-Reveal

We implemented a custom horizontal scroll-trigger animation for desktop viewports (`src/components/Timeline.tsx`):
* **Centered Grid Layout:** All 6 steps are arranged in a static row (`grid-cols-6`) centered on the screen (no horizontal moving scroll of the whole layout container).
* **1-by-1 Accordion Slide-In:** 
  * Step 1 is the only step visible at start.
  * Steps 2 through 6 start off-screen right (`x: window.innerWidth`).
  * As you scroll down, each step slides in from the right edge one-by-one and connects side-by-side next to the previous card.
* **Connector Line:** The horizontal connector line draws from left to right as the cards slide into place.
* **Mobile View:** Stays vertical and unchanged.

---

## 🛠️ 4. Steps for the Reviewer (Your Friend)

After you receive the Pull Request on GitHub, follow these steps to review and merge:

### Step A: Merge the Pull Request
1. Review the file changes on GitHub (you will see they are much cleaner and broken up into single-responsibility files).
2. Approve and merge the Pull Request on GitHub into your `main` branch.

### Step B: Sync and Run Locally
Open your local VS Code terminal and execute:

```bash
# 1. Switch to your main branch
git checkout main

# 2. Pull the latest merged changes
git pull origin main

# 3. Install clean packages (if dependencies shifted)
npm install

# 4. Run the development server
npm run dev

# 5. Run the compiler build to check bundle size and type-safety
npm run build
```
*Note: The compile check `npm run build` will verify that Vite packages bundle with zero TypeScript warnings or errors.*
