import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableBlockItem({ block, onAddBlock }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${block.type}`,
    data: { type: block.type, isNew: true }
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      className="block-item"
      onClick={() => onAddBlock(block.type)}
      title={block.label}
      {...attributes}
      {...listeners}
    >
      <span className="block-icon">{block.icon}</span>
      <span className="block-label">{block.label}</span>
    </button>
  );
}

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
          <DraggableBlockItem 
            key={block.type}
            block={block}
            onAddBlock={onAddBlock}
          />
        ))}
      </div>
    </aside>
  );
}
