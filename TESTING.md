# Testing & Validation Guide

## Quick Test Suite

### ✅ Basic Functionality Test

#### Test 1: Add Block
```
Steps:
1. Click "Text" in the Blocks panel
2. Verify a new text block appears in canvas

Expected: New block with default styling appears
```

#### Test 2: Edit Content
```
Steps:
1. Add a text block
2. Click on the block to select it
3. In Properties panel, change the textarea content
4. Type "Hello World"

Expected: Text in canvas updates in real-time
```

#### Test 3: Change Colors
```
Steps:
1. Select a block
2. Click "Background Color" - choose red
3. Click "Text Color" - choose white
4. Verify both updates

Expected: Block background turns red, text turns white
```

#### Test 4: Reorder Blocks
```
Steps:
1. Add 3 text blocks with content: "First", "Second", "Third"
2. Hover over the "First" block
3. Click the ↓ button
4. Verify order changes to "Second", "First", "Third"

Expected: Blocks reorder correctly
```

#### Test 5: Delete Block
```
Steps:
1. Add a text block
2. Hover over it
3. Click the ✕ button

Expected: Block is removed from canvas
```

### 🎨 Styling Test

#### Test 6: Font Size
```
Steps:
1. Add text block
2. In Properties, change Font Size to 32
3. Check Preview tab

Expected: Text appears larger in preview
```

#### Test 7: Padding
```
Steps:
1. Add text block
2. Change Padding to 40
3. Notice extra space around text

Expected: More space between text and edges
```

#### Test 8: Color Persistence
```
Steps:
1. Customize a block's colors
2. Switch to Preview tab
3. Switch back to Editor tab

Expected: Colors are maintained
```

### 📷 Block Type Tests

#### Test 9: Image Block
```
Steps:
1. Add Image block
2. In Properties, paste: https://via.placeholder.com/600x200
3. Check if image displays

Expected: Image appears in canvas and preview
```

#### Test 10: Button Block
```
Steps:
1. Add Button block
2. Set Button Text: "Click Me"
3. Set Link URL: https://example.com
4. Check Preview

Expected: Button displays with correct text and styling
```

#### Test 11: Divider
```
Steps:
1. Add Divider block
2. Notice the horizontal line
3. Add Spacer below it

Expected: Divider is visible, spacer adds space
```

### 📊 View Tests

#### Test 12: Preview Tab
```
Steps:
1. Build a 3-block email
2. Click Preview tab
3. Verify all blocks render correctly

Expected: Email looks rendered and complete
```

#### Test 13: Tab Switching
```
Steps:
1. Add several blocks
2. Switch to Preview → Export → SPA → Editor
3. Check that blocks persist

Expected: Switching tabs doesn't lose data
```

### 📥 Export Tests

#### Test 14: HTML Export
```
Steps:
1. Add 2-3 blocks with content
2. Go to Export tab
3. Select "HTML" format
4. Click "Export as HTML"
5. Open the downloaded file in browser

Expected: HTML file downloads and displays correctly
```

#### Test 15: JSON Export
```
Steps:
1. Add text and button blocks
2. Go to Export tab
3. Select "JSON" format
4. Click "Export as JSON"
5. Open the downloaded file in text editor

Expected: JSON file contains all block data
```

#### Test 16: React Code Generation
```
Steps:
1. Build an email template
2. Go to SPA tab
3. Review the generated code
4. Click "Show Full Code"
5. Download the files

Expected: React component code displays and files download
```

## Edge Case Tests

### Test 17: Empty Canvas
```
Steps:
1. Start fresh app (no blocks)
2. Click Preview tab
3. Try to export

Expected: 
- Preview shows "No blocks to preview"
- Export shows "No blocks to export"
```

### Test 18: Many Blocks
```
Steps:
1. Add 10+ blocks
2. Scroll through canvas
3. Try to reorder top block to bottom

Expected: 
- No performance issues
- All blocks remain editable
```

### Test 19: Long Content
```
Steps:
1. Add text block
2. Paste long paragraph (500+ chars)
3. Preview it

Expected:
- Text wraps properly
- No overflow issues
```

### Test 20: Special Characters
```
Steps:
1. Add text block
2. Enter: "Test & <Email> "Features" ™"
3. Export as HTML

Expected:
- HTML properly escapes special chars
- Displays correctly
```

## Browser Compatibility Test

Test in different browsers:

```
Browser         Desktop     Mobile      Issues/Notes
─────────────────────────────────────────────────────
Chrome          ✓           ✓           
Firefox         ✓           ✓           
Safari          ✓           ✓           
Edge            ✓           ✓           
```

## Mobile Responsiveness Test

```
Viewport        Test                          Expected
─────────────────────────────────────────────────────
320px (mobile)  • Can select blocks           Functional but cramped
                • Can edit properties        
                • Can view preview           

768px (tablet)  • Layout is usable            Better spacing
                • Properties panel visible   
                                             
1024px (desktop)• Full layout visible        Optimal experience
                • No overlapping             
```

## Performance Test

### Test 21: Smooth Interaction
```
Metric          Target      Action
────────────────────────────────────────
Click response  <100ms      Click block
Drag smooth     60fps       Scroll canvas
Export speed    <1s         Export HTML
```

## Data Persistence Test

### Test 22: Block State
```
Steps:
1. Add and customize blocks
2. Note their configuration
3. Refresh the page
4. Check if blocks are gone (expected - no storage)

Expected: Blocks are cleared (current behavior - no persistence)

Note: Can be enhanced with localStorage in future
```

## Accessibility Test

### Test 23: Keyboard Navigation
```
Steps:
1. Tab through the interface
2. Try to operate without mouse

Expected:
- Can tab to buttons
- Can activate with Enter/Space
- Focus indicators visible
```

### Test 24: Color Contrast
```
Steps:
1. Try creating designs with:
   - Black text on white (good)
   - Light gray text on white (bad)
2. Check visibility

Expected:
- Tool doesn't prevent bad contrast
- User responsible for accessibility
```

## Integration Test

### Test 25: Export → Email Service
```
Steps:
1. Build an email
2. Export as HTML
3. Copy/paste into email client
4. Send test

Expected:
- Email displays correctly in recipient's client
- Styling is preserved
- Images load properly
```

## Test Report Template

```
Date: ________
Tester: ________
Browser/Device: ________

Test #    | Description        | Status | Notes
─────────────────────────────────────────────────
1         | Add Block          | ✓ Pass | 
2         | Edit Content       | ✓ Pass | 
3         | Change Colors      | ✓ Pass | 
...

Overall: ✓ PASS / ✗ FAIL

Issues Found:
- Issue 1: Description
- Issue 2: Description

Recommendations:
- Improvement 1
- Improvement 2
```

## Known Limitations

1. **No Undo/Redo**: Accidentally deleted something? Refresh to start over
2. **No Templates**: Must build from scratch each time
3. **No Storage**: Blocks are cleared on page refresh
4. **Single Session**: Only one email template per browser tab
5. **No Collaboration**: Single-user only

## Performance Benchmarks

On a modern device:
- App loads in: ~1-2 seconds
- Adding block: <50ms
- Color change: <50ms
- Export HTML: <100ms
- Preview render: <100ms

## Troubleshooting Checklist

| Issue | Solution |
|-------|----------|
| Block not appearing | Try refreshing page |
| Properties not updating | Click block again to re-select |
| Export not working | Check that blocks exist |
| Styling not applying | Check color values are valid hex |
| Images not loading | Verify URL starts with http/https |
| App not responsive | Check internet connection |

---

**Report any issues to: support@emailbuilder.dev** 📧