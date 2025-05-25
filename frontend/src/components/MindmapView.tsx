"use client"
import React, { useRef, useEffect } from 'react';
import { Markmap } from 'markmap-view';
import { transformer } from './markmap';

interface MindmapViewProps {
  markdown: string;
  height?: string;
}

const MindmapView = ({ markdown, height = "700px" }: MindmapViewProps) => {
  const refSvg = useRef<SVGSVGElement>(null);
  const refMm = useRef<Markmap | null>(null);
  
  // Effect to create markmap when SVG ref is available
  useEffect(() => {
    if (!refSvg.current || refMm.current) return;
    
    try {
      const mm = Markmap.create(refSvg.current);
      refMm.current = mm;
    } catch (e) {
      console.error('Error creating markmap:', e);
    }
  }, []);

  // Effect to update markmap data when markdown changes
  useEffect(() => {
    const mm = refMm.current;
    if (!mm) return;
    
    try {
      const { root } = transformer.transform(markdown);
      
      mm.setData(root).then(() => {
        mm.fit();
      });
    } catch (e) {
      console.error('Error updating markmap data:', e);
    }
  }, [markdown]);

  return (
    <div className="relative w-full border border-gray-200 rounded-lg bg-white overflow-hidden" style={{ height }}>
      <svg 
        ref={refSvg} 
        className="w-full h-full"
      />
    </div>
  );
};

export default MindmapView; 