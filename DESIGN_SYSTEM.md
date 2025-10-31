# Design System - AI Agency Agent Builder

This document outlines the design system, visual guidelines, and component library for the AI Agency Agent Builder application.

## 🎨 Color Palette

### Primary Colors
- **Primary Blue**: `#3b82f6` - Main action color
- **Secondary Purple**: `#8b5cf6` - Secondary actions and gradients
- **Accent Cyan**: `#64c8ff` - Highlights and accents

### Semantic Colors
- **Success Green**: `#4ade80` - Success states, confirmations
- **Error Red**: `#ef4444` - Errors, destructive actions
- **Warning Amber**: `#f59e0b` - Warnings, alerts
- **Info Blue**: `#3b82f6` - Information, notifications

### Background Colors
- **Primary Background**: `#0f172a` - Main background
- **Secondary Background**: `#1e293b` - Secondary surfaces
- **Border Color**: `rgba(100, 200, 255, 0.2)` - Borders and dividers

### Text Colors
- **Primary Text**: `rgba(255, 255, 255, 0.87)` - Main text
- **Secondary Text**: `rgba(255, 255, 255, 0.6)` - Secondary text
- **Muted Text**: `rgba(255, 255, 255, 0.4)` - Disabled, placeholder text

## 🔤 Typography

### Font Family
- Primary: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

### Font Sizes
- **H1**: 32px (font-weight: 600)
- **H2**: 24px (font-weight: 600)
- **H3**: 20px (font-weight: 600)
- **H4**: 16px (font-weight: 600)
- **Body**: 14px (font-weight: 400)
- **Small**: 12px (font-weight: 400)

### Line Heights
- Headings: 1.2 - 1.4
- Body: 1.6
- Compact: 1.4

## 🎯 Components

### Buttons

#### Primary Button
```tsx
<button className="btn btn-primary">
  Action Button
</button>
```
- Background: Linear gradient (primary → secondary)
- Hover: Translate up 2px, shadow
- Padding: 12px 24px
- Border Radius: 8px

#### Secondary Button
```tsx
<button className="btn btn-secondary">
  Secondary Action
</button>
```
- Background: Transparent with border
- Border: 1px solid border-color
- Hover: Increased opacity

#### Success Button
```tsx
<button className="btn btn-success">
  Confirm
</button>
```
- Background: Success color (20% opacity)
- Color: Success green
- Border: Success color (30% opacity)

#### Danger Button
```tsx
<button className="btn btn-danger">
  Delete
</button>
```
- Background: Error color (20% opacity)
- Color: Error red
- Border: Error color (30% opacity)

### Cards

#### Basic Card
```tsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
  </div>
  <div className="card-content">
    Card content goes here
  </div>
</div>
```
- Background: Glassmorphism (50% opacity with blur)
- Border: 1px solid border-color
- Border Radius: 15px
- Padding: 25px
- Hover: Lift effect with enhanced shadow

### Forms

#### Form Group
```tsx
<div className="form-group">
  <label className="form-label">Label</label>
  <input className="form-input" type="text" />
</div>
```
- Label: 14px, font-weight: 600
- Input: 12px padding, 8px border-radius
- Focus: Cyan border, enhanced shadow
- Error: Red text below input

### Badges

#### Badge Types
```tsx
<span className="badge badge-primary">Primary</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-error">Error</span>
```
- Padding: 6px 12px
- Border Radius: 20px
- Font Size: 12px
- Font Weight: 600

## ✨ Visual Effects

### Glassmorphism
- Background: `rgba(15, 23, 42, 0.5)`
- Backdrop Filter: `blur(20px)`
- Border: `1px solid rgba(100, 200, 255, 0.2)`
- Creates frosted glass effect

### Gradient Overlays
- Direction: 135deg
- Colors: Primary to Secondary
- Used for buttons and accents

### Shadows
- Small: `0 10px 30px rgba(0, 0, 0, 0.3)`
- Large: `0 20px 50px rgba(0, 0, 0, 0.4)`
- Glow: `0 0 20px rgba(100, 200, 255, 0.2)`

### Animations

#### Fade In
```css
animation: fadeIn 0.5s ease-out;
```
- Opacity: 0 → 1

#### Slide Up
```css
animation: slideUp 0.5s ease-out;
```
- Transform: translateY(20px) → 0
- Opacity: 0 → 1

