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
      const analysis = {
  "template": {
    "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}",
    "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};",
    "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Your code here",
    "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Your code here\n};"
  },
  "mentor": {
    "goal": "The goal is to find two numbers in an array that add up to a specific target value and return their indices.",
    "estimatedTime": "15 minutes",
    "confidence": 100,
    "motivation": "This is a classic interview problem that tests your understanding of basic array manipulation and data structures. Mastering this will build a strong foundation for more complex problems. Think about how you can efficiently check for the existence of a complementary number.",
    "advice": {
      "title": "Think about the 'complement'",
      "description": "For each number you encounter, think about what the *other* number would need to be to reach the target. If you can quickly check if you've *already seen* that 'complementary' number, you can solve this efficiently."
    },
    "status": {
      "state": "Not Started",
      "difficulty": "Easy",
      "estimatedTime": "15 minutes",
      "progress": 0
    },
    "mistakes": [
      "Brute-forcing with nested loops without considering optimization.",
      "Not handling the case where the same element cannot be used twice.",
      "Returning the values instead of the indices.",
      "Forgetting to store the index along with the value when using a hash map."
    ]
  },
  "analysis": {
    "difficulty": "Easy",
    "summary": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. The order of returned indices does not matter.",
    "concepts": [
      "Hash Maps",
      "Arrays"
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
    "text": "If you iterate through the array, for each number, what other number would you need to find to reach the target?"
  },
  "hint2": {
    "text": "Consider using a data structure that allows for quick lookups. If you need to find if a specific number exists, what data structure comes to mind?"
  },
  "hint3": {
    "text": "As you iterate through the array, store the numbers you've seen so far along with their indices. For each current number, calculate the 'complement' (target - current number). Then, check if this complement already exists in your storage. If it does, you've found your pair!"
  },
  "algorithm": {
    "steps": [
      "Initialize an empty hash map (e.g., `HashMap<Integer, Integer>`) to store numbers and their indices.",
      "Iterate through the input array `nums` from index 0 to `nums.length - 1`.",
      "For each element `nums[i]`, calculate the `complement` needed: `complement = target - nums[i]`.",
      "Check if the `complement` already exists as a key in the hash map.",
      "If the `complement` exists in the hash map, it means we've found the two numbers. Return an array containing the index of the complement (retrieved from the map) and the current index `i`.",
      "If the `complement` does not exist, add the current number `nums[i]` as a key and its index `i` as the value to the hash map.",
      "If the loop finishes without finding a pair (which shouldn't happen based on the problem constraints), return an appropriate indicator (e.g., an empty array or throw an exception, though the problem guarantees a solution)."
    ]
  },
  "pseudocode": {
    "code": "function twoSum(nums, target):\n  map = new HashMap()\n  for i from 0 to length(nums) - 1:\n    current_num = nums[i]\n    complement = target - current_num\n    if complement is in map:\n      return [map.get(complement), i]\n    else:\n      map.put(current_num, i)\n  // Should not reach here based on problem constraints\n  return []"
  },
  "review": {
    "strengths": [
      "This problem is fundamental for understanding how hash maps can drastically improve the time complexity of search operations.",
      "It's a common warm-up question in interviews, helping to gauge basic problem-solving and coding skills.",
      "It introduces the concept of looking for a 'complement' rather than exhaustively checking all pairs."
    ],
    "improvements": [
      "Students often jump directly to a brute-force O(n^2) solution using nested loops. Encourage them to think about optimizing the search for the second number.",
      "Careless implementation of the hash map can lead to bugs, such as storing the value instead of the index, or failing to handle duplicates correctly (though not an issue in this specific problem due to the 'exactly one solution' constraint and not using the same element twice).",
      "Forgetting that the function must return indices, not the numbers themselves."
    ]
  },
  "optimized": {
    "complexity": {
      "time": "O(n)",
      "space": "O(n)"
    },
    "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> numMap = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (numMap.containsKey(complement)) {\n                return new int[] { numMap.get(complement), i };\n            }\n            numMap.put(nums[i], i);\n        }\n        // This line should technically not be reached given the problem constraints\n        // but is required for the compiler to not complain about a missing return statement.\n        throw new IllegalArgumentException(\"No two sum solution found\");\n    }\n}"
  }
}
//         const analysis = {
//   "template": {
//     "java": "class Solution {\n    public int[] pathsWithMaxScore(List<String> board) {\n        // TODO: Implement solution\n        return new int[]{0, 0};\n    }\n}",
//     "cpp": "class Solution {\npublic:\n    vector<int> pathsWithMaxScore(vector<string>& board) {\n        // TODO: Implement solution\n        return {0, 0};\n    }\n};",
//     "python": "class Solution:\n    def pathsWithMaxScore(self, board: List[str]) -> List[int]:\n        # TODO: Implement solution\n        return [0, 0]",
//     "javascript": "/**\n * @param {string[]} board\n * @return {number[]}\n */\nvar pathsWithMaxScore = function(board) {\n    // TODO: Implement solution\n    return [0, 0];\n};"
//   },
//   "mentor": {
//     "goal": "Solve the 'Number of Paths with Max Score' problem by identifying the optimal path and counting the number of ways to achieve it.",
//     "estimatedTime": "30-45 minutes",
//     "confidence": 100,
//     "motivation": "This problem is a great exercise in dynamic programming and graph traversal. It tests your ability to handle multiple states and constraints simultaneously. Mastering this type of problem will significantly boost your confidence in tackling complex DP challenges.",
//     "advice": {
//       "title": "Handling Modulo Arithmetic",
//       "description": "Remember to apply the modulo operation at each addition step to prevent integer overflow, especially when calculating the number of paths. This is a common pitfall in DP problems involving large counts."
//     },
//     "status": {
//       "state": "Not Started",
//       "difficulty": "Medium",
//       "estimatedTime": "30-45 minutes",
//       "progress": 0
//     },
//     "mistakes": [
//       "Forgetting to handle the 'X' cells as impassable.",
//       "Incorrectly initializing the DP table, especially for the start and end cells.",
//       "Not applying the modulo operator at each addition, leading to integer overflow.",
//       "Failing to consider all three possible moves (up, left, diagonal up-left) when calculating the maximum score and path count.",
//       "Incorrectly handling boundary conditions and the start/end point of the board."
//     ]
//   },
//   "analysis": {
//     "difficulty": "Medium",
//     "summary": "The problem asks us to find the maximum score achievable by traversing a grid from the bottom-right 'S' to the top-left 'E', collecting points along the way. We can only move up, left, or diagonally up-left. Some cells are blocked ('X'). We also need to count the number of distinct paths that achieve this maximum score. The score is the sum of numbers on visited cells, excluding 'S' and 'E'. The result should be modulo 10^9 + 7.",
//     "concepts": [
//       "Dynamic Programming",
//       "Grid Traversal",
//       "Memoization",
//       "Modulo Arithmetic"
//     ],
//     "companies": [
//       "Meta",
//       "Google",
//       "Amazon"
//     ]
//   },
//   "hint1": {
//     "text": "Consider how you would find *any* path from the end to the start. What kind of traversal strategy might work, and how could you adapt it to find the *best* path?"
//   },
//   "hint2": {
//     "text": "This problem can be solved using dynamic programming. Think about defining a state that represents the maximum score and the number of paths to reach a particular cell. Since you're moving backwards from the 'E' to 'S', the transitions will involve looking at cells that can reach the current cell."
//   },
//   "hint3": {
//     "text": "When calculating the maximum score for a cell `(r, c)`, you need to consider the maximum scores from the cells that can move to `(r, c)`: `(r+1, c)`, `(r, c+1)`, and `(r+1, c+1)`.  The number of paths to `(r, c)` will be the sum of the number of paths from these preceding cells that yield the maximum score. Remember to handle blocked cells and apply modulo arithmetic."
//   },
//   "algorithm": {
//     "steps": [
//       "Initialize a 2D DP table `dp` of size `N x N` (where N is the board size), storing pairs of {max_score, num_paths}.",
//       "Initialize `dp[N-1][N-1]` to `{0, 1}` if the start cell is not 'X', otherwise `{0, 0}`. The end cell is at `(N-1, N-1)` for backward DP.",
//       "Iterate through the grid backwards, from `(N-1, N-1)` to `(0, 0)`. For each cell `(r, c)`:",
//       "If `board[r][c]` is 'X', set `dp[r][c]` to `{-1, 0}` (or some indicator of impossibility).",
//       "Otherwise, consider the cells that can reach `(r, c)`: `(r+1, c)`, `(r, c+1)`, and `(r+1, c+1)` (if they are within bounds and not 'X').",
//       "Find the maximum score among these reachable preceding cells. Let this be `max_prev_score`.",
//       "If `max_prev_score` is -1 (meaning no valid path from preceding cells), set `dp[r][c]` to `{-1, 0}`.",
//       "Otherwise, calculate the current cell's score. If `board[r][c]` is 'E', its score is 0. Otherwise, it's `board[r][c] - '0'`.",
//       "The maximum score for `dp[r][c]` is `current_score + max_prev_score`.",
//       "The number of paths for `dp[r][c]` is the sum of the number of paths from preceding cells that achieved `max_prev_score`, all taken modulo `10^9 + 7`.",
//       "If `dp[0][0].max_score` is -1, return `{0, 0}`. Otherwise, return `{dp[0][0].max_score, dp[0][0].num_paths}`."
//     ]
//   },
//   "pseudocode": {
//     "code": "function pathsWithMaxScore(board):\n    N = board.length\n    MOD = 10^9 + 7\n\n    // dp[r][c] stores {max_score, num_paths} to reach (r, c)\n    // Initialize with impossible values\n    dp = array of size N x N, each element is { -1, 0 }\n\n    // Base case: starting from the end 'S'\n    if board[N-1][N-1] != 'X':\n        dp[N-1][N-1] = { 0, 1 }\n\n    // Iterate backwards from end to start\n    for r from N-1 down to 0:\n        for c from N-1 down to 0:\n            // If current cell is 'X' or impossible to reach, skip\n            if board[r][c] == 'X' or dp[r][c].max_score == -1:\n                continue\n\n            // Define possible moves from current cell towards start\n            // (These are cells that can reach (r, c) in reverse)\n            moves = [(r-1, c), (r, c-1), (r-1, c-1)]\n\n            for next_r, next_c in moves:\n                // Check bounds and if next cell is reachable\n                if 0 <= next_r < N and 0 <= next_c < N and board[next_r][next_c] != 'X':\n                    // Calculate potential score and paths\n                    score_val = 0\n                    if board[next_r][next_c] != 'E':\n                        score_val = int(board[next_r][next_c])\n\n                    new_score = dp[r][c].max_score + score_val\n\n                    // If we found a better score\n                    if new_score > dp[next_r][next_c].max_score:\n                        dp[next_r][next_c].max_score = new_score\n                        dp[next_r][next_c].num_paths = dp[r][c].num_paths\n                    // If we found an equal score, add paths\n                    else if new_score == dp[next_r][next_c].max_score:\n                        dp[next_r][next_c].num_paths = (dp[next_r][next_c].num_paths + dp[r][c].num_paths) % MOD\n\n    // Result is at the start cell 'E'\n    if dp[0][0].max_score == -1:\n        return [0, 0]\n    else:\n        return [dp[0][0].max_score, dp[0][0].num_paths]\n"
//   },
//   "review": {
//     "strengths": [
//       "Reinforces understanding of dynamic programming on grids.",
//       "Practices handling multiple states (score and count) in DP.",
//       "Crucial for learning modulo arithmetic in counting problems.",
//       "Tests careful backward reasoning in DP transitions."
//     ],
//     "improvements": [
//       "Pay close attention to the direction of traversal. Since we want to reach 'E' from 'S', but the DP typically builds from a base case, it's often easier to think about reaching 'S' from 'E' (backward DP) or to fill the DP table from 'S' towards 'E' if modifying the problem slightly.",
//       "Ensure the DP state correctly captures both the maximum score and the count of paths achieving that score.",
//       "Double-check boundary conditions and the handling of blocked cells ('X')."
//     ]
//   },
//   "optimized": {
//     "complexity": {
//       "time": "O(N^2)",
//       "space": "O(N^2)"
//     },
//     "code": "class Solution {\n    public int[] pathsWithMaxScore(List<String> board) {\n        int n = board.size();\n        int MOD = 1_000_000_007;\n\n        // dp[r][c][0] stores max score, dp[r][c][1] stores number of paths\n        int[][][] dp = new int[n][n][2];\n\n        // Initialize dp table with -1 to indicate unreachable or invalid cells\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                dp[i][j][0] = -1;\n                dp[i][j][1] = 0;\n            }\n        }\n\n        // Base case: The starting cell 'E' (bottom-right for backward DP)\n        // Its score is 0, and there's 1 way to reach it (from itself).\n        // We treat the input board as if 'S' is at (0,0) and 'E' is at (n-1,n-1) for easier DP indexing\n        // So, we actually start DP from board[n-1][n-1] which is 'E' in problem statement.\n        if (board.get(n - 1).charAt(n - 1) != 'X') {\n            dp[n - 1][n - 1][0] = 0;\n            dp[n - 1][n - 1][1] = 1;\n        }\n\n        // Iterate backwards from the bottom-right corner towards the top-left\n        for (int r = n - 1; r >= 0; r--) {\n            for (int c = n - 1; c >= 0; c--) {\n                // If the current cell is blocked or unreachable, skip it\n                if (board.get(r).charAt(c) == 'X' || dp[r][c][0] == -1) {\n                    continue;\n                }\n\n                // Define the possible preceding cells that can reach (r, c)\n                // These are (r-1, c), (r, c-1), and (r-1, c-1) for standard DP from top-left.\n                // Since we are iterating backwards, we look at neighbors that could lead TO (r,c) FROM a cell WE HAVE ALREADY PROCESSED.\n                // So, we look at neighbors of (r,c) that are 'down' or 'right' from them.\n                // For cell (r,c), we want to update the cells that can move TO it: (r+1,c), (r,c+1), (r+1,c+1).\n                // This means our transitions should update UPCOMING cells.\n                \n                // The standard problem is to go from (0,0) to (n-1,n-1).\n                // For DP, it's easier to think of reaching a cell (r,c) from its neighbors.\n                // If we fill dp from (n-1,n-1) backwards to (0,0):\n                // dp[r][c] is the max score and paths to reach (r,c) STARTING FROM (n-1,n-1).\n                // The moves to consider to reach (r,c) from a processed cell are:\n                // From (r+1, c), (r, c+1), (r+1, c+1)\n\n                // Let's use moves FROM the current cell (r,c) TO its neighbors which are CLOSER to 'E'.\n                // So, from (r,c), we can move to (r-1,c), (r,c-1), (r-1,c-1).\n                // We update dp[next_r][next_c] based on dp[r][c].\n                \n                int[] dr = {-1, 0, -1};\n                int[] dc = {0, -1, -1};\n\n                for (int i = 0; i < 3; i++) {\n                    int nr = r + dr[i];\n                    int nc = c + dc[i];\n\n                    // Check if the next cell is within bounds and not blocked\n                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && board.get(nr).charAt(nc) != 'X') {\n                        int currentCellScore = 0;\n                        // 'E' cell is at (0,0) when coming from (n-1,n-1) backwards. Its value is not added.\n                        // The problem states: 'The score is the sum of numbers on visited cells, excluding 'S' and 'E'.' \n                        // If we are iterating backwards, 'S' is at (n-1,n-1) and 'E' is at (0,0).\n                        // So we add score if it's not 'E'.\n                        if (board.get(nr).charAt(nc) != 'E') {\n                             currentCellScore = board.get(nr).charAt(nc) - '0';\n                        }\n\n                        int newScore = dp[r][c][0] + currentCellScore;\n\n                        // If we found a path with a higher score\n                        if (newScore > dp[nr][nc][0]) {\n                            dp[nr][nc][0] = newScore;\n                            dp[nr][nc][1] = dp[r][c][1]; // Reset path count to the paths of the better score source\n                        } \n                        // If we found a path with an equal score\n                        else if (newScore == dp[nr][nc][0]) {\n                            dp[nr][nc][1] = (dp[nr][nc][1] + dp[r][c][1]) % MOD;\n                        }\n                    }\n                }\n            }\n        }\n\n        // The result is at the 'S' cell (0,0) in our backward DP context\n        if (dp[0][0][0] == -1) {\n            return new int[]{0, 0};\n        } else {\n            return new int[]{dp[0][0][0], dp[0][0][1]};\n        }\n    }\n}"
//   }
// }

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


