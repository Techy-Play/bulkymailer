"use client";

import { EditorBlock } from "@/lib/editor/waypoint-schema";
import { CloudinaryImageDropzone } from "./CloudinaryImageDropzone";

interface WaypointInspectorProps {
  block: EditorBlock | null;
  onChange: (updatedBlock: EditorBlock) => void;
}

export function WaypointInspector({ block, onChange }: WaypointInspectorProps) {
  if (!block) {
    return (
      <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full items-center justify-center p-6 text-center text-gray-500">
        <p className="text-sm">Select a block on the canvas to inspect and edit its properties.</p>
      </div>
    );
  }

  const updateProps = (key: string, value: any) => {
    onChange({
      ...block,
      props: {
        ...block.props,
        [key]: value
      }
    });
  };

  const updatePadding = (key: 'top' | 'bottom' | 'left' | 'right', value: number) => {
    const currentPadding = block.props.padding || { top: 0, bottom: 0, left: 0, right: 0 };
    updateProps('padding', { ...currentPadding, [key]: value });
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          {block.type} Block
        </h2>
        <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-mono">
          {block.id.slice(0,6)}
        </span>
      </div>

      <div className="p-4 space-y-6">
        
        {/* TEXT / HEADING CONTROLS */}
        {(block.type === 'heading' || block.type === 'text') && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Content</h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Text</label>
              <textarea 
                value={block.props.text || ''}
                onChange={e => updateProps('text', e.target.value)}
                className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
              />
            </div>
            
            {block.type === 'heading' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Level</label>
                <select 
                  value={block.props.level || 'h2'}
                  onChange={e => updateProps('level', e.target.value)}
                  className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="h4">Heading 4</option>
                </select>
              </div>
            )}
            
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Typography & Style</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                <input 
                  type="color" 
                  value={block.props.color || '#000000'}
                  onChange={e => updateProps('color', e.target.value)}
                  className="w-full h-8 p-0.5 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Align</label>
                <select 
                  value={block.props.textAlign || 'left'}
                  onChange={e => updateProps('textAlign', e.target.value)}
                  className="w-full text-sm p-1.5 border border-gray-300 rounded"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            {block.type === 'text' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
                <input 
                  type="number" 
                  value={block.props.fontSize || 16}
                  onChange={e => updateProps('fontSize', parseInt(e.target.value))}
                  className="w-full text-sm p-1.5 border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        )}

        {/* IMAGE / HERO / PRODUCT CONTROLS */}
        {(block.type === 'image' || block.type === 'hero' || block.type === 'product') && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Image / Media</h3>
            <CloudinaryImageDropzone 
              value={block.props.url || block.props.image}
              onChange={url => updateProps(block.type === 'image' ? 'url' : 'image', url)}
            />
            
            {block.type === 'image' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Alt Text</label>
                  <input 
                    type="text" 
                    value={block.props.alt || ''}
                    onChange={e => updateProps('alt', e.target.value)}
                    className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Link URL (Href)</label>
                  <input 
                    type="text" 
                    value={block.props.linkHref || ''}
                    onChange={e => updateProps('linkHref', e.target.value)}
                    className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Max Width (px)</label>
                  <input 
                    type="number" 
                    value={block.props.width || ''}
                    onChange={e => updateProps('width', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                    placeholder="Auto"
                  />
                </div>
              </>
            )}

            {block.type === 'hero' && (
              <>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Hero Content</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={block.props.title || ''} onChange={e => updateProps('title', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
                  <textarea value={block.props.subtitle || ''} onChange={e => updateProps('subtitle', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
                  <input type="color" value={block.props.backgroundColor || '#F3F4F6'} onChange={e => updateProps('backgroundColor', e.target.value)} className="w-full h-8 p-0.5 border border-gray-300 rounded" />
                </div>
              </>
            )}

            {block.type === 'product' && (
              <>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Product Info</h3>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" value={block.props.title || ''} onChange={e => updateProps('title', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                  <input type="text" value={block.props.price || ''} onChange={e => updateProps('price', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" />
                </div>
              </>
            )}
          </div>
        )}

        {/* BUTTON CONTROLS */}
        {block.type === 'button' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Button Link & Text</h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Label Text</label>
              <input type="text" value={block.props.text || ''} onChange={e => updateProps('text', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Destination URL</label>
              <input type="text" value={block.props.url || ''} onChange={e => updateProps('url', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" placeholder="https://" />
            </div>
            
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Button Style</h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Shape / Border Radius</label>
              <select value={block.props.buttonStyle || 'rounded'} onChange={e => updateProps('buttonStyle', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded">
                <option value="rectangle">Square (0px)</option>
                <option value="rounded">Rounded (8px)</option>
                <option value="pill">Pill (9999px)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Background</label>
                <input type="color" value={block.props.buttonBackgroundColor || '#4F46E5'} onChange={e => updateProps('buttonBackgroundColor', e.target.value)} className="w-full h-8 p-0.5 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
                <input type="color" value={block.props.buttonTextColor || '#FFFFFF'} onChange={e => updateProps('buttonTextColor', e.target.value)} className="w-full h-8 p-0.5 border border-gray-300 rounded" />
              </div>
            </div>
          </div>
        )}

        {/* COLUMNS CONTROLS */}
        {block.type === 'columns' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Grid Layout</h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Number of Columns</label>
              <select value={block.props.columns || 2} onChange={e => updateProps('columns', parseInt(e.target.value))} className="w-full text-sm p-2 border border-gray-300 rounded">
                <option value={1}>1 Column</option>
                <option value={2}>2 Columns</option>
                <option value={3}>3 Columns</option>
                <option value={4}>4 Columns</option>
              </select>
            </div>
          </div>
        )}
        
        {/* DIVIDER / SPACER CONTROLS */}
        {block.type === 'divider' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Line Style</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                <input type="color" value={block.props.lineColor || '#E5E7EB'} onChange={e => updateProps('lineColor', e.target.value)} className="w-full h-8 p-0.5 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Thickness (px)</label>
                <input type="number" value={block.props.lineHeight || 1} onChange={e => updateProps('lineHeight', parseInt(e.target.value))} className="w-full text-sm p-1.5 border border-gray-300 rounded" />
              </div>
            </div>
          </div>
        )}
        {block.type === 'spacer' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Spacing</h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Height (px)</label>
              <input type="range" min="10" max="120" value={block.props.height || 32} onChange={e => updateProps('height', parseInt(e.target.value))} className="w-full" />
              <div className="text-center text-xs text-gray-500 mt-1">{block.props.height || 32}px</div>
            </div>
          </div>
        )}

        {/* SOCIAL & FOOTER CONTROLS */}
        {(block.type === 'social' || block.type === 'footer') && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Footer Data</h3>
            {block.type === 'social' && (
              <>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Twitter URL</label><input type="text" value={block.props.twitter || ''} onChange={e => updateProps('twitter', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn URL</label><input type="text" value={block.props.linkedin || ''} onChange={e => updateProps('linkedin', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Instagram URL</label><input type="text" value={block.props.instagram || ''} onChange={e => updateProps('instagram', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" /></div>
              </>
            )}
            {block.type === 'footer' && (
              <>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label><input type="text" value={block.props.company || ''} onChange={e => updateProps('company', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Address</label><input type="text" value={block.props.address || ''} onChange={e => updateProps('address', e.target.value)} className="w-full text-sm p-2 border border-gray-300 rounded" /></div>
              </>
            )}
          </div>
        )}

        {/* UNIVERSAL SPACING (PADDING) */}
        {block.type !== 'spacer' && (
          <div className="space-y-4 pt-4 border-t border-gray-200 mt-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Padding (px)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase text-gray-500 mb-1">Top</label>
                <input type="number" value={block.props.padding?.top || 0} onChange={e => updatePadding('top', parseInt(e.target.value) || 0)} className="w-full text-sm p-1.5 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-gray-500 mb-1">Bottom</label>
                <input type="number" value={block.props.padding?.bottom || 0} onChange={e => updatePadding('bottom', parseInt(e.target.value) || 0)} className="w-full text-sm p-1.5 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-gray-500 mb-1">Left</label>
                <input type="number" value={block.props.padding?.left || 0} onChange={e => updatePadding('left', parseInt(e.target.value) || 0)} className="w-full text-sm p-1.5 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-gray-500 mb-1">Right</label>
                <input type="number" value={block.props.padding?.right || 0} onChange={e => updatePadding('right', parseInt(e.target.value) || 0)} className="w-full text-sm p-1.5 border border-gray-300 rounded" />
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
