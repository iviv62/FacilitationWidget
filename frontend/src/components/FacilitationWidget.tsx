"use client"
import React, { useEffect, useState } from 'react';
import { FaBullseye, FaFileWord, FaSpinner, FaProjectDiagram } from 'react-icons/fa';

import { Tooltip } from './Tooltip';
import SessionMindMap from './SessionMindMap';
import { useFacilitationStore } from '@/store/useFacilitationStore';
import FacilitationIcon from './FacilitationIcon';
import {
  getMoodIcon,
  getIconTooltip,
  getActionContent,
  getFacilitationContent,
  getIconBgColor, 
} from '../utils/facilitationUtils';

const FacilitationWidget = () => {
  const { 
    data, 
    error, 
    activeIcon, 
    setActiveIcon,
    connectWebSocket
  } = useFacilitationStore();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [generatingMindMap, setGeneratingMindMap] = useState(false);
  const [mindMapReady, setMindMapReady] = useState(false);

  // Connect WebSocket on mount
  useEffect(() => {
    connectWebSocket();
    setTimeout(() => setIsLoaded(true), 300);
  }, [connectWebSocket]);

  // Function to handle mind map generation
  const handleGenerateMindMap = () => {
    setGeneratingMindMap(true);
    setTimeout(() => {
      setGeneratingMindMap(false);
      setMindMapReady(true);
    }, 1000);
  };

  if (error) {
    return (
      <div className="w-full border border-gray-300 rounded-lg p-4 bg-red-50 text-red-600 text-center">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
      {/* Icons Section */}
      <div className="p-5 flex flex-wrap justify-between items-start gap-x-3 gap-y-6 sm:gap-x-4 md:gap-x-6">
        {/* Mood */}
        <FacilitationIcon
          icon={getMoodIcon(data?.iconData?.mood?.mood)}
          label="Mood"
          value={data?.iconData?.mood?.value ?? 5}
          tooltip={getIconTooltip('mood')}
          isActive={activeIcon === 'mood'}
          color={getIconBgColor(data, 'mood')}
          onClick={() => setActiveIcon('mood')}
          animated={isLoaded}
        />

        {/* Idea relevancy */}
        <FacilitationIcon
          icon={<FaBullseye size={28} />}
          label="Relevancy"
          value={data?.iconData?.relevancy?.value ?? 5}
          tooltip={getIconTooltip('relevancy')}
          isActive={activeIcon === 'relevancy'}
          color={getIconBgColor(data, 'relevancy')}
          onClick={() => setActiveIcon('relevancy')}
          animated={isLoaded}
        />

        {/* Idea Elaborateness */}
        <FacilitationIcon
          icon={<FaFileWord size={28} />}
          label="Detail"
          value={data?.iconData?.elaborateness?.value ?? 5}
          tooltip={getIconTooltip('elaborateness')}
          isActive={activeIcon === 'elaborateness'}
          color={getIconBgColor(data, 'elaborateness')}
          onClick={() => setActiveIcon('elaborateness')}
          animated={isLoaded}
        />
      </div>

      {/* Action Section */}
      <div className="bg-gray-50 p-5 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Facilitation Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-lg font-bold text-blue-700 pb-2 border-b border-gray-100 mb-2 flex items-center">
              <span className="bg-blue-100 text-blue-700 p-1 rounded mr-2 text-xs">FACILITATION</span>
            </div>
            {!data ? (
              <div className="w-full h-6 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="text-gray-700">{getFacilitationContent(data, activeIcon)}</p>
            )}
          </div>
          
          {/* Action Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-lg font-bold text-green-700 pb-2 border-b border-gray-100 mb-2 flex items-center">
              <span className="bg-green-100 text-green-700 p-1 rounded mr-2 text-xs">ACTION</span>
            </div>
            {!data ? (
              <div className="w-full h-6 bg-gray-100 rounded animate-pulse" />
            ) : (
              <>
                <p className="text-gray-700">{getActionContent(data, activeIcon)}</p>
                {data?.iconData?.mood?.iceBreakerJoke && (
                  <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-800 text-sm">
                    <span className="font-semibold">Ice Breaker Joke: </span>
                    {data.iconData.mood.iceBreakerJoke}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Mind Map Section */}
        <div className="mt-4 flex justify-center">
          {!mindMapReady ? (
            <div className="flex justify-center">
              <Tooltip content="Generate interactive mind maps to visualize session analysis and brainstorming ideas" position="top">
                <button
                  onClick={handleGenerateMindMap}
                  disabled={generatingMindMap}
                  className={`flex items-center px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors ${
                    generatingMindMap ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  aria-label="Generate both analysis and brainstorming mind maps"
                >
                  {generatingMindMap ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Generating Mind Map...
                    </>
                  ) : (
                    <>
                      <FaProjectDiagram className="mr-2" />
                      Generate  Mind Map
                    </>
                  )}
                </button>
              </Tooltip>
            </div>
          ) : (
            <SessionMindMap 
              data={data} 
              onClose={() => setMindMapReady(false)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitationWidget;