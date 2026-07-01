import {
    FaSearch,
    FaLightbulb,
    FaCode,
    FaClipboardList,
    FaRobot,
    FaTrophy
} from "react-icons/fa";

export const JOURNEY_STEPS = [
   {
    id: 1,
    title: "Problem Analysis",
    description:
      "Understand the problem statement and constraints.",
    icon: FaSearch,
  },

  {
    id: 2,
    title: "Hint 1",
    description:
      "Think about whether an additional data structure can help.",
    icon: FaLightbulb,
  },
    {
        id: 3,
        title: "Hint 2",
        description:
      "Koi na ho jayega",
        icon: FaLightbulb,
    },
    {
        id: 4,
        title: "Algorithm",
        icon: FaCode,
    },
    {
        id: 5,
        title: "Pseudocode",
        icon: FaClipboardList,
    },
    {
        id: 6,
        title: "AI Review",
        icon: FaRobot,
    },
    {
        id: 7,
        title: "Optimized Solution",
        icon: FaTrophy,
    }
];