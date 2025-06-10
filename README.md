# Control Grid System

This project uses a standardized grid system for control panels based on 80x46 pixel button dimensions with consistent 12px spacing.

## Grid Specifications

### Base Dimensions
- **Button size**: 80px width × 46px height
- **Grid gap**: 12px (applies to both rows and columns)
- **Panel padding**: 12px on all sides

### Grid Layout
- **Columns**: `repeat(3, 80px)` - Three columns of 80px each
- **Rows**: Variable height based on content (typically 46px for standard rows, 23px for half-height rows)
- **Total panel width**: 80px × 3 + 12px × 2 + 12px × 2 = 288px (content + gaps + padding)

### Standard Components

#### Buttons
- **Standard buttons**: 80px × 46px
- **Colors**: Orange (`button-orange`) and Brown (`button-brown`) variants
- **LED indicators**: 6px × 6px positioned bottom-right
- **Text**: 8px Courier New, letter-spacing 0.5px

#### Displays
- **Standard display**: 60px × 40px (centered in 80px × 46px cell)
- **Small display**: 32px × 24px
- **Font**: 12-18px Courier New, amber glow effect

#### Sliders
- **Track height**: 10px
- **Thumb size**: 20px × 20px
- **Spans**: 2 columns when used with labels

#### Rotary Switches
- **Size**: 36px × 36px (fits within 80px × 46px cell)
- **Labels**: 8px font, positioned below switch

### Layout Patterns

#### Multi-cell Components
- **2-column slider**: Spans 2 columns, maintains 46px height
- **Cell display grid**: Spans 2 columns × 2 rows for 10×10 grid
- **Controls column**: Spans 1 column × 2 rows for vertical control stacking

#### Brand Labels
- **Height**: 23px (half-height row)
- **Spans**: Full width (3 columns)
- **Alignment**: Right-aligned with 8px padding

## Implementation Guidelines

### CSS Grid Setup
```css
.button-grid {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: [define based on content];
    gap: 12px;
}
```

### Panel Container
```css
.control-panel {
    padding: 12px;
    /* styling for retro appearance */
}
```

### Multi-cell Positioning
```css
.spanning-element {
    grid-column: span 2;  /* or specific placement like "1 / span 2" */
    grid-row: span 2;     /* for 2-row elements */
}
```

## Important Considerations

1. **Consistent Spacing**: Always use 12px gaps - never override with custom margins
2. **Cell Dimensions**: All single-cell elements should fit within 80px × 46px
3. **Multi-cell Elements**: Use `grid-column: span X` and `grid-row: span Y` for proper sizing
4. **Explicit Sizing**: Avoid setting explicit widths/heights on grid items when possible - let CSS Grid handle sizing
5. **Document Order**: Elements flow in document order unless explicitly positioned
6. **Responsive Behavior**: The grid maintains fixed dimensions for consistent control panel appearance

## Testing Layout

Use the test files in `www/widgets/` to verify grid layouts:
- `grid-test.html` - Complete grid system demonstration
- `grid-test.css` - Reference implementation styles

## File Structure
```
www/
├── widgets/
│   ├── grid-test.html    # Grid system test page
│   ├── grid-test.css     # Grid system styles
│   ├── biotron.html      # Example widget
│   └── retrotron.html    # Example widget
├── index.html            # Main application
└── style.css            # Main styles
```