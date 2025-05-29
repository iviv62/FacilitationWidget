import { FaFrown, FaMeh, FaSmile } from 'react-icons/fa';
import { FacilitationData } from '@/store/useFacilitationStore';

export const getMoodIcon = (mood?: 'negative' | 'neutral' | 'positive') => {
  switch (mood) {
    case 'negative':
      return <FaFrown size={28} className="text-white" />;
    case 'neutral':
      return <FaMeh size={28} className="text-white" />;
    case 'positive':
      return <FaSmile size={28} className="text-white" />;
    default:
      return <FaMeh size={28} className="text-white" />;
  }
};

export const getIconColorByValue = (value: number) => {
  if (value <= 3) {
    return "bg-red-500";
  } else if (value <= 7) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
};

export const getIconTooltip = (icon: string): string => {
  switch (icon) {
    case 'mood':
      return "Mood indicator";
    case 'relevancy':
      return "Relevancy of current ideas to brainstorming question";
    case 'elaborateness':
      return "Level of detail and development in ideas";
    default:
      return "";
  }
};

export const getFacilitationContent = (
  data: FacilitationData | null,
  activeIcon: 'mood' | 'relevancy' | 'elaborateness' | 'blindspot' | 'uniqueIdeas'
): string => {
  if (!data) return "Working on the analysis or not enough data gathered yet.";
  switch (activeIcon) {
    case 'mood':
      return data.iconData.mood.facilitation;
    case 'relevancy':
      return data.iconData.relevancy.facilitation;
    case 'elaborateness':
      return data.iconData.elaborateness.facilitation;
    default:
      return data.iconData.mood.facilitation;
  }
};

export const getActionContent = (
  data: FacilitationData | null,
  activeIcon: 'mood' | 'relevancy' | 'elaborateness' | 'blindspot' | 'uniqueIdeas'
): string => {
  if (!data) return "Working on the analysis or not enough data gathered yet.";
  switch (activeIcon) {
    case 'mood':
      return data.iconData.mood.action;
    case 'relevancy':
      return data.iconData.relevancy.action;
    case 'elaborateness':
      return data.iconData.elaborateness.action;
    default:
      return data.iconData.mood.action;
  }
};

export const getIconBgColor = (
  data: FacilitationData | null,
  icon: 'mood' | 'relevancy' | 'elaborateness' | 'blindspot' | 'uniqueIdeas'
) => {
  if (!data) return "bg-gray-300";
  const value = data.iconData?.[icon]?.value ?? 5;
  return getIconColorByValue(value);
};