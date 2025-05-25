"use client"
import React from 'react';
import { Tooltip } from './Tooltip';
import ScaleIndicator from './ScaleIndicator';

interface FacilitationIconProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  tooltip: string;
  isActive: boolean;
  color: string;
  onClick: () => void;
  animated: boolean;
}

const FacilitationIcon = ({
  icon,
  label,
  value,
  tooltip,
  isActive,
  color,
  onClick,
  animated
}: FacilitationIconProps) => {
  return (
    <div className="flex flex-col items-center w-[15%] min-w-[70px]">
      <div className="relative">
        <Tooltip content={tooltip} position="top">
          <div 
            className={`w-14 h-14 flex items-center justify-center cursor-pointer rounded-full ${color} 
              hover:shadow-md transition-all duration-200 transform hover:scale-105
              ${isActive ? 'ring-4 ring-blue-300' : ''}`}
            onClick={onClick}
            aria-label={tooltip}
          >
            {icon}
          </div>
        </Tooltip>
      </div>
      <span className="text-sm font-medium mt-2">{label}</span>
      <div className="mt-2 w-full">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Low</span>
          <span>{value}/10</span>
        </div>
        <ScaleIndicator 
          value={value} 
          width="w-full" 
          animated={animated}
        />
      </div>
    </div>
  );
};

export default FacilitationIcon; 