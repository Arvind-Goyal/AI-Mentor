// controllers/editorController.js

import { generateReview } from "../services/editorService.js";

export const reviewCode = async (req, res) => {
  try {
    const { problem, language, code } = req.body;

    if (!problem || !language || !code) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const review = await generateReview({problem,language,code,});
//     const review = {
//     errors: [
//         "No syntax errors detectedded."
//     ],

//     logicIssues: [
//         "Your solution uses nested loops resulting in O(n²) time complexity."
//     ],

//     suggestions: [
//         "Use a HashMap for constant-time lookup.",
//         "Rename variable 'a' to something meaningful."
//     ],

//     complexity: {
//         time: "O(n²)",
//         expectedTime: "O(n)",
//         space: "O(1)",
//         expectedSpace: "O(n)"
//     },

//     overallFeedback:
//         "Good first solution. The logic is correct, but it can be optimized using a HashMap."
// };  
    
    // console.log(review);

    res.json({
      success: true,
      review,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to review code",
    });
  }
};