## Mobile-only mantra restacking

### Context
The mantra line at the bottom of the page reads `Commit • Prepare • Endure • Evolve` in a single horizontal line, centered above the triangle logo. On narrow mobile viewports this line wraps awkwardly.

### Change
In `src/routes/index.tsx`, refactor the bottom mantra `motion.div` so that:

- **Mobile (< md breakpoint)**: Words stack vertically in a centered column. Dots are hidden.
- **Desktop (≥ md breakpoint)**: Layout remains exactly as-is — single horizontal line with `•` separators and non-breaking spaces.

### Implementation
1. Replace the single text node with four word spans + three dot separators.
2. Use Tailwind responsive flex direction: `flex flex-col items-center md:flex-row`.
3. Hide dot spans on mobile: `hidden md:inline`.
4. Keep all existing motion props, positioning (`bottom: 112`), colors, and animation timing unchanged.

### Out of scope
No changes to triangle position, animation delays, video sync, or any other element.