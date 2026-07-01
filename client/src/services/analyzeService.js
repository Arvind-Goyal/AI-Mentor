// services/analysisService.js

const analyzeProblem = async (problem, language) => {

    await new Promise((resolve) => setTimeout(resolve, 2500));

    return {
        
  overview: {
    difficulty: "Medium",

    patterns: [
        "HashMap",
        "Two Pointer",
    ],

    timeComplexity: "O(n)",

    spaceComplexity: "O(1)"
},

learning: {
    topics: [
        "Array",
        "HashMap"
    ],

    prerequisites: [
        "Arrays",
        "HashMap Basics"
    ]
},

  mentor: {
    status: {
        state: "Not Started",
        estimatedTime: "25 mins",
        difficulty: "Medium",
        progress: 0
    },

    mistakes: [
        "Don't jump into coding immediately.",
        "Think about edge cases.",
        "Avoid unnecessary nested loops."
    ],

    advice: {
        title: "Think Before You Code",
        description:
            "Read the constraints carefully and identify the optimal data structure before writing any code."
    }
},

  journey: {
    currentStep: 2
},
  hints: [
    {
      level: 1,
      title: "Observe the Input",
      content: "Think about what information you need while scanning the array once."
    },
    {
      level: 2,
      title: "Store Previous Values",
      content: "Can you remember numbers you've already visited efficiently?"
    },
    {
      level: 3,
      title: "Use a HashMap",
      content: "Store each value with its index and look for the complement before inserting."
    }
  ],

  solutions: {

    bruteForce: {
      approach:
        "Check every possible pair of numbers and return the pair whose sum equals the target.",

      algorithm: [
        "Iterate i from 0 to n-1",
        "Iterate j from i+1 to n-1",
        "If nums[i] + nums[j] == target return indices"
      ],

      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)"
    },

    optimized: {
      approach:
        "Traverse the array once while storing visited numbers inside a HashMap.",

      algorithm: [
        "Compute complement = target - nums[i]",
        "Check whether complement exists in HashMap",
        "Return indices if found",
        "Otherwise insert current value"
      ],

      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    }
  },

  review: {
    score: 0,
    mistakes: [],
    suggestions: [],
    optimized: false
  },

  quiz: [
    {
      question:
        "Why is a HashMap used in the optimal solution?",

      options: [
        "To sort the array",
        "To perform constant-time lookups",
        "To reduce memory usage",
        "To avoid loops"
      ],

      answer: 1,

      explanation:
        "HashMaps provide average O(1) lookup time, allowing complements to be found efficiently."
    }
  ],

  resources: {

    articles: [
      {
        title: "HashMap Fundamentals",
        url: ""
      }
    ],

    videos: [
      {
        title: "Two Sum Explained",
        url: ""
      }
    ],

    relatedProblems: [
      "Contains Duplicate",
      "3Sum",
      "Two Sum II"
    ]
  }
}
    };



export default analyzeProblem;