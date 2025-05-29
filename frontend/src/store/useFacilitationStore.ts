import { create } from 'zustand';

interface FacilitationStore {
  data: FacilitationData | null;
  loading: boolean;
  error: string | null;
  activeIcon: 'mood' | 'relevancy' | 'elaborateness' ;
  setActiveIcon: (icon: 'mood' | 'relevancy' | 'elaborateness' ) => void;
  connectWebSocket: () => void;
}

export interface FacilitationData {
  iconData: {
    mood: { 
      value: number; 
      mood: 'negative' | 'neutral' | 'positive';
      keyIndicators: string[];
      facilitation: string;
      action: string;
      iceBreakerJoke: string | null;
    };
    relevancy: { 
      value: number; 
      facilitation: string;
      action: string;
    };
    elaborateness: { 
      value: number; 
      facilitation: string;
      action: string;
    };
  };

}

let ws: WebSocket | null = null; // Use native WebSocket

export const useFacilitationStore = create<FacilitationStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  activeIcon: 'mood',
  
  setActiveIcon: (icon) => {
    set({ activeIcon: icon });
  },

  connectWebSocket: () => {
    if (ws) return; // Prevent multiple connections
    ws = new WebSocket('ws://127.0.0.4:8008/api/v1/insights/ws/sentiment_insight');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        console.log('WebSocket message received:', event.data);
        const msg = JSON.parse(event.data);

        // Transform the incoming message to match FacilitationData structure
        const newData: FacilitationData = {
          iconData: {
            mood: { 
              value: msg.primary_sentiment_score ?? 5, 
              mood: msg.primary_sentiment_score >= 7 ? 'positive' : msg.primary_sentiment_score >= 4 ? 'neutral' : 'negative',
              keyIndicators: msg.key_indicators,
              facilitation: msg.impact_assessment,
              action: msg.facilitator_action,
              iceBreakerJoke: msg.ice_breaker_joke,
            },
            relevancy: { 
              value: 5, 
              facilitation: msg.relevancy_do ?? 'Default relevancy do',
              action: msg.relevancy_say ?? 'Default relevancy say' 
            },
            elaborateness: { 
              value: 5, 
              facilitation: msg.elaborateness_do ?? 'Default elaborateness do',
              action: msg.elaborateness_say ?? 'Default elaborateness say' 
            }
          },
        };

        set({ data: newData });
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      ws = null;
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  }
}));