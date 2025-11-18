# Email Template Builder - Visual Guide

## Application Layout

```
╔════════════════════════════════════════════════════════════════════════════╗
║  📧 Email Template Builder    [Editor] [Preview] [Export] [SPA]            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  ┌─────────────┐  ┌──────────────────────────┐  ┌──────────────────────┐  ║
║  │   BLOCKS    │  │       CANVAS             │  │    PROPERTIES        │  ║
║  │             │  │                          │  │                      │  ║
║  │ 📝 Text     │  │ ┌─ Selected Block ─────┐ │  │ Content:             │  ║
║  │ 🖼️ Image    │  │ │ Background: white    │ │  │ [textarea]           │  ║
║  │ 🔘 Button   │  │ │ Font Size: 16px      │ │  │                      │  ║
║  │ ─ Divider   │  │ │ Color: black         │ │  │ Colors:              │  ║
║  │ ⬜ Spacer   │  │ └──────────────────────┘ │  │ [●] Background       │  ║
║  │             │  │                          │  │ [●] Text             │  ║
║  │ [Add block] │  │ ┌─ Selected Block ─────┐ │  │                      │  ║
║  │             │  │ │ Another element      │ │  │ Size:                │  ║
║  │             │  │ │ ✕ ↑ ↓                │ │  │ Font: [24  ]px       │  ║
║  │             │  │ └──────────────────────┘ │  │ Padding: [16 ]px     │  ║
║  │             │  │                          │  │                      │  ║
║  │             │  │ "Click to add more..."   │  │ [↑ Move Up]          │  ║
║  │             │  │                          │  │ [↓ Move Down]        │  ║
║  └─────────────┘  └──────────────────────────┘  └──────────────────────┘  ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
```

## Workflow: From Design to Export

```
START
  │
  ├─→ Add Blocks (Text, Image, Button, etc.)
  │     │
  │     ├─→ Select block
  │     │
  │     └─→ Customize properties
  │          ├─ Content
  │          ├─ Colors
  │          ├─ Size/Padding
  │          └─ Positioning
  │
  ├─→ Preview (Click Preview tab)
  │     │
  │     └─→ Review email layout
  │
  ├─→ Export (Click Export tab)
  │     │
  │     ├─→ HTML Export
  │     │     └─ Use with: Mailchimp, SendGrid, etc.
  │     │
  │     ├─→ JSON Export
  │     │     └─ Use for: Database storage, API integration
  │     │
  │     └─→ SPA Export (Click SPA tab)
  │           └─ Use for: React applications
  │
  └─→ DONE! 🎉
```

## Property Panel - Block Customization

When you select a block, the Property Panel shows:

### Text Block Properties
```
┌─ Text Block Properties ─────┐
│ Content:                    │
│ [Your text here...          │
│  Multi-line editing]        │
│                             │
│ Background Color: [●#FFF]   │
│ Text Color: [●#000]         │
│ Font Size: [16  ]px         │
│ Padding: [16  ]px          │
│                             │
│ [↑ Move Up] [↓ Move Down]   │
└─────────────────────────────┘
```

### Image Block Properties
```
┌─ Image Block Properties ────┐
│ Image URL:                  │
│ [https://example.com/img]   │
│                             │
│ Background Color: [●#FFF]   │
│ Font Size: [16  ]px         │
│ Padding: [16  ]px          │
│                             │
│ [↑ Move Up] [↓ Move Down]   │
└─────────────────────────────┘
```

### Button Block Properties
```
┌─ Button Block Properties ───┐
│ Button Text:                │
│ [Click Here]                │
│                             │
│ Link URL:                   │
│ [https://example.com]       │
│                             │
│ Background Color: [●#2563EB]│
│ Text Color: [●#FFF]         │
│ Font Size: [16  ]px         │
│ Padding: [16  ]px          │
│                             │
│ [↑ Move Up] [↓ Move Down]   │
└─────────────────────────────┘
```

