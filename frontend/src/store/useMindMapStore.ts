import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_WORKSPACE_ID = 'ae_zxeUQ7JqI2T5l9NFlbRGC0iWznW4xDbj1FjcdCu0UP8.1';

type MindMapState = {
  workspace_id: string | null;
  mindmap: string | null;
  fetchMindMap: (workspace_id: string) => Promise<void>;
  setMindMap: (mindmap: string) => void;
};

export const useMindMapStore = create<MindMapState>((set) => ({
  workspace_id: DEFAULT_WORKSPACE_ID,
  mindmap: null,
  fetchMindMap: async (workspace_id: string) => {
    try {
      const response = await axios.get(`${API_URL}mind_maps/mind_maps/${workspace_id}`);
      console.log('Fetched mind map:', response.data);
      set({
        workspace_id,
        mindmap: response.data.data, // Adjust if your API returns a different structure
      });
    } catch (error) {
      console.error('Failed to fetch mind map:', error);
      set({ workspace_id, mindmap: null });
    }
  },
  setMindMap: (mindmap: string) => set({ mindmap }),
}));