import React, { useState, ReactNode, useRef, useEffect } from 'react';

type TooltipProps = {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

export const Tooltip = ({ children, content, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && childRef.current && tooltipRef.current) {
      const childRect = childRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;
      
      // Calculate position based on the position prop
      switch (position) {
        case 'top':
          top = childRect.top - tooltipRect.height - 8;
          left = childRect.left + (childRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'bottom':
          top = childRect.bottom + 8;
          left = childRect.left + (childRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = childRect.top + (childRect.height / 2) - (tooltipRect.height / 2);
          left = childRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = childRect.top + (childRect.height / 2) - (tooltipRect.height / 2);
          left = childRect.right + 8;
          break;
      }
      
      // Adjust to keep tooltip within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (left < 10) left = 10;
      if (left + tooltipRect.width > viewportWidth - 10) {
        left = viewportWidth - tooltipRect.width - 10;
      }
      
      if (top < 10) top = 10;
      if (top + tooltipRect.height > viewportHeight - 10) {
        top = viewportHeight - tooltipRect.height - 10;
      }
      
      setTooltipPosition({ top, left });
    }
  }, [isVisible, position]);

  return (
    <div 
      ref={childRef}
      className="relative inline-block" 
      onMouseEnter={() => setIsVisible(true)} 
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
      onTouchStart={() => setIsVisible(true)}
      onTouchEnd={(e) => {
        e.preventDefault();
        setTimeout(() => setIsVisible(false), 1500);
      }}
    >
      {children}
      
      {isVisible && content && (
        <div 
          ref={tooltipRef}
          className="fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-lg"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth: '250px'
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}; 