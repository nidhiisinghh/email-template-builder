# Email Template Builder

A modern, drag-drop email template builder built with React and Vite. Create professional email templates with an intuitive interface, preview your designs in real-time, and export as HTML or JSON.

## Features

### ✨ Core Features
- **Drag-Drop Block Editor**: Add text, images, buttons, dividers, and spacers to your email
- **Live Preview**: See your email design in real-time as you edit
- **HTML Export**: Download your template as valid HTML email
- **JSON Export**: Export block structure as JSON for programmatic use
- **SPA Builder**: Generate React components from your email template
- **Full Property Editing**: Customize colors, fonts, padding, and more

### 📋 Block Types
1. **Text**: Add paragraphs with customizable fonts and colors
2. **Image**: Embed images with URL support
3. **Button**: Create clickable buttons with custom links
4. **Divider**: Add horizontal lines for visual separation
5. **Spacer**: Add vertical spacing between blocks

### 🎨 Customization
Each block supports:
- Background color
- Text color
- Font size
- Padding
- Reordering (move up/down)
- Deletion

## Setup

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Navigate to the project directory:
```bash
cd /Users/nidhisingh/Desktop/email-builder
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173/
```

## Usage

### Building Your Email Template

1. **Add Blocks**: Click on any block type in the left panel (Text, Image, Button, etc.)

2. **Edit Content**: Click on a block to select it and edit its properties in the right panel

3. **Customize Styling**:
   - Change background and text colors using color pickers
   - Adjust font size and padding with number inputs
   - Use the property panel for fine-tuned control

4. **Reorder Blocks**: Use the up/down arrows on hover to rearrange blocks

5. **Delete Blocks**: Use the X button on hover to remove blocks

### Preview Pane

- Click the **Preview** tab to see your email template rendered
- This shows how your email will look when sent
- Useful for checking layout and styling before export

### Exporting

#### HTML Export
1. Click the **Export** tab
2. Select **HTML** format
3. Click **Export as HTML**
4. Save the file and use it with email services

#### JSON Export
1. Click the **Export** tab
2. Select **JSON** format
3. Click **Export as JSON**
4. Use the JSON structure to rebuild templates programmatically

### SPA Builder

1. Click the **SPA** tab to view generated React component code
2. Download the generated files:
   - `EmailTemplate.jsx` - The email component
   - `App.jsx` - Main application component
   - `App.css` - Styling

## Project Structure

```
email-builder/
├── src/
│   ├── components/
│   │   ├── BlockPalette.jsx      # Block selection panel
│   │   ├── Canvas.jsx             # Main editing canvas
│   │   ├── BlockRenderer.jsx       # Renders individual blocks
│   │   ├── PreviewPane.jsx         # Preview view
│   │   ├── ExportPane.jsx          # Export functionality
│   │   └── SPABuilder.jsx          # React component generator
│   ├── App.jsx                     # Main application
│   ├── App.css                     # Main styles
│   ├── index.css                   # Global styles
│   └── main.jsx                    # React entry point
├── vite.config.js
├── package.json
└── README.md
```

## Component Details

### BlockPalette
Displays available block types. Clicking a button adds a new block.

### Canvas
Main editing area. Click to select, hover to access controls:
- **Delete (✕)**: Remove the block
- **Move Up (↑)**: Move block up
- **Move Down (↓)**: Move block down

### PropertyPanel
Context-sensitive editor for the selected block.

### PreviewPane
Live preview of the email template.

### ExportPane
Export in HTML or JSON formats.

### SPABuilder
Generate React component code from the template.

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Tips & Best Practices

1. Test exported HTML emails in multiple email clients
2. Use absolute URLs for images
3. Stick to web-safe colors
4. Keep layouts simple for mobile rendering
5. Use the Preview pane frequently

---

Built with ❤️ using React + Vite
