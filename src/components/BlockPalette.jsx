import React from 'react';

export default function BlockPalette({ onAddBlock }) {
  const blockTypes = [
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'button', label: 'Button', icon: '🔘' },
    { type: 'divider', label: 'Divider', icon: '─' },
    { type: 'spacer', label: 'Spacer', icon: '⬜' },
  ];

  return (
    <aside className="block-palette">
      <h2>Blocks</h2>
      <div className="block-list">
        {blockTypes.map((block) => (
          <button
            key={block.type}
            className="block-item"
            onClick={() => onAddBlock(block.type)}
            title={block.label}
          >
            <span className="block-icon">{block.icon}</span>
            <span className="block-label">{block.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
