import React from 'react';
import BlockRenderer from './BlockRenderer';

export default function PreviewPane({ blocks }) {
  return (
    <div className="preview-pane">
      <div className="preview-container">
        <h2>Email Preview</h2>
        <div className="preview-content">
          {blocks.length === 0 ? (
            <p className="empty-message">No blocks to preview</p>
          ) : (
            <div className="email-preview">
              {blocks.map((block) => (
                <div key={block.id}>
                  <BlockRenderer block={block} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
