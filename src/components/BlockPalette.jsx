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
    <div
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
    </div>
  );
}

export default function BlockPalette({ onAddBlock }) {
  const blockTypes = [
    {
      type: 'text',
      label: 'Text',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" />
        </svg>
      )
    },
    {
      type: 'attachment',
      label: 'Attachment',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      )
    },
    {
      type: 'button',
      label: 'Button',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="8" rx="2" />
        </svg>
      )
    },
    {
      type: 'divider',
      label: 'Divider',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      )
    },
    {
      type: 'spacer',
      label: 'Spacer',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" /><path d="M8 7l4-4 4 4" /><path d="M8 17l4 4 4-4" />
        </svg>
      )
    },
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
