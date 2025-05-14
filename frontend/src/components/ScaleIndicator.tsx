import React from 'react';

interface ScaleIndicatorProps {
  value: number; // Value from 0-10
  width?: string;
}

const ScaleIndicator = ({ value, width = "w-24" }: ScaleIndicatorProps) => {
  // Ensure value is between 0 and 10
  const validValue = Math.max(0, Math.min(10, value));
  
  // Convert to percentage (0-100)
  const percentage = (validValue / 10) * 100;
  
  return (
    <div className={`${width} h-4 rounded-md overflow-hidden relative border border-gray-200 shadow-inner`}>
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
      <div className="absolute h-full w-1 bg-white" style={{ left: `calc(${percentage}% - 2px)` }}></div>
    </div>
  );
};

export default ScaleIndicator; 