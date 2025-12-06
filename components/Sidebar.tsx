import React from 'react';
import { FamilyMember } from '../types';
import { DownloadIcon, PrinterIcon } from './Icons';

interface SidebarProps {
  selectedNode: FamilyMember | null;
  allNodes: FamilyMember[];
  onNavigate: (id: string) => void;
  onExport: () => void;
  onPrint: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  selectedNode, 
  allNodes, 
  onNavigate,
  onExport,
  onPrint
}) => {
  
  // Find parent node if exists
  const parentNode = selectedNode?.parentId 
    ? allNodes.find(n => n.id === selectedNode.parentId)
    : null;

  return (
    <aside className="w-full lg:w-96 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl z-30 h-auto lg:h-full transition-all duration-300">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Inspector
          </h2>
          {selectedNode && (
             <span className="text-[10px] font-mono text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
               ID: {selectedNode.id}
             </span>
          )}
        </div>

        {selectedNode ? (
          <div className="animate-slide-in">
            <div className="mb-8">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
                {selectedNode.name.charAt(0)}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                {selectedNode.name}
              </h1>
              <div className="flex gap-2">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedNode.children.length > 0 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {selectedNode.children.length === 0 ? 'Leaf Node' : 'Branch Node'}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Parent Section */}
              <div className="group relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                  Parent
                </span>
                {parentNode ? (
                  <button 
                    onClick={() => onNavigate(parentNode.id)}
                    className="flex items-center gap-3 w-full text-left p-2 -mx-2 rounded-xl hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all group-active:scale-[0.98]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs">
                      {parentNode.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {parentNode.name}
                    </span>
                    <span className="ml-auto text-slate-400">→</span>
                  </button>
                ) : (
                  <div className="p-2 -mx-2 text-sm text-slate-400 italic">Root of tree</div>
                )}
              </div>

              {/* Children Section */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Children
                  </span>
                  <span className="bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-600">
                    {selectedNode.children.length}
                  </span>
                </div>
                
                {selectedNode.children.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => onNavigate(child.id)}
                        className="group flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400 italic text-center py-4">No direct descendants</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center text-slate-400 text-center animate-fade-in">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
               <svg className="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-slate-900 dark:text-white font-medium mb-1">No Selection</h3>
            <p className="text-sm px-8">Tap a person in the tree to view their full details and family connections.</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onExport}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>JSON</span>
          </button>
          <button 
            onClick={onPrint}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white border border-transparent rounded-xl text-sm font-semibold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-sm shadow-slate-900/10"
          >
            <PrinterIcon className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