## Color Customization

Each block has two main color options:

```
Background Color        Text Color
     │                      │
     ▼                      ▼
┌─────────────────────────────────┐
│ Lorem Ipsum                     │
│ dolor sit amet                  │
└─────────────────────────────────┘
     █████████████████████████████
```

## Export Formats

### HTML Export Example
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Template</title>
</head>
<body>
  <div style="background-color: white; padding: 20px;">
    <p style="font-size: 24px; color: black;">Welcome!</p>
    <img src="https://example.com/image.jpg" />
    <a href="https://example.com" style="padding: 10px 20px;">
      Click Here
    </a>
  </div>
</body>
</html>
```

### JSON Export Example
```json
[
  {
    "id": "block-123456",
    "type": "text",
    "content": "Welcome!",
    "styles": {
      "backgroundColor": "#ffffff",
      "padding": "16px",
      "fontSize": "24px",
      "color": "#000000"
    }
  },
  {
    "id": "block-234567",
    "type": "button",
    "content": "Click Here",
    "styles": {
      "backgroundColor": "#2563eb",
      "color": "#ffffff",
      "link": "https://example.com"
    }
  }
]
```

## Tab Navigation

```
┌──────────────────────────────────┐
│ [Editor] [Preview] [Export] [SPA] │
└──────────────────────────────────┘
   │        │          │       │
   │        │          │       └─→ Generate React component code
   │        │          └─────────→ Export HTML/JSON files
   │        └──────────────────────→ Preview email template
   └─────────────────────────────→ Main editing interface
```

## Block Control Buttons

When you hover over a block, three control buttons appear:

```
┌─────────────────────────────┐
│ [✕] [↑] [↓]                 │  ← Control buttons appear on hover
│ ┌───────────────────────────┤
│ │ Your block content here   │
│ │                           │
│ └───────────────────────────┘
```

| Button | Action | Shortcut |
|--------|--------|----------|
| **✕** | Delete block | N/A |
| **↑** | Move block up in order | N/A |
| **↓** | Move block down in order | N/A |

## Common Workflows

### Workflow 1: Simple Newsletter
```
1. Text: "Latest News"
   └─ Styling: Large font, blue background

2. Divider
   └─ Visual separator

3. Image: Newsletter banner
   └─ URL: https://example.com/banner.jpg

4. Text: Newsletter content
   └─ Styling: Regular font, white background

5. Button: "Read More"
   └─ Link: https://example.com/newsletter

6. Export as HTML
   └─ Use with email service
```

### Workflow 2: Product Promotion
```
1. Text: "Special Offer - 50% Off!"
   └─ Big, bold, eye-catching

2. Spacer: Add breathing room

3. Image: Product photo
   └─ URL: https://example.com/product.jpg

4. Text: Product description

5. Button: "Shop Now"
   └─ Link to product page

6. Divider: Bottom separator

7. Text: Terms and conditions (small)

8. Export and test
```

### Workflow 3: React Integration
```
1. Build your email template
2. Customize all blocks
3. Click "SPA" tab
4. Download the generated files
5. Import EmailTemplate.jsx into your React app
6. Customize as needed
```

## Tips for Best Results

### ✅ DO:
- Use web-safe colors
- Test with multiple email clients
- Add spacers between sections
- Use absolute URLs for images
- Keep layouts simple and readable
- Use good color contrast

### ❌ DON'T:
- Use overly complex layouts
- Embed videos (not supported in most email clients)
- Use relative image URLs
- Forget to test on mobile
- Use too many different fonts
- Rely on JavaScript (not supported in emails)

## Export Quality Checklist

Before exporting your template:

- [ ] All text is readable
- [ ] All images have valid URLs
- [ ] Buttons have correct links
- [ ] Colors have good contrast
- [ ] Spacing looks good
- [ ] No text overflow
- [ ] Mobile-friendly (narrow width)
- [ ] Tested in Preview tab

---

**Happy building! 🎨**