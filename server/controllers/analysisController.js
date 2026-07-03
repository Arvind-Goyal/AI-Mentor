import { analyzeWithGemini } from "../services/geminiService.js";

export const analyzeProblem = async (req, res) => {

    try {

        const { problem, language } = req.body;

        if (!problem) {
            return res.status(400).json({
                success: false,
                message: "Problem statement is required."
            });
        }

        // const analysis = await analyzeWithGemini(problem, language);
        const analysis =  {
  "mentor": {
    "goal": "Understand and implement efficient solutions for finding pairs in an array, focusing on hash maps for O(n) time complexity.",
    "estimatedTime": "25 minutes",
    "confidence": 100,
    "motivation": "This is a foundational problem for many interview questions involving finding relationships between elements in a collection. Mastering it will unlock your ability to solve more complex problems efficiently.",
    "advice": {
      "title": "Think about the 'complement'!",
      "description": "When looking for a pair that sums to a target, consider what the 'missing' number (the complement) would be if you found one number. This often leads to efficient lookups."
    },
    "status": {
      "state": "Not Started",
      "difficulty": "Easy",
      "estimatedTime": "20 minutes",
      "progress": 0
    },
    "mistakes": [
      "Using nested loops, leading to an O(n^2) time complexity.",
      "Not handling duplicate numbers correctly or efficiently.",
      "Forgetting to return the correct indices or values as required by the problem statement."
    ]
  },
  "analysis": {
    "difficulty": "Easy",
    "summary": "The problem asks you to find two numbers in a given array that add up to a specific target value. You need to return the indices of these two numbers. Assume there is exactly one solution, and you cannot use the same element twice.",
    "concepts": [
      "Arrays",
      "Hash Tables (HashMap)"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Meta",
      "Apple"
    ]
  },
  "hint1": {
    "text": "How can you quickly check if a required number exists in the array?"
  },
  "hint2": {
    "text": "A hash map (or dictionary) is an excellent data structure for fast lookups. Consider storing elements and their indices as you iterate through the array."
  },
  "hint3": {
    "text": "For each number `nums[i]`, calculate the `complement` needed to reach the `target` (i.e., `target - nums[i]`). Then, check if this `complement` already exists in your hash map. If it does, you've found your pair!"
  },
  "algorithm": {
    "steps": [
      "Initialize an empty hash map to store numbers and their indices.",
      "Iterate through the input array `nums` from index 0 to `n-1`.",
      "For each element `nums[i]`, calculate the `complement` needed: `complement = target - nums[i]`.",
      "Check if the `complement` already exists as a key in the hash map.",
      "If the `complement` exists in the hash map, return an array containing the index stored for the `complement` and the current index `i`.",
      "If the `complement` does not exist, add the current number `nums[i]` as a key and its index `i` as the value to the hash map.",
      "If the loop finishes without finding a pair (which shouldn't happen based on problem constraints), return an empty or default indicator (e.g., `[-1, -1]`)."
    ]
  },
  "pseudocode": {
    "code": "function twoSum(nums, target):\n  map = new HashMap()\n  for i from 0 to length(nums) - 1:\n    current_num = nums[i]\n    complement = target - current_num\n    if complement is in map:\n      return [map.get(complement), i]\n    else:\n      map.put(current_num, i)\n  return [-1, -1] // Should not reach here if a solution exists"
  },
  "review": {
    "strengths": [
      "This problem is a classic introduction to using hash maps for efficient lookups, a technique crucial for many array-manipulation problems.",
      "It reinforces the concept of trading space for time, as the hash map uses extra memory to achieve faster execution.",
      "Understanding this problem helps in grasping how to quickly find pairs or complements within a dataset."
    ],
    "improvements": [
      "Students often initially jump to a brute-force nested loop solution, which is inefficient (O(n^2)).",
      "Carelessness in handling the map: adding the current element *before* checking for the complement can lead to using the same element twice if `target = 2 * nums[i]`.",
      "Forgetting to store the *index* in the map, instead just storing a boolean or the number itself, which prevents returning the correct output."
    ]
  },
  "optimized": {
    "complexity": {
      "time": "O(n)",
      "space": "O(n)"
    },
    "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> numMap = new HashMap<>();\n        \n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (numMap.containsKey(complement)) {\n                return new int[] { numMap.get(complement), i };\n            }\n            numMap.put(nums[i], i);\n        }\n        \n        // According to the problem statement, there is exactly one solution.\n        // This line should theoretically never be reached.\n        throw new IllegalArgumentException(\"No two sum solution\"); \n    }\n}"
  }
}
    return res.status(200).json({
        success: true,
        data: analysis
    });
    

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};