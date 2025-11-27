import React from 'react';
import BlockRenderer from './BlockRenderer';
import DraggableBlockItem from './DraggableBlockItem';
import { useDroppable } from '@dnd-kit/core';

export default function Canvas({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
  onAddBlock,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone',
  });

  return (
    <main className="canvas">
      <div
        ref={setNodeRef}
        className={`canvas-content ${isOver ? 'drop-over' : ''}`}
      >
        {blocks.length === 0 ? (
          <div className="canvas-empty">
            <p>Add blocks from the left panel to start building.</p>
          </div>
        ) : (
          <div className="blocks-container">
            {blocks.map((block, index) => (
              <DraggableBlockItem
                key={block.id}
                block={block}
                index={index}
                totalBlocks={blocks.length}
                isSelected={selectedBlockId === block.id}
                onSelect={onSelectBlock}
                onDelete={onDeleteBlock}
                onMove={onMoveBlock}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
