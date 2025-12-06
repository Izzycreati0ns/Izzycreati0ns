import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { initialTreeData, flattenTree, findPath } from './data';
import { FamilyMember } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TreeNode } from './components/Tree';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [scale, setScale] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Tree State
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<FamilyMember | null>(null);

  // Memoized flattened list for searching and looking up parents efficiently
  const flatList = useMemo(() => flattenTree(initialTreeData), []);

  // Initialize: Expand root and select root
  useEffect(() => {
    setExpandedIds(new Set([initialTreeData.id]));
    setSelectedNode(initialTreeData);
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Effect: Update body class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handleToggle = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelect = useCallback((node: FamilyMember) => {
    setSelectedNode(node);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const node = flatList.find(n => n.id === id);
    if (node) {
      setSelectedNode(node);
      
      // Ensure path to node is expanded
      const pathIds = findPath(node.id, initialTreeData);
      if (pathIds) {
        setExpandedIds(prev => {
          const next = new Set(prev);
          pathIds.forEach(pid => next.add(pid));
          return next;
        });
      }
    }
  }, [flatList]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (!term.trim()) return;

    // Find first matching node
    const match = flatList.find(n => n.name.toLowerCase().includes(term.toLowerCase()));
    if (match) {
      handleNavigate(match.id);
    }
  }, [flatList, handleNavigate]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleExpandAll = () => {
    const allIds = new Set(flatList.map(node => node.id));
    setExpandedIds(allIds);
  };

  const handleCollapseAll = () => {
    // Keep only the root expanded
    setExpandedIds(new Set([initialTreeData.id]));
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(initialTreeData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "family_tree.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchTerm('');
        setSelectedNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-800 dark:text-slate-100 font-sans bg-slate-50 dark:bg-slate-900">
      <Header 
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onZoomIn={() => setScale(s => Math.min(s + 0.1, 2))}
        onZoomOut={() => setScale(s => Math.max(s - 0.1, 0.5))}
        onFit={() => setScale(1)}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden relative">
        {/* Main Canvas */}
        <main className="flex-1 relative bg-dot-pattern overflow-hidden cursor-move touch-none">
           <div className="absolute inset-0 overflow-auto p-8 custom-scrollbar">
             <div 
               className="min-w-fit min-h-fit transition-transform duration-300 ease-out origin-top-left p-6"
               style={{ transform: `scale(${scale})` }}
             >
                <div role="tree" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50 dark:border-slate-700/50">
                  <TreeNode 
                    node={initialTreeData}
                    expandedIds={expandedIds}
                    selectedId={selectedNode?.id || null}
                    onToggle={handleToggle}
                    onSelect={handleSelect}
                  />
                </div>
             </div>
           </div>

           {/* Overlay Info */}
           <div className="absolute bottom-6 left-6 text-xs font-mono text-slate-400 pointer-events-none bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md border border-slate-200 dark:border-slate-800">
              ZOOM: {Math.round(scale * 100)}%
           </div>
        </main>

        {/* Sidebar */}
        <Sidebar 
          selectedNode={selectedNode}
          allNodes={flatList}
          onNavigate={handleNavigate}
          onExport={handleExport}
          onPrint={handlePrint}
        />
      </div>
    </div>
  );
}
