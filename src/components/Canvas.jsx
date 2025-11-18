import React from 'react';
import BlockRenderer from './BlockRenderer';
import DraggableBlockItem from './DraggableBlockItem';

export default function Canvas({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
}) {
  return (
    <main className="canvas">
      <div className="canvas-content">
        {blocks.length === 0 ? (
          <div className="canvas-empty">
            <p>👈 Add blocks from the left panel to start building</p>
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
