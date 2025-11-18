# Email Template Builder - Quick Start Guide

## 🚀 Getting Started

Your Email Template Builder is now running! Here's how to use it.

### Current Status
- ✅ Server running at `http://localhost:5173/`
- ✅ All components loaded
- ✅ Ready to build templates

## 📱 UI Overview

The app has 4 main sections:

```
┌─────────────────────────────────────────────────────┐
│     Email Template Builder  [Editor][Preview]...     │
├──────────┬──────────────────────┬──────────────────┤
│ Blocks   │                      │   Properties     │
│ • Text   │    CANVAS            │   • Content      │
│ • Image  │    (drag area)       │   • Colors       │
│ • Button │                      │   • Size/Padding │
│ • ...    │                      │   • Move Up/Down │
├──────────┴──────────────────────┴──────────────────┤
│             Main Content Area                       │
└─────────────────────────────────────────────────────┘
```

## 🎯 5-Minute Tutorial

### Step 1: Add Your First Block
1. Click **Text** in the left panel
2. You'll see a text block appear in the canvas

### Step 2: Edit the Content
1. Click on the text block to select it
2. In the right panel, change the content in the textarea
3. Try: "Welcome to my email!"

### Step 3: Customize Colors
1. Select the text block (if not already selected)
2. Click the "Background Color" color picker
3. Choose any color you like
4. Click "Text Color" and pick a contrasting color

### Step 4: Add More Blocks
1. Click **Image** and paste an image URL
   - Try: `https://via.placeholder.com/600x200`
2. Click **Button** and set:
   - Button Text: "Click Here"
   - Link URL: `https://example.com`
3. Click **Spacer** to add some space

### Step 5: Preview Your Email
1. Click the **Preview** tab
2. See your email rendered exactly as it will look

### Step 6: Export Your Template
1. Click the **Export** tab
2. Choose **HTML** format
3. Click **Export as HTML**
4. Save the file - you can use this with email providers!

## 🎨 Feature Examples

### Adding a Header with Styling
```
1. Add Text block
2. Content: "Special Offer - 50% Off!"
3. Font Size: 28px
4. Text Color: White
5. Background Color: Dark Blue
6. Padding: 24px
```

### Creating a Call-to-Action Section
```
1. Add Divider for visual separation
2. Add Spacer (for spacing)
3. Add Button with your link
4. Add Divider at bottom
```

### Building a Product Email
```
1. Add Text: Product title
2. Add Image: Product image URL
3. Add Text: Product description
4. Add Button: "Shop Now" linking to product
5. Add Spacer
6. Add Text: Terms and conditions
```

## 🔧 Advanced Tips

### Move Blocks Around
- Hover over a block → Click **↑** to move up
- Hover over a block → Click **↓** to move down

### Delete a Block
- Hover over a block → Click **✕**

### Generate React Code
- Click the **SPA** tab to see generated React code
- Download the files to use in your React app

### Export as JSON
- Great for storing templates in a database
- Perfect for programmatically rebuilding templates

## 📋 Block Types Reference

| Block | Use For |
|-------|---------|
| **Text** | Paragraphs, headlines, body copy |
| **Image** | Photos, logos, banners |
| **Button** | CTAs (Call To Action), links |
| **Divider** | Visual separation between sections |
| **Spacer** | Adding vertical space/padding |

## 🎓 Learning Path

**Beginner**: Add 3-5 blocks and preview
**Intermediate**: Customize colors and test export
**Advanced**: Generate React code and integrate into your app

## 💡 Pro Tips

1. **Color Contrast**: Always use good contrast between text and background
2. **Image URLs**: Use absolute URLs (start with http/https)
3. **Test Export**: Always test exported HTML in multiple email clients
4. **Mobile First**: Keep layouts simple for mobile devices
5. **Use Spacers**: Add spacers between sections for breathing room

## 🐛 Troubleshooting

**Problem**: Block doesn't appear
- Try refreshing the page

**Problem**: Export file is empty
- Make sure you have at least one block added

**Problem**: Images not showing in preview
- Check that the image URL is valid and accessible

**Problem**: Want to start over
- Refresh the page to clear all blocks

## 📚 Next Steps

1. Build your first complete email template
2. Export it as HTML
3. Test it in your email client or service
4. Generate React component for your app
5. Explore block customization options

---

**Ready to build?** Start by clicking on a block type and let your creativity flow! 🚀

Need help? Check the main README.md for complete documentation.