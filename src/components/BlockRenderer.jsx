import React from 'react';

export default function BlockRenderer({ block }) {
  const blockStyle = {
    backgroundColor: block.styles.backgroundColor,
    padding: block.styles.padding,
    fontSize: block.styles.fontSize,
    color: block.styles.color,
    margin: '8px 0',
    borderRadius: '4px',
    minHeight: block.type === 'spacer' ? '32px' : 'auto',
  };

  switch (block.type) {
    case 'text':
      return (
        <div style={blockStyle} className="block-text">
          {block.content || 'Empty text block'}
        </div>
      );

    case 'image':
      return (
        <div style={blockStyle} className="block-image">
          {block.content ? (
            <img src={block.content} alt="Email content" style={{ maxWidth: '100%', height: 'auto' }} />
          ) : (
            <div className="image-placeholder">📷 No image URL provided</div>
          )}
        </div>
      );

    case 'button':
      return (
        <div style={blockStyle} className="block-button">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: block.styles.backgroundColor,
              color: block.styles.color,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: block.styles.fontSize,
            }}
          >
            {block.content || 'Click Me'}
          </button>
        </div>
      );

    case 'divider':
      return (
        <div style={blockStyle} className="block-divider">
          <hr style={{ margin: '0', borderColor: block.styles.color }} />
        </div>
      );

    case 'spacer':
      return <div style={blockStyle} className="block-spacer" />;

    default:
      return <div style={blockStyle}>Unknown block type</div>;
  }
}
