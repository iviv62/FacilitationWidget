"use client"
import React, { useEffect, useState } from 'react';
import { FaTimes, FaSyncAlt } from 'react-icons/fa';
import MindmapView from './MindmapView';
import { useMindMapStore } from '../store/useMindMapStore';

interface SessionMindMapProps {
  data: any | null;
  onClose: () => void;
}

const SessionMindMap = ({ data, onClose }: SessionMindMapProps) => {
  const { workspace_id, mindmap, fetchMindMap } = useMindMapStore();
  const [refreshDisabled, setRefreshDisabled] = useState(false);

  // Prefetch mind map when component mounts
  useEffect(() => {
    if (workspace_id) {
      fetchMindMap(workspace_id);
    }
  }, [workspace_id, fetchMindMap]);

  const handleRefreshClick = async () => {
    if (workspace_id && !refreshDisabled) {
      setRefreshDisabled(true);
      await fetchMindMap(workspace_id);
      setTimeout(() => setRefreshDisabled(false), 5000);
    }
  };

  return (
    <div className="mt-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold flex items-center">
          Brainstorming Mindmap
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleRefreshClick}
            className={`flex items-center px-3 py-2 rounded-md bg-blue-500 text-white ${refreshDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Refresh Mindmap"
            aria-label="Refresh mind map"
            disabled={refreshDisabled}
          >
            <FaSyncAlt className="mr-1" />
            Refresh
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
            aria-label="Close mind map"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </div>
      <div style={{ minHeight: '900px', height: '900px' }}>
        <MindmapView 
        markdown={mindmap ?? ''} 
        height="900px" 
      
        />
      </div>
    </div>
  );
};

export default SessionMindMap;