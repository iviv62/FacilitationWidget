import { NextResponse } from 'next/server';

// Types for our API response
export interface FacilitationData {
  mood: 'negative' | 'neutral' | 'positive';
  iconData: {
    mood: {
      value: number;
      say: string;
      do: string;
    };
    relevancy: {
      value: number;
      say: string;
      do: string;
    };
    elaborateness: {
      value: number;
      say: string;
      do: string;
    };
    blindspot: {
      value: number;
      say: string;
      do: string;
    };
    uniqueIdeas: {
      value: number;
      say: string;
      do: string;
    };
    participation?: {
      value: number;
      say: string;
      do: string;
    };
  };
}

// Mock data - in a real app, this might come from a database
const facilitationData: FacilitationData = {
  mood: 'neutral',
  iconData: {
    mood: {
      value: 5,
      say: "I sense we might need a fresh perspective. Let's take a minute for a quick energy boost - think about why this project mattered to you initially. What's one small but meaningful improvement that would make you personally excited about the outcome we're working toward?",
      do: "X"
    },
    relevancy: {
      value: 6,
      say: "Let's check if we're on track. How does what we're discussing right now directly connect to our main objective? Is there anything we should adjust to ensure we're focusing on what matters most?",
      do: "Refer back to the project's core objectives document."
    },
    elaborateness: {
      value: 4,
      say: "I think we could benefit from more detail here. Could you elaborate on that idea? What specific steps would be involved, and what resources might we need?",
      do: "Use the whiteboard to visually map out the details."
    },
    blindspot: {
      value: 7,
      say: "I wonder if we might be missing something. What perspectives or constraints haven't we considered yet? Who else might have valuable input on this topic?",
      do: "Ask each person to write down one concern that hasn't been addressed yet."
    },
    uniqueIdeas: {
      value: 3,
      say: "Let's try to generate some fresh ideas. What if we approached this from a completely different angle? What would someone from a totally different field suggest?",
      do: "Try a rapid ideation exercise: 5 ideas in 3 minutes."
    },
    participation: {
      value: 4,
      say: "I notice that some team members haven't shared their thoughts yet. Let's take a moment to hear from everyone. What thoughts or ideas would those who haven't spoken yet like to contribute?",
      do: "Try a round-robin approach where each person shares one thought. Note who hasn't contributed much."
    }
  }
};

export async function GET() {
  // Simulate a slight delay as if we're fetching from a database
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return NextResponse.json(facilitationData);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Get the new mood from the request
  const newMood = body.mood || facilitationData.mood;
  
  // Update the mood value based on the new mood
  let moodValue = 5; // Default neutral value
  if (newMood === 'negative') {
    moodValue = 2;
  } else if (newMood === 'positive') {
    moodValue = 8;
  }
  
  // In a real app, you'd update data in a database
  // For now, we'll just return the updated data
  const updatedData = { 
    ...facilitationData,
    mood: newMood,
    iconData: {
      ...facilitationData.iconData,
      mood: {
        ...facilitationData.iconData.mood,
        value: moodValue
      }
    }
  };
  
  return NextResponse.json(updatedData);
} 