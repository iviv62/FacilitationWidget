"use client"
import React, { useState } from 'react';
import { FaFrown, FaMeh, FaSmile } from 'react-icons/fa';
import { FaBullseye } from 'react-icons/fa';
import { FaFileWord } from 'react-icons/fa';
import { FaSnowflake } from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa';
import ScaleIndicator from './ScaleIndicator';

const FacilitationWidget = () => {
  const [mood, setMood] = useState('neutral'); // 'negative', 'neutral', 'positive'
  const [activeIcon, setActiveIcon] = useState('mood');

  const getMoodValue = () => {
    switch (mood) {
      case 'negative': return 2;
      case 'neutral': return 5;
      case 'positive': return 8;
      default: return 5;
    }
  };

  const cycleMood = () => {
    if (mood === 'negative') {
      setMood('neutral');
    } else if (mood === 'neutral') {
      setMood('positive');
    } else {
      setMood('negative');
    }
  };

  const getMoodIcon = () => {
    switch (mood) {
      case 'negative':
        return <FaFrown size={50} className="text-red-500" />;
      case 'neutral':
        return <FaMeh size={50} className="text-yellow-500" />;
      case 'positive':
        return <FaSmile size={50} className="text-green-500" />;
      default:
        return <FaMeh size={50} className="text-yellow-500" />;
    }
  };

  const getSayContent = () => {
    if (activeIcon === 'mood') {
      switch (mood) {
        case 'negative':
          return "I notice the energy seems low. Let's take a moment to reset. What's one aspect of this project that originally excited you? How can we recapture some of that enthusiasm?";
        case 'neutral':
          return "I sense we might need a fresh perspective. Let's take a minute for a quick energy boost - think about why this project mattered to you initially. What's one small but meaningful improvement that would make you personally excited about the outcome we're working toward?";
        case 'positive':
          return "The energy feels great! Let's build on this momentum. What specific aspect of our work today has been most energizing for you, and how can we apply that same approach to other parts of the project?";
        default:
          return "I sense we might need a fresh perspective. Let's take a minute for a quick energy boost - think about why this project mattered to you initially.";
      }
    } else if (activeIcon === 'relevancy') {
      return "Let's check if we're on track. How does what we're discussing right now directly connect to our main objective? Is there anything we should adjust to ensure we're focusing on what matters most?";
    } else if (activeIcon === 'elaborateness') {
      return "I think we could benefit from more detail here. Could you elaborate on that idea? What specific steps would be involved, and what resources might we need?";
    } else if (activeIcon === 'blindspot') {
      return "I wonder if we might be missing something. What perspectives or constraints haven't we considered yet? Who else might have valuable input on this topic?";
    } else if (activeIcon === 'uniqueIdeas') {
      return "Let's try to generate some fresh ideas. What if we approached this from a completely different angle? What would someone from a totally different field suggest?";
    } else {
      return "I sense we might need a fresh perspective. Let's take a minute for a quick energy boost - think about why this project mattered to you initially.";
    }
  };

  const getDoContent = () => {
    if (activeIcon === 'mood') {
      switch (mood) {
        case 'negative':
          return "Take a 2-minute breather. Consider starting with a quick success story before continuing.";
        case 'neutral':
          return "X";
        case 'positive':
          return "Capture this energy - document what's working well to replicate in future sessions.";
        default:
          return "X";
      }
    } else if (activeIcon === 'relevancy') {
      return "Refer back to the project's core objectives document.";
    } else if (activeIcon === 'elaborateness') {
      return "Use the whiteboard to visually map out the details.";
    } else if (activeIcon === 'blindspot') {
      return "Ask each person to write down one concern that hasn't been addressed yet.";
    } else if (activeIcon === 'uniqueIdeas') {
      return "Try a rapid ideation exercise: 5 ideas in 3 minutes.";
    } else {
      return "X";
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 flex flex-wrap justify-around items-center gap-4">
        {/* Mood */}
        <div className="flex flex-col items-center">
          <div 
            className={`w-16 h-16 flex items-center justify-center cursor-pointer p-2 rounded-full ${activeIcon === 'mood' ? 'bg-gray-100' : ''}`}
            onClick={() => {
              setActiveIcon('mood');
              cycleMood();
            }}
            title="Click to change mood"
          >
            {getMoodIcon()}
          </div>
          <span className="text-sm mt-2">Mood</span>
          <div className="mt-2">
            <ScaleIndicator value={getMoodValue()} />
          </div>
        </div>

        {/* Idea relevancy */}
        <div className="flex flex-col items-center">
          <div 
            className={`text-green-600 w-16 h-16 flex items-center justify-center cursor-pointer p-2 rounded-full ${activeIcon === 'relevancy' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveIcon('relevancy')}
          >
            <FaBullseye size={50} />
          </div>
          <span className="text-sm mt-2">Idea relevancy</span>
          <div className="mt-2">
            <ScaleIndicator value={6} />
          </div>
        </div>

        {/* Idea Elaborateness */}
        <div className="flex flex-col items-center">
          <div 
            className={`text-green-500 w-16 h-16 flex items-center justify-center cursor-pointer p-2 rounded-full ${activeIcon === 'elaborateness' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveIcon('elaborateness')}
          >
            <FaFileWord size={50} />
          </div>
          <span className="text-sm mt-2">Idea Elaborateness</span>
          <div className="mt-2">
            <ScaleIndicator value={4} />
          </div>
        </div>

        {/* Blind spot analysis */}
        <div className="flex flex-col items-center">
          <div 
            className={`text-black w-16 h-16 flex items-center justify-center cursor-pointer p-2 rounded-full ${activeIcon === 'blindspot' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveIcon('blindspot')}
          >
            <FaSnowflake size={50} />
          </div>
          <span className="text-sm mt-2">Blind spot analysis</span>
          <div className="mt-2">
            <ScaleIndicator value={7} />
          </div>
        </div>

        {/* Number of Unique Ideas */}
        <div className="flex flex-col items-center">
          <div 
            className={`text-red-500 w-16 h-16 flex items-center justify-center cursor-pointer p-2 rounded-full ${activeIcon === 'uniqueIdeas' ? 'bg-gray-100' : ''}`}
            onClick={() => setActiveIcon('uniqueIdeas')}
          >
            <FaLightbulb size={50} />
          </div>
          <span className="text-sm mt-2">Number of Unique Ideas</span>
          <div className="mt-2">
            <ScaleIndicator value={3} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 p-4">
        <div className="mb-4">
          <div className="font-semibold">Say:</div>
          <p>{getSayContent()}</p>
        </div>
        
        <div>
          <div className="font-semibold">DO:</div>
          <p>{getDoContent()}</p>
        </div>
      </div>
    </div>
  );
};

export default FacilitationWidget; 