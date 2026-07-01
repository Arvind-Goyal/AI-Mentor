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
        id: "analysis",
        title: "Problem Analysis",
        icon: FaSearch,
        description: "Understand the problem statement, constraints and edge cases."
    },
    {
        id: "hint1",
        title: "Hint 1",
        icon: FaLightbulb,
        description: "A gentle nudge in the right direction."
    },
    {
        id: "hint2",
        title: "Hint 2",
        icon: FaLightbulb,
        description: "A more detailed hint."
    },
    {
    id: "hint3",
    title: "Hint 3",
    icon: FaLightbulb,
},
    {
        id: "algorithm",
        title: "Algorithm",
        icon: FaCode,
        description: "High-level algorithm explanation."
    },
    {
        id: "pseudocode",
        title: "Pseudocode",
        icon: FaClipboardList,
        description: "Step-by-step implementation logic."
    },
    {
        id: "review",
        title: "AI Review",
        icon: FaRobot,
        description: "Review your submitted solution."
    },
    {
        id: "optimized",
        title: "Optimized Solution",
        icon: FaTrophy,
        description: "Best possible solution with explanation."
    }
];

export const dummyAnalysis = {
    analysis: {
        difficulty: "Medium",
        concepts: ["Hash Map", "Sliding Window"],
        summary: "Find the longest substring without repeating characters."
    },

    hint1: {
        text: "Try using a HashMap."
    },

    hint2: {
        text: "Move the left pointer when duplicate occurs."
    },
    hint3: {
    text: "Maintain a HashMap<Character, Integer>. If the current character already exists in the current window, update the left pointer to Math.max(left, map.get(ch) + 1)."
},

    algorithm: {
        steps: [
            "Initialize pointers",
            "Expand right",
            "Shrink left"
        ]
    },

    pseudocode: {
        code: "..."
    },

    review: {
        strengths: ["Correct logic"],
        improvements: ["Better variable names"]
    },

    optimized: {
        complexity: "O(n)",
        code: "..."
    }
};