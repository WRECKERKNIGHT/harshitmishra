# 🎌 Anime-Inspired Portfolio Design System

## 🎨 Color Palette

### Primary Colors (Neon Vibrant)
- **Electric Cyan**: `#00FFFF` - Primary accent, tech/code elements
- **Hot Pink**: `#FF1493` - Secondary accent, creative elements  
- **Neon Orange**: `#FF6B35` - Action/CTA elements
- **Deep Purple**: `#7B2CBF` - Depth and mystery
- **Vivid Violet**: `#9D4EDD` - Interactive elements

### Accent Colors
- **Laser Green**: `#39FF14` - Success states, live indicators
- **Cyber Blue**: `#0496FF` - Info states, tech badges
- **Aurora Pink**: `#FF10F0` - Special highlights

### Background Colors
- **Space Black**: `#0A0A0F` - Main background
- **Deep Navy**: `#0D1B2A` - Section backgrounds
- **Midnight Purple**: `#1A0B2E` - Card backgrounds

## 🔤 Typography

### Font Families
1. **Display** (Orbitron): Headings, logos, technical UI elements
2. **Body** (Space Grotesk): Paragraphs, descriptions, body text
3. **Heading** (Exo 2): Section titles, large headings
4. **Accent** (Rajdhani): Labels, tags, badges, UI text

### Usage
```css
font-family: var(--font-display);  /* Orbitron - Headlines */
font-family: var(--font-body);     /* Space Grotesk - Body */
font-family: var(--font-heading);  /* Exo 2 - Titles */
font-family: var(--font-accent);   /* Rajdhani - UI */
```

## ✨ Visual Effects

### Glow Effects
- `text-glow-cyan` - Cyan text glow
- `text-glow-pink` - Pink text glow
- `text-glow-orange` - Orange text glow
- `text-glow-purple` - Purple text glow

### Special Classes
- `holographic-text` - Animated gradient text
- `anime-border` - Animated gradient borders
- `glitch-effect` - Subtle glitch animation
- `scan-line` - Retro scan line effect

### Animations
- `float-anime` - Floating animation with rotation
- `scan-line` - Moving scan line
- `holographic` - Animated gradient shift
- `neon-pulse` - Pulsing neon effect
- `glitch` - Glitch displacement effect

## 🎯 Design Principles

### 1. **Fixed Backgrounds, Scrolling Content**
- All background patterns and decorative elements are `position: fixed`
- Main content scrolls over fixed backgrounds creating depth
- Parallax effects on decorative elements

### 2. **Neon Aesthetics**
- Heavy use of bright, saturated colors
- Glowing elements with box-shadow effects
- High contrast between dark backgrounds and bright accents

### 3. **Geometric Shapes**
- Hexagons, triangles, and angular shapes
- Clip-path for unique card corners
- Rotating and floating geometric accents

### 4. **Micro-Interactions**
- Hover scale effects (1.05x - 1.1x)
- Rotation on icon hover (360deg)
- Color transitions on hover
- Animated borders and gradients

### 5. **Asymmetric Layouts**
- Breaking grid patterns
- Diagonal elements
- Overlapping sections
- Dynamic spacing

## 📐 Component Patterns

### Cards
```tsx
<Card className="bg-gradient-to-br from-white/5 to-transparent border-2 border-white/10 hover:border-[var(--electric-cyan)]/50">
  {/* Corner accent */}
  <div className="absolute top-0 right-0 w-20 h-20 opacity-20"
    style={{
      background: 'linear-gradient(135deg, color, transparent)',
      clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
    }}
  />
  {/* Content */}
</Card>
```

### Badges
```tsx
<div className="px-6 py-3 rounded-full border-2 border-[var(--electric-cyan)]
  bg-gradient-to-r from-[var(--electric-cyan)]/10 to-[var(--hot-pink)]/10">
  <span className="font-[var(--font-accent)] font-bold tracking-widest">
    TEXT
  </span>
</div>
```

### Buttons (CTA)
```tsx
<Button className="bg-gradient-to-r from-[var(--electric-cyan)] to-[var(--hot-pink)]
  font-[var(--font-accent)] font-black tracking-wider">
  ACTION
</Button>
```

## 🎬 Animation Guidelines

### Entry Animations
- **Y-axis**: `initial={{ y: 50 }}` → `animate={{ y: 0 }}`
- **Opacity**: `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`
- **Scale**: `initial={{ scale: 0.9 }}` → `animate={{ scale: 1 }}`
- **Stagger delays**: 0.1s increments

### Hover Animations
- **Lift**: `whileHover={{ y: -10 }}`
- **Scale**: `whileHover={{ scale: 1.05 }}`
- **Rotate**: `whileHover={{ rotate: 360 }}`

### Continuous Animations
- **Pulse**: 2-3s duration, infinite repeat
- **Float**: 4-6s duration, easeInOut
- **Rotate**: 3-10s duration, linear

## 🎮 Interactive Elements

### Scroll Effects
- Parallax on decorative elements
- Fade-out on hero content
- Progress-based transformations
- Fixed backgrounds with moving content

### Mouse Tracking
- Subtle parallax on geometric shapes
- Hover state previews
- Cursor-reactive elements

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

### Mobile Optimizations
- Reduced particle count
- Simplified animations
- Larger touch targets (min 44x44px)
- Simplified gradients on low-end devices

## ⚡ Performance

### Optimizations Applied
- `will-change` on animated elements
- `transform: translateZ(0)` for GPU acceleration
- Capped particle counts
- Reduced blur intensity
- Fixed backgrounds to prevent repaints
- Lazy loading for heavy components

### Best Practices
- Use `viewport={{ once: true }}` for scroll animations
- Limit simultaneous animations
- Prefer `transform` over position changes
- Use `backdrop-filter` sparingly

---

**Design Philosophy**: Blend cyberpunk aesthetics with anime energy, creating a futuristic yet human portfolio that stands out while maintaining usability.
