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

        const analysis = await analyzeWithGemini(problem, language);
    //     const analysis =  {
    //     "mentor": {
    //         "goal": "To guide the user in understanding and solving the 'Network Recovery Pathways' LeetCode problem, focusing on graph traversal algorithms and optimization techniques.",
    //         "advice":{
    //             "title":"abcd",
    //             "description":"do Great"
    //         },
    //         "estimatedTime": "30-45 minutes",
    //         "confidence": 5,
    //         "motivation": "This problem is a great way to reinforce understanding of shortest path algorithms and their applications in real-world scenarios like network recovery. It also offers opportunities for optimization.",
    //         "status": {
    //             "state": "Not Started",
    //             "estimatedTime": "45 minutes",
    //             "difficulty": "Medium",
    //             "progress": 0
    //         },
    //         "mistakes": ["do it properly ","no need of nested loop"]
    //     },
    //     "analysis": {
    //         "difficulty": "Medium",
    //         "summary": "The problem asks us to find the shortest path from a source node to a destination node in a weighted undirected graph. However, there's a twist: we are given a specific number of allowed 'edges' (or hops) to traverse. If a path exists within the given hop limit, we need to return its total weight. If no such path exists, or if the path found is not the shortest, we should return -1.",
    //         "concepts": [
    //             "Graph Theory",
    //             "Shortest Path Algorithms (Dijkstra's Algorithm, Bellman-Ford Algorithm, BFS)",
    //             "Dynamic Programming",
    //             "Priority Queues",
    //             "Breadth-First Search (BFS)"
    //         ],
    //         "companies": [
    //             "Amazon",
    //             "Microsoft",
    //             "Google",
    //             "Meta",
    //             "Apple"
    //         ]
    //     },
    //     "hint1": {
    //         "text": "This problem can be viewed as finding the shortest path with a constraint on the number of edges. Standard shortest path algorithms like Dijkstra's might not directly handle the edge count constraint. Consider how you can augment the state to include the number of edges used."
    //     },
    //     "hint2": {
    //         "text": "Think about dynamic programming. Let dp[k][i] represent the shortest distance to reach node 'i' using exactly 'k' edges. How can you compute this using the distances from the previous step (k-1)?"
    //     },
    //     "hint3": {
    //         "text": "Alternatively, you can adapt Dijkstra's algorithm. Instead of storing just the minimum distance to a node, store a pair: (distance, number_of_edges). When exploring neighbors, update the state if a shorter path with fewer or equal edges is found."
    //     },
    //     "algorithm": {
    //         "steps": [
    //             "Represent the network as an adjacency list where each entry stores the neighbor node and the weight of the edge connecting them.",
    //             "Initialize a 2D array `dist[k][node]` to store the minimum distance to reach `node` using exactly `k` edges. Initialize all entries to infinity.",
    //             "Set `dist[0][source]` to 0, as the distance to the source node using 0 edges is 0.",
    //             "Iterate from `k = 1` to `allowedEdges`:",
    //             "  For each node `u` in the graph:",
    //             "    If `dist[k-1][u]` is not infinity (meaning `u` is reachable with `k-1` edges):",
    //             "      For each neighbor `v` of `u` with edge weight `w`:",
    //             "        Update `dist[k][v] = min(dist[k][v], dist[k-1][u] + w)`.",
    //             "After filling the `dist` array, find the minimum value among `dist[i][destination]` for `i` from 1 to `allowedEdges`.",
    //             "If this minimum value is still infinity, return -1. Otherwise, return the minimum value."
    //         ]
    //     },
    //     "pseudocode": {
    //         "code": "function findShortestPath(n, edges, source, destination, allowedEdges):\n    adj = buildAdjacencyList(edges)\n    dist = new array[allowedEdges + 1][n] initialized to infinity\n\n    dist[0][source] = 0\n\n    for k from 1 to allowedEdges:\n        for u from 0 to n-1:\n            if dist[k-1][u] is not infinity:\n                for each neighbor (v, weight) in adj[u]:\n                    dist[k][v] = min(dist[k][v], dist[k-1][u] + weight)\n\n    min_dist = infinity\n    for k from 1 to allowedEdges:\n        min_dist = min(min_dist, dist[k][destination])\n\n    if min_dist is infinity:\n        return -1\n    else:\n        return min_dist"
    //     },
    //     "review": {
    //         "strengths": [
    //             "The problem statement is clear and provides sufficient context for a graph-based solution.",
    //             "It tests the understanding of shortest paths with an additional constraint, which is a common variation.",
    //             "The constraints on `n` and `edges` suggest that a polynomial time solution is expected, likely not brute-force path enumeration."
    //         ],
    //         "improvements": [
    //             "Consider edge cases like `source == destination` or `allowedEdges == 0`.",
    //             "The provided solution uses DP. An alternative optimized solution using a modified Dijkstra could also be explored.",
    //             "Carefully analyze the time and space complexity of the chosen approach."
    //         ]
    //     },
    //     "optimized": {
    //         "complexity": {
    //             "time": "O(allowedEdges * (V + E)) using a BFS-like DP approach or O(E * allowedEdges * log(V * allowedEdges)) using a modified Dijkstra. For the DP approach described above, it's O(allowedEdges * E) if V is proportional to E, or O(allowedEdges * (V + E)) if we iterate through all nodes.",
    //             "space": "O(allowedEdges * V)"
    //         },
    //         "code": "// This is a conceptual representation. A full Java implementation would be provided in an actual coding session.\n// Optimized approach using modified Dijkstra\n/*\nclass State {\n    int node;\n    int distance;\n    int edgesUsed;\n}\n\n// Use a PriorityQueue<State> ordered by distance.\n// The state in the visited set or distance map would be a pair (node, edgesUsed).\n// When extracting from PQ, if current distance is greater than recorded for (node, edgesUsed), skip.\n// Update distance map: dist[node][edgesUsed] = new_distance.\n// This approach is similar to Bellman-Ford but uses a priority queue for potential speedup.\n*/\n"
    //     }
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