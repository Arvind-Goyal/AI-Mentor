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
    "java": "class Solution {\n    public int[] pathsWithMaxScore(List<String> board) {\n        // TODO: Implement solution\n        return new int[]{0, 0};\n    }\n}",
    "cpp": "class Solution {\npublic:\n    vector<int> pathsWithMaxScore(vector<string>& board) {\n        // TODO: Implement solution\n        return {0, 0};\n    }\n};",
    "python": "class Solution:\n    def pathsWithMaxScore(self, board: List[str]) -> List[int]:\n        # TODO: Implement solution\n        return [0, 0]",
    "javascript": "/**\n * @param {string[]} board\n * @return {number[]}\n */\nvar pathsWithMaxScore = function(board) {\n    // TODO: Implement solution\n    return [0, 0];\n};"
  },
  "mentor": {
    "goal": "Solve the 'Number of Paths with Max Score' problem by identifying the optimal path and counting the number of ways to achieve it.",
    "estimatedTime": "30-45 minutes",
    "confidence": 100,
    "motivation": "This problem is a great exercise in dynamic programming and graph traversal. It tests your ability to handle multiple states and constraints simultaneously. Mastering this type of problem will significantly boost your confidence in tackling complex DP challenges.",
    "advice": {
      "title": "Handling Modulo Arithmetic",
      "description": "Remember to apply the modulo operation at each addition step to prevent integer overflow, especially when calculating the number of paths. This is a common pitfall in DP problems involving large counts."
    },
    "status": {
      "state": "Not Started",
      "difficulty": "Medium",
      "estimatedTime": "30-45 minutes",
      "progress": 0
    },
    "mistakes": [
      "Forgetting to handle the 'X' cells as impassable.",
      "Incorrectly initializing the DP table, especially for the start and end cells.",
      "Not applying the modulo operator at each addition, leading to integer overflow.",
      "Failing to consider all three possible moves (up, left, diagonal up-left) when calculating the maximum score and path count.",
      "Incorrectly handling boundary conditions and the start/end point of the board."
    ]
  },
  "analysis": {
    "difficulty": "Medium",
    "summary": "The problem asks us to find the maximum score achievable by traversing a grid from the bottom-right 'S' to the top-left 'E', collecting points along the way. We can only move up, left, or diagonally up-left. Some cells are blocked ('X'). We also need to count the number of distinct paths that achieve this maximum score. The score is the sum of numbers on visited cells, excluding 'S' and 'E'. The result should be modulo 10^9 + 7.",
    "concepts": [
      "Dynamic Programming",
      "Grid Traversal",
      "Memoization",
      "Modulo Arithmetic"
    ],
    "companies": [
      "Meta",
      "Google",
      "Amazon"
    ]
  },
  "hint1": {
    "text": "Consider how you would find *any* path from the end to the start. What kind of traversal strategy might work, and how could you adapt it to find the *best* path?"
  },
  "hint2": {
    "text": "This problem can be solved using dynamic programming. Think about defining a state that represents the maximum score and the number of paths to reach a particular cell. Since you're moving backwards from the 'E' to 'S', the transitions will involve looking at cells that can reach the current cell."
  },
  "hint3": {
    "text": "When calculating the maximum score for a cell `(r, c)`, you need to consider the maximum scores from the cells that can move to `(r, c)`: `(r+1, c)`, `(r, c+1)`, and `(r+1, c+1)`.  The number of paths to `(r, c)` will be the sum of the number of paths from these preceding cells that yield the maximum score. Remember to handle blocked cells and apply modulo arithmetic."
  },
  "algorithm": {
    "steps": [
      "Initialize a 2D DP table `dp` of size `N x N` (where N is the board size), storing pairs of {max_score, num_paths}.",
      "Initialize `dp[N-1][N-1]` to `{0, 1}` if the start cell is not 'X', otherwise `{0, 0}`. The end cell is at `(N-1, N-1)` for backward DP.",
      "Iterate through the grid backwards, from `(N-1, N-1)` to `(0, 0)`. For each cell `(r, c)`:",
      "If `board[r][c]` is 'X', set `dp[r][c]` to `{-1, 0}` (or some indicator of impossibility).",
      "Otherwise, consider the cells that can reach `(r, c)`: `(r+1, c)`, `(r, c+1)`, and `(r+1, c+1)` (if they are within bounds and not 'X').",
      "Find the maximum score among these reachable preceding cells. Let this be `max_prev_score`.",
      "If `max_prev_score` is -1 (meaning no valid path from preceding cells), set `dp[r][c]` to `{-1, 0}`.",
      "Otherwise, calculate the current cell's score. If `board[r][c]` is 'E', its score is 0. Otherwise, it's `board[r][c] - '0'`.",
      "The maximum score for `dp[r][c]` is `current_score + max_prev_score`.",
      "The number of paths for `dp[r][c]` is the sum of the number of paths from preceding cells that achieved `max_prev_score`, all taken modulo `10^9 + 7`.",
      "If `dp[0][0].max_score` is -1, return `{0, 0}`. Otherwise, return `{dp[0][0].max_score, dp[0][0].num_paths}`."
    ]
  },
  "pseudocode": {
    "code": "function pathsWithMaxScore(board):\n    N = board.length\n    MOD = 10^9 + 7\n\n    // dp[r][c] stores {max_score, num_paths} to reach (r, c)\n    // Initialize with impossible values\n    dp = array of size N x N, each element is { -1, 0 }\n\n    // Base case: starting from the end 'S'\n    if board[N-1][N-1] != 'X':\n        dp[N-1][N-1] = { 0, 1 }\n\n    // Iterate backwards from end to start\n    for r from N-1 down to 0:\n        for c from N-1 down to 0:\n            // If current cell is 'X' or impossible to reach, skip\n            if board[r][c] == 'X' or dp[r][c].max_score == -1:\n                continue\n\n            // Define possible moves from current cell towards start\n            // (These are cells that can reach (r, c) in reverse)\n            moves = [(r-1, c), (r, c-1), (r-1, c-1)]\n\n            for next_r, next_c in moves:\n                // Check bounds and if next cell is reachable\n                if 0 <= next_r < N and 0 <= next_c < N and board[next_r][next_c] != 'X':\n                    // Calculate potential score and paths\n                    score_val = 0\n                    if board[next_r][next_c] != 'E':\n                        score_val = int(board[next_r][next_c])\n\n                    new_score = dp[r][c].max_score + score_val\n\n                    // If we found a better score\n                    if new_score > dp[next_r][next_c].max_score:\n                        dp[next_r][next_c].max_score = new_score\n                        dp[next_r][next_c].num_paths = dp[r][c].num_paths\n                    // If we found an equal score, add paths\n                    else if new_score == dp[next_r][next_c].max_score:\n                        dp[next_r][next_c].num_paths = (dp[next_r][next_c].num_paths + dp[r][c].num_paths) % MOD\n\n    // Result is at the start cell 'E'\n    if dp[0][0].max_score == -1:\n        return [0, 0]\n    else:\n        return [dp[0][0].max_score, dp[0][0].num_paths]\n"
  },
  "review": {
    "strengths": [
      "Reinforces understanding of dynamic programming on grids.",
      "Practices handling multiple states (score and count) in DP.",
      "Crucial for learning modulo arithmetic in counting problems.",
      "Tests careful backward reasoning in DP transitions."
    ],
    "improvements": [
      "Pay close attention to the direction of traversal. Since we want to reach 'E' from 'S', but the DP typically builds from a base case, it's often easier to think about reaching 'S' from 'E' (backward DP) or to fill the DP table from 'S' towards 'E' if modifying the problem slightly.",
      "Ensure the DP state correctly captures both the maximum score and the count of paths achieving that score.",
      "Double-check boundary conditions and the handling of blocked cells ('X')."
    ]
  },
  "optimized": {
    "complexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "code": "class Solution {\n    public int[] pathsWithMaxScore(List<String> board) {\n        int n = board.size();\n        int MOD = 1_000_000_007;\n\n        // dp[r][c][0] stores max score, dp[r][c][1] stores number of paths\n        int[][][] dp = new int[n][n][2];\n\n        // Initialize dp table with -1 to indicate unreachable or invalid cells\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                dp[i][j][0] = -1;\n                dp[i][j][1] = 0;\n            }\n        }\n\n        // Base case: The starting cell 'E' (bottom-right for backward DP)\n        // Its score is 0, and there's 1 way to reach it (from itself).\n        // We treat the input board as if 'S' is at (0,0) and 'E' is at (n-1,n-1) for easier DP indexing\n        // So, we actually start DP from board[n-1][n-1] which is 'E' in problem statement.\n        if (board.get(n - 1).charAt(n - 1) != 'X') {\n            dp[n - 1][n - 1][0] = 0;\n            dp[n - 1][n - 1][1] = 1;\n        }\n\n        // Iterate backwards from the bottom-right corner towards the top-left\n        for (int r = n - 1; r >= 0; r--) {\n            for (int c = n - 1; c >= 0; c--) {\n                // If the current cell is blocked or unreachable, skip it\n                if (board.get(r).charAt(c) == 'X' || dp[r][c][0] == -1) {\n                    continue;\n                }\n\n                // Define the possible preceding cells that can reach (r, c)\n                // These are (r-1, c), (r, c-1), and (r-1, c-1) for standard DP from top-left.\n                // Since we are iterating backwards, we look at neighbors that could lead TO (r,c) FROM a cell WE HAVE ALREADY PROCESSED.\n                // So, we look at neighbors of (r,c) that are 'down' or 'right' from them.\n                // For cell (r,c), we want to update the cells that can move TO it: (r+1,c), (r,c+1), (r+1,c+1).\n                // This means our transitions should update UPCOMING cells.\n                \n                // The standard problem is to go from (0,0) to (n-1,n-1).\n                // For DP, it's easier to think of reaching a cell (r,c) from its neighbors.\n                // If we fill dp from (n-1,n-1) backwards to (0,0):\n                // dp[r][c] is the max score and paths to reach (r,c) STARTING FROM (n-1,n-1).\n                // The moves to consider to reach (r,c) from a processed cell are:\n                // From (r+1, c), (r, c+1), (r+1, c+1)\n\n                // Let's use moves FROM the current cell (r,c) TO its neighbors which are CLOSER to 'E'.\n                // So, from (r,c), we can move to (r-1,c), (r,c-1), (r-1,c-1).\n                // We update dp[next_r][next_c] based on dp[r][c].\n                \n                int[] dr = {-1, 0, -1};\n                int[] dc = {0, -1, -1};\n\n                for (int i = 0; i < 3; i++) {\n                    int nr = r + dr[i];\n                    int nc = c + dc[i];\n\n                    // Check if the next cell is within bounds and not blocked\n                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && board.get(nr).charAt(nc) != 'X') {\n                        int currentCellScore = 0;\n                        // 'E' cell is at (0,0) when coming from (n-1,n-1) backwards. Its value is not added.\n                        // The problem states: 'The score is the sum of numbers on visited cells, excluding 'S' and 'E'.' \n                        // If we are iterating backwards, 'S' is at (n-1,n-1) and 'E' is at (0,0).\n                        // So we add score if it's not 'E'.\n                        if (board.get(nr).charAt(nc) != 'E') {\n                             currentCellScore = board.get(nr).charAt(nc) - '0';\n                        }\n\n                        int newScore = dp[r][c][0] + currentCellScore;\n\n                        // If we found a path with a higher score\n                        if (newScore > dp[nr][nc][0]) {\n                            dp[nr][nc][0] = newScore;\n                            dp[nr][nc][1] = dp[r][c][1]; // Reset path count to the paths of the better score source\n                        } \n                        // If we found a path with an equal score\n                        else if (newScore == dp[nr][nc][0]) {\n                            dp[nr][nc][1] = (dp[nr][nc][1] + dp[r][c][1]) % MOD;\n                        }\n                    }\n                }\n            }\n        }\n\n        // The result is at the 'S' cell (0,0) in our backward DP context\n        if (dp[0][0][0] == -1) {\n            return new int[]{0, 0};\n        } else {\n            return new int[]{dp[0][0][0], dp[0][0][1]};\n        }\n    }\n}"
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


