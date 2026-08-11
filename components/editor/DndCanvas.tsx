"use client";

import { useMemo, useState } from "react";
import { EditorBlock } from "@/lib/editor/waypoint-schema";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent, 
  DragStartEvent, 
  DragOverlay,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { SortableBlockItem } from "./SortableBlockItem";
import clsx from "clsx";

interface DndCanvasProps {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  onBlocksChange: (blocks: EditorBlock[]) => void;
  onSelectBlock: (id: string | null) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
}

export function DndCanvas({
  blocks,
  selectedBlockId,
  onBlocksChange,
  onSelectBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock
}: DndCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px movement before dragging starts (allows clicks on buttons)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      // Is it a new block from the sidebar?
      if (String(active.id).startsWith("sidebar-")) {
        const blockType = active.data.current?.blockType as any;
        if (!blockType) return;
        
        const newBlock: EditorBlock = {
          id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          type: blockType,
          props: getDefaultPropsForType(blockType)
        };

        const overIndex = blocks.findIndex((b) => b.id === over.id);
        const newBlocks = [...blocks];
        newBlocks.splice(overIndex + 1, 0, newBlock); // Insert after the dropped target
        
        onBlocksChange(newBlocks);
        onSelectBlock(newBlock.id);
      } else {
        // Sorting existing blocks
        const oldIndex = blocks.findIndex((b) => b.id === active.id);
        const newIndex = blocks.findIndex((b) => b.id === over.id);
        
        onBlocksChange(arrayMove(blocks, oldIndex, newIndex));
      }
    }
  };

  // Create an active block for the overlay when dragging
  const activeBlock = useMemo(() => {
    if (!activeId) return null;
    if (activeId.startsWith("sidebar-")) {
      return { id: 'temp', type: activeId.replace('sidebar-', ''), props: {} } as EditorBlock;
    }
    return blocks.find(b => b.id === activeId);
  }, [activeId, blocks]);

  const blockIds = useMemo(() => blocks.map(b => b.id), [blocks]);

  return (
    <div className="flex-1 bg-[#F4F4F5] overflow-y-auto flex justify-center p-8">
      <div 
        className="w-full max-w-[600px] bg-white shadow-xl min-h-[800px] relative"
        onClick={(e) => {
          // Deselect if clicking exactly on canvas background (not inside a block)
          if (e.target === e.currentTarget) {
            onSelectBlock(null);
          }
        }}
      >
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={blockIds}
            strategy={verticalListSortingStrategy}
          >
            {blocks.length === 0 ? (
              <div className="h-[400px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 m-8 rounded-lg pointer-events-none">
                Drag and drop blocks here
              </div>
            ) : (
              <div className="flex flex-col w-full h-full pb-32">
                {blocks.map((block) => (
                  <SortableBlockItem 
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onSelect={() => onSelectBlock(block.id)}
                    onDelete={() => onDeleteBlock(block.id)}
                    onDuplicate={() => onDuplicateBlock(block.id)}
                    onMoveUp={() => onMoveBlock(block.id, 'up')}
                    onMoveDown={() => onMoveBlock(block.id, 'down')}
                  />
                ))}
              </div>
            )}
          </SortableContext>

          <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.4" } } }) }}>
            {activeBlock ? (
              <div className="opacity-80 scale-105 shadow-2xl rotate-2">
                <SortableBlockItem 
                  block={activeBlock} 
                  isSelected={true} 
                  isOverlay 
                  onSelect={() => {}} 
                  onDelete={() => {}} 
                  onDuplicate={() => {}} 
                  onMoveUp={() => {}} 
                  onMoveDown={() => {}} 
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

// Basic default props when dropping a new block
function getDefaultPropsForType(type: string): any {
  switch (type) {
    case 'heading': return { text: 'New Heading', level: 'h2' };
    case 'text': return { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' };
    case 'button': return { text: 'Click Here', url: '#' };
    case 'image': return { url: 'https://via.placeholder.com/600x300' };
    case 'divider': return { lineColor: '#E5E7EB', lineHeight: 2 };
    case 'spacer': return { height: 32 };
    case 'hero': return { title: 'Welcome', subtitle: 'This is a hero section' };
    case 'product': return { title: 'Product Name', price: '$99.00', image: 'https://via.placeholder.com/300x300' };
    case 'columns': return { columns: 2 };
    case 'social': return {};
    case 'footer': return { company: 'My Company', address: '123 Main St' };
    default: return {};
  }
}
