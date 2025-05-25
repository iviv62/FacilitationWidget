import React from 'react';

interface ScaleIndicatorProps {
  value: number; // Value from 0-10
  width?: string;
  animated?: boolean;
}

const ScaleIndicator = ({ value, width = "w-24", animated = false }: ScaleIndicatorProps) => {
  // Ensure value is between 0 and 10
  const validValue = Math.max(0, Math.min(10, value));
  
  // Convert to percentage (0-100)
  const percentage = (validValue / 10) * 100;
  
  return (
    <div className={`${width} h-3 rounded-full overflow-hidden relative border border-gray-200 shadow-inner bg-gray-100`}>
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 ${animated ? 'transition-all duration-1000 ease-out' : ''}`} 
        style={{ clipPath: `inset(0 ${100-percentage}% 0 0)` }}
      />
      <div className="absolute h-full w-0.5 bg-white shadow-sm" style={{ left: `calc(${percentage}% - 1px)` }}></div>
    </div>
  );
};

export default ScaleIndicator; 