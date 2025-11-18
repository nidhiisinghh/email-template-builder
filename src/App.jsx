import React, { useState } from 'react';
import './App.css';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import BlockPalette from './components/BlockPalette';
import Canvas from './components/Canvas';
import PreviewPane from './components/PreviewPane';
import ExportPane from './components/ExportPane';
import SPABuilder from './components/SPABuilder';

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [view, setView] = useState('editor'); // 'editor', 'preview', 'export', 'spa'

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newBlocks = arrayMove(blocks, oldIndex, newIndex);
        setBlocks(newBlocks);
      }
    }
  };

  const addBlock = (blockType) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      content: blockType === 'text' ? 'Click to edit text' : '',
      styles: {
        backgroundColor: '#ffffff',
        padding: '16px',
        fontSize: '16px',
        color: '#000000',
      },
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (blockId, updates) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    );
  };

  const deleteBlock = (blockId) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
    if (selectedBlockId === blockId) setSelectedBlockId(null);
  };

  const moveBlock = (blockId, direction) => {
    const index = blocks.findIndex((b) => b.id === blockId);
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      setBlocks(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Email Template Builder</h1>
        <div className="view-tabs">
          <button
            className={`tab ${view === 'editor' ? 'active' : ''}`}
            onClick={() => setView('editor')}
          >
            Editor
          </button>
          <button
            className={`tab ${view === 'preview' ? 'active' : ''}`}
            onClick={() => setView('preview')}
          >
            Preview
          </button>
          <button
            className={`tab ${view === 'export' ? 'active' : ''}`}
            onClick={() => setView('export')}
          >
            Export
          </button>
          <button
            className={`tab ${view === 'spa' ? 'active' : ''}`}
            onClick={() => setView('spa')}
          >
            SPA
          </button>
        </div>
      </header>

      {view === 'editor' && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="main-content">
              <BlockPalette onAddBlock={addBlock} />
              <Canvas
                blocks={blocks}
                selectedBlockId={selectedBlockId}
                onSelectBlock={setSelectedBlockId}
                onUpdateBlock={updateBlock}
                onDeleteBlock={deleteBlock}
                onMoveBlock={moveBlock}
              />
              {selectedBlock && (
                <PropertyPanel
                  block={selectedBlock}
                  onUpdateBlock={updateBlock}
                  onMoveBlock={moveBlock}
                />
              )}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {view === 'preview' && <PreviewPane blocks={blocks} />}

      {view === 'export' && <ExportPane blocks={blocks} />}

      {view === 'spa' && <SPABuilder blocks={blocks} />}
    </div>
  );
}

function PropertyPanel({ block, onUpdateBlock, onMoveBlock }) {
  return (
    <div className="property-panel">
      <h3>Properties</h3>

      {block.type === 'text' && (
        <div className="property-group">
          <label>Content</label>
          <textarea
            value={block.content}
            onChange={(e) =>
              onUpdateBlock(block.id, { content: e.target.value })
            }
            rows="4"
          />
        </div>
      )}

      {block.type === 'image' && (
        <div className="property-group">
          <label>Image URL</label>
          <input
            type="text"
            value={block.content}
            onChange={(e) =>
              onUpdateBlock(block.id, { content: e.target.value })
            }
            placeholder="Enter image URL"
          />
        </div>
      )}

      {block.type === 'button' && (
        <>
          <div className="property-group">
            <label>Button Text</label>
            <input
              type="text"
              value={block.content}
              onChange={(e) =>
                onUpdateBlock(block.id, { content: e.target.value })
              }
              placeholder="Enter button text"
            />
          </div>
          <div className="property-group">
            <label>Link URL</label>
            <input
              type="text"
              value={block.styles.link || ''}
              onChange={(e) =>
                onUpdateBlock(block.id, {
                  styles: { ...block.styles, link: e.target.value },
                })
              }
              placeholder="https://example.com"
            />
          </div>
        </>
      )}

      <div className="property-group">
        <label>Background Color</label>
        <input
          type="color"
          value={block.styles.backgroundColor}
          onChange={(e) =>
            onUpdateBlock(block.id, {
              styles: { ...block.styles, backgroundColor: e.target.value },
            })
          }
        />
      </div>

      <div className="property-group">
        <label>Text Color</label>
        <input
          type="color"
          value={block.styles.color}
          onChange={(e) =>
            onUpdateBlock(block.id, {
              styles: { ...block.styles, color: e.target.value },
            })
          }
        />
      </div>

      <div className="property-group">
        <label>Font Size (px)</label>
        <input
          type="number"
          value={parseInt(block.styles.fontSize)}
          onChange={(e) =>
            onUpdateBlock(block.id, {
              styles: { ...block.styles, fontSize: `${e.target.value}px` },
            })
          }
        />
      </div>

      <div className="property-group">
        <label>Padding (px)</label>
        <input
          type="number"
          value={parseInt(block.styles.padding)}
          onChange={(e) =>
            onUpdateBlock(block.id, {
              styles: { ...block.styles, padding: `${e.target.value}px` },
            })
          }
        />
      </div>

      <div className="property-group">
        <div className="button-group">
          <button onClick={() => onMoveBlock(block.id, 'up')} className="btn-small">
            ↑ Move Up
          </button>
          <button onClick={() => onMoveBlock(block.id, 'down')} className="btn-small">
            ↓ Move Down
          </button>
        </div>
      </div>
    </div>
  );
}
