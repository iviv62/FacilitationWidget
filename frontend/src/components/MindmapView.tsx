"use client"
import React, { useRef, useEffect, useCallback } from 'react';
import { Markmap } from 'markmap-view';
import { transformer } from './markmap';

interface MindmapViewProps {
  markdown: string;
  height?: string;
}

const MindmapView = ({ markdown, height = "700px" }: MindmapViewProps) => {
  const refSvg = useRef<SVGSVGElement>(null);
  const refMm = useRef<Markmap | null>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  // Effect to create markmap when SVG ref is available
  useEffect(() => {
    if (!refSvg.current || refMm.current) return;
    
    try {
      const mm = Markmap.create(refSvg.current, {
        maxWidth: 500,
        initialExpandLevel: 0, // All branches collapsed except root
        // add other options here if needed
      });
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

  // Fullscreen handler
  const handleFullscreen = useCallback(() => {
    const el = refContainer.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  return (
    <div ref={refContainer} className="relative w-full border border-gray-200 rounded-lg bg-white overflow-hidden" style={{ height }}>
      <button
        type="button"
        onClick={handleFullscreen}
        className="absolute top-2 right-2 z-10 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none"
        title="Toggle Fullscreen"
      >
        ⛶
      </button>
      <svg 
        ref={refSvg} 
        className="w-full h-full"
      />
    </div>
  );
};

export default MindmapView;