#### Pulse
```css
animation: pulse 2s ease-in-out infinite;
```
- Opacity: 1 → 0.5 → 1

#### Glow
```css
animation: glow 2s ease-in-out infinite;
```
- Box Shadow: Pulsing effect

#### Float
```css
animation: float 3s ease-in-out infinite;
```
- Transform: translateY(0) → -10px → 0

## 📐 Spacing System

### Base Unit: 8px

| Class | Value |
|-------|-------|
| mt-1 | 8px |
| mt-2 | 16px |
| mt-3 | 24px |
| mt-4 | 32px |
| mb-1 | 8px |
| mb-2 | 16px |
| mb-3 | 24px |
| mb-4 | 32px |
| p-1 | 8px |
| p-2 | 16px |
| p-3 | 24px |
| p-4 | 32px |

## 🎭 Dark Mode

The application uses a dark mode color scheme by default:
- Primary Background: `#0f172a` (very dark blue)
- Secondary Background: `#1e293b` (dark slate)
- Text: White with varying opacity
- Accents: Electric blue and magenta

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Desktop | > 1024px | Full layout |
| Tablet | 768px - 1024px | Adjusted spacing |
| Mobile | < 768px | Single column |
| Small Mobile | < 480px | Compact layout |

## 🔧 CSS Variables

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --accent-color: #64c8ff;
  --success-color: #4ade80;
  --error-color: #ef4444;
  --warning-color: #f59e0b;
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: rgba(255, 255, 255, 0.87);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --border-color: rgba(100, 200, 255, 0.2);
}
```

## 🎨 Component Examples

### Navigation Bar
- Height: 70px
- Background: Glassmorphism
- Logo: Left aligned
- Navigation: Center aligned
- User Menu: Right aligned

### Dashboard Card
- Grid: 3 columns on desktop, 1 on mobile
- Gap: 20px
- Hover: Lift and shadow effect
- Content: Icon + Title + Value

### Agent Builder
- Two-column layout
- Left: Configuration panel
- Right: Workflow canvas
- Responsive: Stacks on mobile

### Modal/Dialog
- Background: Overlay with blur
- Card: Centered, max-width 500px
- Animation: Fade in + scale

## 🎯 Design Principles

1. **Clarity** - Clear hierarchy and visual structure
2. **Consistency** - Unified design language throughout
3. **Accessibility** - WCAG compliant colors and contrast
4. **Performance** - Optimized animations and effects
5. **Responsiveness** - Works on all screen sizes
6. **Feedback** - Clear user interaction feedback
7. **Simplicity** - Minimal, focused interfaces

## 🚀 Best Practices

### Do's
- ✅ Use consistent spacing
- ✅ Apply hover states to interactive elements
- ✅ Use semantic colors for status
- ✅ Maintain visual hierarchy
- ✅ Test animations for performance
- ✅ Use CSS variables for consistency

### Don'ts
- ❌ Mix color schemes
- ❌ Use too many animations
- ❌ Break spacing consistency
- ❌ Use low contrast text
- ❌ Ignore responsive design
- ❌ Overuse shadows and effects

## 🔄 Component Variations

### Button Sizes
- Small: `btn-small` (8px 16px)
- Default: `btn` (12px 24px)
- Large: `btn-large` (16px 32px)

### Button States
- Default: Normal appearance
- Hover: Lift and shadow
- Active: Pressed appearance
- Disabled: Reduced opacity

### Card States
- Default: Normal appearance
- Hover: Lift and enhanced shadow
- Active: Border highlight
- Loading: Opacity reduced

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [Glassmorphism Guide](https://glassmorphism.com/)
- [Color Theory](https://www.interaction-design.org/literature/topics/color-theory)

## 🎓 Usage Examples

### Creating a New Component

```tsx
import { motion } from 'framer-motion';

export default function MyComponent() {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">
        <h3 className="card-title">My Component</h3>
      </div>
      <div className="card-content">
        Content here
      </div>
    </motion.div>
  );
}
```

### Using Animations

```tsx
<motion.button
  className="btn btn-primary"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Responsive Design

```css
@media (max-width: 768px) {
  .card {
    padding: 15px;
  }
  
  h1 {
    font-size: 24px;
  }
}
```

---

**Last Updated:** October 2025
**Version:** 1.0
**Maintained By:** AI Agency Design Team
