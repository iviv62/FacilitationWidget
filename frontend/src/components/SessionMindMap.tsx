"use client"
import React, { useState } from 'react';
import { FaLightbulb, FaTimes, FaEyeSlash } from 'react-icons/fa';
import MindmapView from './MindmapView';

interface SessionMindMapProps {
  data: any | null;
  onClose: () => void;
}

const SessionMindMap = ({ data, onClose }: SessionMindMapProps) => {
  const [activeMap, setActiveMap] = useState<'ideas' | 'blindspots'>('ideas');

  // Generate ideas by category markdown content
  const generateIdeasMarkdown = () => {
    return `
# Student Engagement Ideas

## Pricing & Value
- Student discount program (25% off)
- Last-minute standby tickets
- Student loyalty program
- Free checked baggage for students
- Student subscription model
- Point system for free flights

## Digital Experience
- Dedicated student mobile app
- Group booking platform
- Student community platform
- Travel planning assistant
- Campus rep program
- Virtual reality destination previews

## In-Flight Experience
- Free high-speed Wi-Fi
- Improved snack selection
- Student-themed entertainment
- Study-friendly cabin modes
- Social seating arrangements
- Charging stations at every seat

## Learning & Development
- Internship programs with fair compensation
- Pilot/aviation career workshops
- Study abroad partnerships
- Airport tours with substance
- Coding/design competitions
- Engineering behind-the-scenes

## Sustainability
- Carbon offset program
- Transparent environmental reporting
- Reduced plastic initiative
- Research partnerships
- Green technology scholarships
- Eco-conscious travel options
`;
  };

  // Generate blind spots markdown content
  const generateBlindSpotsMarkdown = () => {
    return `
# Potential Blind Spots & Overlooked Areas

## Student Life Integration
- Academic calendar alignment
- Study abroad coordination
- Campus event partnerships
- Student organization support
- Academic credit opportunities

## Mental Health & Wellbeing
- Travel anxiety support
- Study space availability
- Rest zones in airports
- Wellness programs
- Stress management resources

## Accessibility & Inclusion
- Learning disability support
- Physical accessibility
- Cultural sensitivity
- Language barriers
- Financial aid awareness

## Technology & Innovation
- AI-powered travel planning
- Blockchain loyalty programs
- AR/VR experiences
- Smart luggage integration
- Digital nomad support

## Community Building
- Student travel groups
- Alumni connections
- Peer mentoring
- Social impact projects
- Cultural exchange programs

## Career Development
- Industry partnerships
- Skill development
- Portfolio building
- Networking events
- Professional certifications
`;
  };

  const currentMarkdown = activeMap === 'ideas' 
    ? generateIdeasMarkdown() 
    : generateBlindSpotsMarkdown();

  return (
    <div className="mt-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveMap('ideas')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeMap === 'ideas' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FaLightbulb className="mr-2" />
            Brainstorming Mindmap
          </button>
          <button
            onClick={() => setActiveMap('blindspots')}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeMap === 'blindspots' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FaEyeSlash className="mr-2" />
            Blind Spots Mindmap
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2"
          aria-label="Close mind map"
        >
          <FaTimes size={20} />
        </button>
      </div>
      
      <div style={{ minHeight: '900px', height: '900px' }}>
        <MindmapView markdown={currentMarkdown} height="900px" />
      </div>
    </div>
  );
};

export default SessionMindMap; 