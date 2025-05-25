import React from 'react';

interface ActionContentProps {
  title: string;
  titleColor: string;
  labelText: string;
  labelBgColor: string;
  content: string;
}

const ActionContent = ({ 
  title, 
  titleColor, 
  labelText, 
  labelBgColor, 
  content 
}: ActionContentProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className={`text-lg font-bold ${titleColor} pb-2 border-b border-gray-100 mb-2 flex items-center`}>
        <span className={`${labelBgColor} ${titleColor} p-1 rounded mr-2 text-xs`}>{labelText}</span>
        {title}:
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default ActionContent; 