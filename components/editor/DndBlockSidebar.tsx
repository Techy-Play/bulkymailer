"use client";

import { useDraggable } from "@dnd-kit/core";
import { BlockType } from "@/lib/editor/waypoint-schema";
import { 
  Type, 
  Image as ImageIcon, 
  Layout, 
  MousePointerClick, 
  Package, 
  Columns, 
  Minus, 
  Maximize, 
  Share2, 
  AlignLeft 
} from "lucide-react";
import clsx from "clsx";

interface DndBlockSidebarProps {
  onAddBlock: (type: BlockType) => void;
}

const BLOCKS: { type: BlockType; label: string; icon: any; category: string }[] = [
  { type: "hero", label: "Hero Banner", icon: Layout, category: "Layout" },
  { type: "columns", label: "Grid Columns", icon: Columns, category: "Layout" },
  
  { type: "heading", label: "Heading", icon: Type, category: "Basic" },
  { type: "text", label: "Paragraph", icon: AlignLeft, category: "Basic" },
  { type: "image", label: "Image", icon: ImageIcon, category: "Basic" },
  { type: "button", label: "Button", icon: MousePointerClick, category: "Basic" },
  
  { type: "product", label: "Product Card", icon: Package, category: "E-Commerce" },
  
  { type: "divider", label: "Divider", icon: Minus, category: "Structure" },
  { type: "spacer", label: "Spacer", icon: Maximize, category: "Structure" },
  
  { type: "social", label: "Social Links", icon: Share2, category: "Footer" },
  { type: "footer", label: "Email Footer", icon: Layout, category: "Footer" },
];

function DraggableBlockItem({ block, onAdd }: { block: typeof BLOCKS[0], onAdd: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${block.type}`,
    data: {
      type: "sidebar-block",
      blockType: block.type,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onAdd}
      className={clsx(
        "flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg bg-white hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer group shadow-sm",
        isDragging && "opacity-50 ring-2 ring-indigo-500"
      )}
    >
      <block.icon className="w-6 h-6 mb-2 text-gray-500 group-hover:text-indigo-600 transition-colors" />
      <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-700">{block.label}</span>
    </div>
  );
}

export function DndBlockSidebar({ onAddBlock }: DndBlockSidebarProps) {
  const categories = Array.from(new Set(BLOCKS.map(b => b.category)));

  return (
    <div className="w-72 border-r border-gray-200 bg-[#FAFAFA] flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-sm font-bold text-gray-900">Blocks</h2>
        <p className="text-xs text-gray-500 mt-1">Drag and drop, or click to add</p>
      </div>

      <div className="p-4 space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {BLOCKS.filter(b => b.category === category).map(block => (
                <DraggableBlockItem 
                  key={block.type} 
                  block={block} 
                  onAdd={() => onAddBlock(block.type)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
