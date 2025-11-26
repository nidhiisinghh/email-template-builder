import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { prebuiltAPI, templateAPI } from './utils/api';
import BlockPalette from './components/BlockPalette';
import Canvas from './components/Canvas';
import PreviewPane from './components/PreviewPane';
import ExportPane from './components/ExportPane';
import SPABuilder from './components/SPABuilder';

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [view, setView] = useState('editor'); // 'editor', 'preview', 'export', 'spa'
  const [templateName, setTemplateName] = useState('Untitled Template');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrebuilt, setShowPrebuilt] = useState(false);
  const [prebuiltTemplates, setPrebuiltTemplates] = useState([]);
  const [currentTemplateId, setCurrentTemplateId] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (blocks.length > 0 || templateName !== 'Untitled Template') {
        const draftData = {
          templateName,
          blocks,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('emailTemplateDraft', JSON.stringify(draftData));
      }

      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [templateName, blocks]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');

    if (!templateId) {
      const draftData = localStorage.getItem('emailTemplateDraft');
      if (draftData) {
        try {
          const parsedDraft = JSON.parse(draftData);
          if (parsedDraft && typeof parsedDraft === 'object') {
            if (Array.isArray(parsedDraft.blocks) && parsedDraft.blocks.length > 0) {
              setTemplateName(parsedDraft.templateName || 'Untitled Template');
              setBlocks(parsedDraft.blocks);
              setSuccessMessage('Draft loaded successfully');
              setTimeout(() => setSuccessMessage(''), 3000);
            } else if (parsedDraft.templateName && parsedDraft.templateName !== 'Untitled Template') {
              setTemplateName(parsedDraft.templateName);
            }
          }
        } catch (e) {
          console.error('Failed to parse draft data', e);
          localStorage.removeItem('emailTemplateDraft');
          setSuccessMessage('Corrupted draft cleared');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      }
    }

    if (templateId) {
      setCurrentTemplateId(templateId);
      loadTemplate(templateId);
    }
  }, []);

  useEffect(() => {
    if (showPrebuilt) {
      fetchPrebuiltTemplates();
    }
  }, [showPrebuilt]);

  const fetchPrebuiltTemplates = async () => {
    try {
      const response = await prebuiltAPI.getAll();
      setPrebuiltTemplates(response.data.templates);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to fetch prebuilt templates');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  const loadPrebuiltTemplate = (template) => {
    setTemplateName(template.name);
    setBlocks(template.blocks);
    setShowPrebuilt(false);
  };

  const loadTemplate = async (templateId) => {
    try {
      setLoading(true);
      const response = await templateAPI.getById(templateId);

      setTemplateName(response.data.template.name);
      setBlocks(response.data.template.blocks);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to load template');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async () => {
    try {
      if (blocks.length === 0) {
        setError('Cannot save empty template');
        return;
      }

      setLoading(true);
      setError('');

      const templateData = {
        name: templateName,
        blocks
      };

      // Check if we're updating an existing template
      const urlParams = new URLSearchParams(window.location.search);
      const templateId = urlParams.get('template');

      let response;
      if (templateId) {
        response = await templateAPI.update(templateId, templateData);
      } else {
        response = await templateAPI.create(templateData);
      }

      // If it's a new template, update the URL with the template ID
      if (!templateId && response.data.template._id) {
        setCurrentTemplateId(response.data.template._id);
        window.history.replaceState(null, '', `?template=${response.data.template._id}`);
      }

      localStorage.removeItem('emailTemplateDraft');
      alert('Template saved successfully!');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to save template');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateName}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #f5f5f5;
    }
    .email-content {
      background-color: white;
      padding: 20px;
    }
    button {
      cursor: pointer;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-content">
`;

    blocks.forEach((block) => {
      const style = `style="background-color: ${block.styles.backgroundColor}; padding: ${block.styles.padding}; font-size: ${block.styles.fontSize}; color: ${block.styles.color}; margin: 8px 0; border-radius: 4px;"`;

      switch (block.type) {
        case 'text':
          html += `      <p ${style}>${block.content}</p>\n`;
          break;
        case 'image':
          html += `      <div ${style}><img src="${block.content}" alt="Email content" /></div>\n`;
          break;
        case 'button':
          html += `      <div ${style}><a href="${block.styles.link || '#'}" style="display: inline-block; padding: 10px 20px; background-color: ${block.styles.backgroundColor}; color: ${block.styles.color}; text-decoration: none; border-radius: 4px;">${block.content}</a></div>\n`;
          break;
        case 'divider':
          html += `      <hr style="margin: 8px 0; border: none; border-top: 1px solid ${block.styles.color};" />\n`;
          break;
        case 'spacer':
          html += `      <div style="height: 32px;"></div>\n`;
          break;
        default:
          break;
      }
    });

    html += `    </div>
  </div>
</body>
</html>`;

    navigator.clipboard.writeText(html)
      .then(() => {
        alert('Email HTML copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setError('Failed to copy to clipboard');
      });
  };

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

    // Handle blocks dragged from the palette
    if (active.data?.current?.isNew) {
      const blockType = active.data.current.type;
      addBlock(blockType);
      return;
    }

    // Handle reordering of existing blocks
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
        ...(blockType === 'button' && { link: '#' }), // Add default link for button blocks
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

  const logout = () => {
    // Clear all user-related data
    localStorage.removeItem('token');
    // Redirect to auth page
    window.location.href = '/auth';
  };

  const clearDraft = () => {
    localStorage.removeItem('emailTemplateDraft');
    setTemplateName('Untitled Template');
    setBlocks([]);
    // Only show success message if there was actually a draft to clear
    if (localStorage.getItem('emailTemplateDraft') === null) {
      // Set success message for draft cleared
      setSuccessMessage('Draft cleared successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setError('No draft to clear');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Email Template Builder</h1>
        <div className="header-controls">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="template-name-input"
            placeholder="Template name"
          />
        </div>
      </header>

      {/* Secondary navigation bar for actions */}
      <nav className="secondary-nav">
        <div className="nav-actions">
          <button onClick={() => setShowPrebuilt(true)} className="btn-secondary">
            Prebuilt Templates
          </button>
          <button onClick={saveTemplate} className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Template'}
          </button>
          <button onClick={copyToClipboard} className="copy-btn">
            Copy HTML
          </button>
          <button onClick={clearDraft} className="btn-secondary">
            Clear Draft
          </button>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
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
          <Link to="/saved" className="history-link">
            Saved
          </Link>
          <Link to="/shared-templates" className="history-link">
            Shared
          </Link>
        </div>
      </nav>

      {/* Display error messages */}
      {error && <div className="error-message" style={{ margin: '1rem 2rem' }}>{error}</div>}

      {/* Display success messages */}
      {successMessage && <div className="success-message" style={{ margin: '1rem 2rem' }}>{successMessage}</div>}

      {/* Prebuilt Templates Modal */}
      {showPrebuilt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Prebuilt Templates</h2>
              <button className="close-btn" onClick={() => setShowPrebuilt(false)}>×</button>
            </div>
            <div className="prebuilt-templates-grid">
              {prebuiltTemplates.length > 0 ? (
                prebuiltTemplates.map((template, index) => (
                  <div key={index} className="prebuilt-template-card">
                    <h3>{template.name}</h3>
                    <p>{template.blocks.length} blocks</p>
                    <button
                      className="btn-secondary"
                      onClick={() => loadPrebuiltTemplate(template)}
                    >
                      Use Template
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading prebuilt templates...</p>
              )}
            </div>
          </div>
        </div>
      )}

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
                onAddBlock={addBlock}
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

      {view === 'export' && <ExportPane blocks={blocks} templateId={currentTemplateId} />}

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
          <div className="property-group">
            <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
              Note: Button will appear with default styling if no colors are set
            </p>
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
          value={block.styles.fontSize ? parseInt(block.styles.fontSize) : ''}
          onChange={(e) =>
            onUpdateBlock(block.id, {
              styles: { ...block.styles, fontSize: e.target.value ? `${e.target.value}px` : '16px' },
            })
          }
        />
      </div>

      <div className="property-group">
        <label>Padding (px)</label>
        <input
          type="number"
          value={block.styles.padding ? parseInt(block.styles.padding) : ''}
          onChange={(e) =>
            onUpdateBlock(block.id, {
              styles: { ...block.styles, padding: e.target.value ? `${e.target.value}px` : '16px' },
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