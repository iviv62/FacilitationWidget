"use client"
import React, { useEffect, useRef, useState } from 'react';
import { FaFrown, FaMeh, FaSmile } from 'react-icons/fa';
import { FaBullseye } from 'react-icons/fa';
import { FaFileWord } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { FaProjectDiagram } from 'react-icons/fa';

import { Tooltip } from './Tooltip';

import SessionMindMap from './SessionMindMap';
import { useFacilitationStore } from '@/store/useFacilitationStore';
import FacilitationIcon from './FacilitationIcon';

const FacilitationWidget = () => {
  const { 
    data, 
    loading, 
    error, 
    activeIcon, 
    fetchData, 
    setActiveIcon, 
    cycleMood 
  } = useFacilitationStore();
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [generatingMindMap, setGeneratingMindMap] = useState(false);
  const [mindMapReady, setMindMapReady] = useState(false);
  
  // Initial data fetch
  useEffect(() => {
    fetchData().then(() => {
      // Set loaded flag for animations
      setTimeout(() => setIsLoaded(true), 300);
    });
    
    // Setup polling every 30 seconds
    const setupPolling = () => {
      timerRef.current = setInterval(() => {
        console.log('Polling for updated data...');
        fetchData();
      }, 30000); // 30 seconds
    };
    
    setupPolling();
    
    // Cleanup interval on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [fetchData]);
  
  // Reset polling timer when page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Immediately fetch new data when page becomes visible
        fetchData();
        
        // Reset the timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        timerRef.current = setInterval(() => {
          console.log('Polling for updated data...');
          fetchData();
        }, 30000);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchData]);

  // Function to handle mind map generation
  const handleGenerateMindMap = () => {
    setGeneratingMindMap(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setGeneratingMindMap(false);
      setMindMapReady(true);
    }, 1000);
  };

  const getMoodIcon = () => {
    if (!data) return <FaMeh size={28} className="text-white" />;
    
    switch (data.mood) {
      case 'negative':
        return <FaFrown size={28} className="text-white" />;
      case 'neutral':
        return <FaMeh size={28} className="text-white" />;
      case 'positive':
        return <FaSmile size={28} className="text-white" />;
      default:
        return <FaMeh size={28} className="text-white" />;
    }
  };

  // Get the background color of an icon based on its value (0-10)
  const getIconColorByValue = (value: number) => {
    if (value <= 3) {
      return "bg-red-500"; // Low values (0-3) use red
    } else if (value <= 7) {
      return "bg-yellow-500"; // Medium values (4-7) use yellow
    } else {
      return "bg-green-500"; // High values (8-10) use green
    }
  };

  const getMoodIconColor = () => {
    if (!data) return "bg-gray-300";
    
    // Convert mood to value and get color
    const moodValue = data.iconData.mood.value || 5;
    return getIconColorByValue(moodValue);
  };

  const getIconTooltip = (icon: string) => {
    switch (icon) {
      case 'mood':
        return "Mood indicator";
      case 'relevancy':
        return "Relevancy of current ideas to brainstorming question";
      case 'elaborateness':
        return "Level of detail and development in ideas";
      case 'blindspot':
        return "Potential areas being overlooked";
      default:
        return "";
    }
  };

  const getSayContent = () => {
    if (!data) return "Loading content...";
    
    switch (activeIcon) {
      case 'mood':
        return data.iconData.mood.say;
      case 'relevancy':
        return data.iconData.relevancy.say;
      case 'elaborateness':
        return data.iconData.elaborateness.say;
      case 'blindspot':
        return data.iconData.blindspot.say;
      default:
        return data.iconData.mood.say;
    }
  };

  const getDoContent = () => {
    if (!data) return "Loading...";
    
    switch (activeIcon) {
      case 'mood':
        return data.iconData.mood.do;
      case 'relevancy':
        return data.iconData.relevancy.do;
      case 'elaborateness':
        return data.iconData.elaborateness.do;
      case 'blindspot':
        return data.iconData.blindspot.do;
      default:
        return data.iconData.mood.do;
    }
  };

  if (loading && !data) {
    return (
      <div className="w-full border border-gray-300 rounded-lg p-6 flex justify-center items-center bg-white">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  }

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
          icon={getMoodIcon()}
          label="Mood"
          value={data?.iconData.mood.value || 5}
          tooltip={getIconTooltip('mood')}
          isActive={activeIcon === 'mood'}
          color={getMoodIconColor()}
          onClick={() => {
            setActiveIcon('mood');
            cycleMood();
          }}
          animated={isLoaded}
        />

        {/* Idea relevancy */}
        <FacilitationIcon
          icon={<FaBullseye size={28} />}
          label="Relevancy"
          value={data?.iconData.relevancy.value || 5}
          tooltip={getIconTooltip('relevancy')}
          isActive={activeIcon === 'relevancy'}
          color={getIconColorByValue(data?.iconData.relevancy.value || 5)}
          onClick={() => setActiveIcon('relevancy')}
          animated={isLoaded}
        />

        {/* Idea Elaborateness */}
        <FacilitationIcon
          icon={<FaFileWord size={28} />}
          label="Detail"
          value={data?.iconData.elaborateness.value || 5}
          tooltip={getIconTooltip('elaborateness')}
          isActive={activeIcon === 'elaborateness'}
          color={getIconColorByValue(data?.iconData.elaborateness.value || 5)}
          onClick={() => setActiveIcon('elaborateness')}
          animated={isLoaded}
        />
      </div>

      {/* Action Section */}
      <div className="bg-gray-50 p-5 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Say Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-lg font-bold text-blue-700 pb-2 border-b border-gray-100 mb-2 flex items-center">
              <span className="bg-blue-100 text-blue-700 p-1 rounded mr-2 text-xs">FACILITATION</span>
            
            </div>
            <p className="text-gray-700">{getSayContent()}</p>
          </div>
          
          {/* Do Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-lg font-bold text-green-700 pb-2 border-b border-gray-100 mb-2 flex items-center">
              <span className="bg-green-100 text-green-700 p-1 rounded mr-2 text-xs">ACTION</span>
             
            </div>
            <p className="text-gray-700">{getDoContent()}</p>
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
                      Generating Insight Maps...
                    </>
                  ) : (
                    <>
                      <FaProjectDiagram className="mr-2" />
                      Generate Session Mindmaps
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