import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlockRenderer from './BlockRenderer';

export default function DraggableBlockItem({
  block,
  index,
  totalBlocks,
  isSelected,
  onSelect,
  onDelete,
  onMove,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`block-wrapper ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''
        }`}
      onClick={() => onSelect(block.id)}
    >
      <div className="block-content">
        <BlockRenderer block={block} isEditable={true} />
      </div>
      <div className="block-controls">
        <button
          className="drag-handle"
          {...attributes}
          {...listeners}
          title="Drag to reorder"
        >
          ⋮⋮
        </button>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          title="Delete block"
        >
          ✕
        </button>
        {index > 0 && (
          <button
            className="move-btn"
            onClick={(e) => {
              e.stopPropagation();
              onMove(block.id, 'up');
            }}
            title="Move up"
          >
            ↑
          </button>
        )}
        {index < totalBlocks - 1 && (
          <button
            className="move-btn"
            onClick={(e) => {
              e.stopPropagation();
              onMove(block.id, 'down');
            }}
            title="Move down"
          >
            ↓
          </button>
        )}
      </div>
    </div>
  );
}
