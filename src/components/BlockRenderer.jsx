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
            <img 
              src={block.content} 
              alt="Email content" 
              style={{ maxWidth: '100%', height: 'auto' }} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZjI4MiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjMzMzIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIxMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiM2NjYiPlVybDogJHtibG9jay5jb250ZW50fTwvdGV4dD48L3N2Zz4=';
                e.target.style.objectFit = 'contain';
                e.target.style.backgroundColor = '#fff2f2';
              }}
            />
          ) : (
            <div className="image-placeholder">
              <div>📷 Image Block</div>
              <div style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                Enter an image URL in the properties panel
              </div>
            </div>
          )}
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
