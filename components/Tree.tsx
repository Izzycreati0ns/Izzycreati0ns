import React from 'react';
import { FamilyMember } from '../types';
import { ChevronRightIcon, ChevronDownIcon } from './Icons';

interface TreeProps {
  node: FamilyMember;
  expandedIds: Set<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (node: FamilyMember) => void;
}

export const TreeNode: React.FC<TreeProps> = ({ 
  node, 
  expandedIds, 
  selectedId, 
  onToggle, 
  onSelect
}) => {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(node);
      if (hasChildren) {
        onToggle(node.id);
      }
    }
  };

  return (
    <div className="flex flex-col select-none relative z-10">
      <div 
        className={`
          group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 border
          ${isSelected 
            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm' 
            : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
          }
        `}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className={`
            w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-200
            ${hasChildren 
              ? 'hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm text-slate-500 dark:text-slate-400' 
              : 'invisible'
            }
          `}
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
             <ChevronDownIcon className="w-4 h-4" /> 
          </div>
        </button>

        {/* Node Content */}
        <div className="flex flex-col">
          <span className={`font-medium text-sm transition-colors ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'}`}>
            {node.name}
          </span>
        </div>

        {/* Child Count Badge */}
        {hasChildren && !isExpanded && (
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {node.children.length}
          </span>
        )}
      </div>

      {/* Recursive Children Container with Animation */}
      <div 
        className={`grid-expand ${hasChildren && isExpanded ? 'expanded' : ''}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col relative pl-6">
            {/* Vertical Guide Line */}
            {hasChildren && (
              <div className="absolute left-[22px] top-0 bottom-3 w-px bg-slate-200 dark:bg-slate-700"></div>
            )}
            
            {node.children.map(child => (
               <div key={child.id} className="relative">
                 {/* Horizontal Connector */}
                 <div className="absolute left-[-2px] top-6 w-3 h-px bg-slate-200 dark:bg-slate-700"></div>
                 <TreeNode
                  node={child}
                  expandedIds={expandedIds}
                  selectedId={selectedId}
                  onToggle={onToggle}
                  onSelect={onSelect}
                />
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
