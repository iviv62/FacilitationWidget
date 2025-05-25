import { create } from 'zustand';
import axios from 'axios';

// Import the type from our API
import type { FacilitationData } from '@/app/api/facilitation/route';

interface FacilitationStore {
  data: FacilitationData | null;
  loading: boolean;
  error: string | null;
  activeIcon: 'mood' | 'relevancy' | 'elaborateness' | 'blindspot' | 'uniqueIdeas';
  fetchData: () => Promise<void>;
  setActiveIcon: (icon: 'mood' | 'relevancy' | 'elaborateness' | 'blindspot' | 'uniqueIdeas') => void;
  cycleMood: () => void;
}

export const useFacilitationStore = create<FacilitationStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  activeIcon: 'mood',
  
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/facilitation');
      set({ data: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching facilitation data:', error);
      set({ error: 'Failed to fetch data', loading: false });
    }
  },
  
  setActiveIcon: (icon) => {
    set({ activeIcon: icon });
  },
  
  cycleMood: () => {
    const { data } = get();
    if (!data) return;
    
    let newMood: 'negative' | 'neutral' | 'positive';
    let newMoodValue: number;
    
    if (data.mood === 'negative') {
      newMood = 'neutral';
      newMoodValue = 5;
    } else if (data.mood === 'neutral') {
      newMood = 'positive';
      newMoodValue = 8;
    } else {
      newMood = 'negative';
      newMoodValue = 2;
    }
    
    // Update state locally without making an API request
    set({
      data: {
        ...data,
        mood: newMood,
        iconData: {
          ...data.iconData,
          mood: {
            ...data.iconData.mood,
            value: newMoodValue
          }
        }
      }
    });
  }
})); 