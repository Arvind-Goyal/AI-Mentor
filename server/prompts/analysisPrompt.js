export const getAnalysisPrompt = (problem, language) => `
You are an expert DSA mentor.

Analyze the following LeetCode problem.

Programming Language: ${language}

Problem:
${problem}

Return ONLY valid JSON.

Schema:

{
  "mentor": {
    "goal": "",
    "estimatedTime": "",
    "confidence": 0,
    "motivation": ""
  },

  "analysis": {
    "difficulty": "",
    "summary": "",
    "concepts": [],
    "companies": []
  },

  "hint1": {
    "text": ""
  },

  "hint2": {
    "text": ""
  },

  "hint3": {
    "text": ""
  },

  "algorithm": {
    "steps": []
  },

  "pseudocode": {
    "code": ""
  },

  "review": {
    "strengths": [],
    "improvements": []
  },

  "optimized": {
    "complexity": {
      "time": "",
      "space": ""
    },
    "code": ""
  }
}

Return JSON only.
`;