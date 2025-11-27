import React from 'react';

export default function BlockRenderer({ block, isEditable = false }) {
  const blockStyle = {
    backgroundColor: block.styles.backgroundColor,
    padding: block.styles.padding,
    fontSize: block.styles.fontSize,
    color: block.styles.color,
    margin: '8px 0',
    borderRadius: '4px',
    minHeight: block.type === 'spacer' ? '32px' : 'auto',
    textAlign: block.styles.textAlign || 'left',
  };

  switch (block.type) {
    case 'text':
      return (
        <div style={blockStyle} className="block-text">
          {block.content || 'Empty text block'}
        </div>
      );

    case 'attachment':
      return (
        <div style={blockStyle} className="block-attachment">
          <a
            href={block.styles.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (isEditable) {
                e.preventDefault();
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              textDecoration: 'none',
              color: '#334155',
              maxWidth: '100%',
              boxSizing: 'border-box',
              cursor: isEditable ? 'default' : 'pointer',
            }}
          >
            <span style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </span>
            <span style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {block.content || 'Attachment Name'}
            </span>
          </a>
        </div>
      );

    case 'button':
      return (
        <div style={blockStyle} className="block-button">
          <a
            href={block.styles.link || '#'}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: block.styles.backgroundColor || '#f0f0f0',
              color: block.styles.color || '#333333',
              textDecoration: 'none',
              border: '1px solid #cccccc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: block.styles.fontSize,
              fontFamily: 'inherit',
            }}
          >
            {block.content || 'Click Me'}
          </a>
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
