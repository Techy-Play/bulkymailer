"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditorBlock } from "@/lib/editor/waypoint-schema";
import { GripVertical, Trash2, Copy, ChevronUp, ChevronDown, Lock } from "lucide-react";
import clsx from "clsx";

interface SortableBlockItemProps {
  block: EditorBlock;
  isSelected: boolean;
  isOverlay?: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function SortableBlockItem({
  block,
  isSelected,
  isOverlay,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown
}: SortableBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: block.id,
    data: { type: "canvas-block", block }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : (isSelected ? 40 : 1)
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={clsx(
        "relative group w-full outline-none transition-all duration-200 cursor-pointer",
        isDragging && "opacity-50",
        isSelected ? "ring-2 ring-indigo-500 ring-inset z-40 shadow-sm" : "hover:ring-1 hover:ring-gray-300 hover:ring-inset"
      )}
    >
      {/* Absolute floating action bar - Only visible when selected or hovered (and not dragging) */}
      {!isDragging && (isSelected || !isOverlay) && (
        <div className={clsx(
          "absolute -right-12 top-0 flex-col items-center bg-white shadow-md border border-gray-200 rounded-md py-1 px-1 gap-1 z-50",
          isSelected ? "flex" : "hidden group-hover:flex"
        )}>
          {/* Drag Handle */}
          <div 
            {...attributes} 
            {...listeners} 
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
            title="Drag to move"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          
          <div className="w-6 h-px bg-gray-200 my-1" />
          
          <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Move Up"><ChevronUp className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Move Down"><ChevronDown className="w-4 h-4" /></button>
          
          <div className="w-6 h-px bg-gray-200 my-1" />
          
          <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded" title="Duplicate"><Copy className="w-4 h-4" /></button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 className="w-4 h-4" /></button>
        </div>
      )}

      {/* Block Type Badge (Top Left) */}
      {!isDragging && isSelected && (
        <div className="absolute -top-3 left-2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-50 pointer-events-none">
          {block.type}
        </div>
      )}

      {/* RENDER THE BLOCK VISUALLY (WYSIWYG representation) */}
      <div className="w-full relative pointer-events-none">
        <BlockRenderer block={block} />
      </div>

    </div>
  );
}

// A simple local renderer just for the canvas WYSIWYG
function BlockRenderer({ block }: { block: EditorBlock }) {
  const p = block.props;
  const paddingStr = p.padding ? `${p.padding.top || 0}px ${p.padding.right || 0}px ${p.padding.bottom || 0}px ${p.padding.left || 0}px` : undefined;

  switch (block.type) {
    case 'heading':
      const HTag = (p.level || 'h2') as any;
      return (
        <div style={{ padding: paddingStr, textAlign: p.textAlign, backgroundColor: p.backgroundColor }}>
          <HTag style={{ color: p.color, fontWeight: p.fontWeight, margin: 0, fontFamily: p.fontFamily || 'sans-serif' }}>
            {p.text}
          </HTag>
        </div>
      );
      
    case 'text':
      return (
        <div style={{ padding: paddingStr, textAlign: p.textAlign, backgroundColor: p.backgroundColor }}>
          <p style={{ color: p.color, fontSize: p.fontSize, fontWeight: p.fontWeight, margin: 0, fontFamily: p.fontFamily || 'sans-serif', whiteSpace: 'pre-wrap' }}>
            {p.text}
          </p>
        </div>
      );

    case 'button':
      let btnStyles: React.CSSProperties = {
        backgroundColor: p.buttonBackgroundColor || '#4F46E5',
        color: p.buttonTextColor || '#FFF',
        padding: '12px 24px',
        display: p.fullWidth ? 'block' : 'inline-block',
        width: p.fullWidth ? '100%' : 'auto',
        textAlign: 'center',
        textDecoration: 'none',
        fontWeight: p.fontWeight || 'bold',
        borderRadius: p.buttonStyle === 'pill' ? '9999px' : p.buttonStyle === 'square' ? '0' : '8px'
      };
      
      return (
        <div style={{ padding: paddingStr, textAlign: p.textAlign || 'center' }}>
          <span style={btnStyles}>{p.text}</span>
        </div>
      );

    case 'image':
      return (
        <div style={{ padding: paddingStr, textAlign: p.textAlign, backgroundColor: p.backgroundColor }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={p.url || 'https://via.placeholder.com/600x300'} 
            alt={p.alt || 'Image'}
            style={{ 
              maxWidth: '100%', 
              width: p.width ? `${p.width}px` : 'auto',
              display: 'inline-block' 
            }} 
          />
        </div>
      );

    case 'divider':
      return (
        <div style={{ padding: paddingStr }}>
          <div style={{ 
            height: p.lineHeight || 1, 
            backgroundColor: p.lineColor || '#E5E7EB',
            width: '100%' 
          }} />
        </div>
      );

    case 'spacer':
      return <div style={{ height: p.height || 32, width: '100%' }} />;

    case 'hero':
      return (
        <div style={{ backgroundColor: p.backgroundColor || '#F3F4F6', padding: `${p.paddingTop || 48}px 24px`, textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: p.titleColor || '#111827' }}>{p.title}</h1>
          <p style={{ margin: '16px 0 0 0', fontSize: '18px', color: p.subtitleColor || '#4B5563' }}>{p.subtitle}</p>
        </div>
      );

    case 'product':
      return (
        <div style={{ padding: '24px', textAlign: 'center', border: '1px solid #E5E7EB', borderRadius: '8px', margin: paddingStr || '0 16px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image || 'https://via.placeholder.com/300x300'} style={{ maxWidth: '100%', borderRadius: '4px', margin: '0 auto' }} alt="Product" />
          <h3 style={{ margin: '16px 0 8px 0', fontSize: '20px', color: '#111827' }}>{p.title}</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold', color: '#4F46E5' }}>{p.price}</p>
        </div>
      );

    case 'columns':
      const cols = p.columns || 2;
      return (
        <div style={{ display: 'flex', width: '100%', padding: '16px' }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} style={{ flex: 1, padding: '0 8px' }}>
              <div style={{ backgroundColor: '#F9FAFB', border: '1px dashed #D1D5DB', padding: '24px', textAlign: 'center', color: '#9CA3AF', borderRadius: '4px' }}>
                Column {i + 1}
              </div>
            </div>
          ))}
        </div>
      );

    case 'social':
      return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <span style={{ margin: '0 8px', color: '#4B5563' }}>Twitter</span>
          <span style={{ margin: '0 8px', color: '#4B5563' }}>LinkedIn</span>
          <span style={{ margin: '0 8px', color: '#4B5563' }}>Instagram</span>
        </div>
      );

    case 'footer':
      return (
        <div style={{ padding: '32px 24px', textAlign: 'center', fontSize: '12px', color: '#6B7280' }}>
          <p style={{ margin: '0 0 8px 0' }}>{p.company}</p>
          <p style={{ margin: '0 0 16px 0' }}>{p.address}</p>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} All rights reserved. Unsubscribe</p>
        </div>
      );

    default:
      return <div className="p-4 bg-red-50 text-red-500 border border-red-200">Unknown block: {block.type}</div>;
  }
}
