import History from "../models/History.js";


export const getDashboard = async (req, res) => {

  try {

    const userId = req.user._id;

    const history = await History.find({ userId })
      .sort({ createdAt: -1 });


    // Problems analyzed

    const problemsAnalyzed = history.length;


    // Topics explored

    const topicMap = {};

    history.forEach((item) => {

      const concepts = item.analysis?.analysis?.concepts || [];

      concepts.forEach((concept) => {

        topicMap[concept] = (topicMap[concept] || 0) + 1;

      });

    });


    const topics = Object.entries(topicMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);

      const topicsExplored = topics.length;
    // Language usage

    const languageMap = {};

    history.forEach((item) => {

      const language = item.language;

      if (!language) return;

      languageMap[language] =
        (languageMap[language] || 0) + 1;

    });


    const totalLanguages = Object.values(languageMap)
      .reduce((sum, count) => sum + count, 0);


    const languages = Object.entries(languageMap)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round(
          (count / totalLanguages) * 100
        ),
      }))
      .sort((a, b) => b.count - a.count);


    // Weekly activity

    const days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];


    const now = new Date();

    const currentDay = now.getDay();

    // Convert JavaScript's Sunday = 0
    // into Monday = 0 ... Sunday = 6

    const todayIndex =
      currentDay === 0
        ? 6
        : currentDay - 1;


    // Monday of current week

    const currentWeekStart = new Date(now);

    currentWeekStart.setDate(
      now.getDate() - todayIndex
    );

    currentWeekStart.setHours(0, 0, 0, 0);


    // Monday of previous week

    const previousWeekStart = new Date(
      currentWeekStart
    );

    previousWeekStart.setDate(
      previousWeekStart.getDate() - 7
    );


    // Monday of next week

    const nextWeekStart = new Date(
      currentWeekStart
    );

    nextWeekStart.setDate(
      nextWeekStart.getDate() + 7
    );


    // Store activity counts

    const currentWeekCounts = Array(7).fill(0);

    const previousWeekCounts = Array(7).fill(0);


    history.forEach((item) => {

      const date = new Date(item.createdAt);

      date.setHours(0, 0, 0, 0);

      const time = date.getTime();


      // Current week

      if (
        time >= currentWeekStart.getTime() &&
        time < nextWeekStart.getTime()
      ) {

        const day = date.getDay();

        const index =
          day === 0
            ? 6
            : day - 1;

        currentWeekCounts[index]++;

      }


      // Previous week

      else if (
        time >= previousWeekStart.getTime() &&
        time < currentWeekStart.getTime()
      ) {

        const day = date.getDay();

        const index =
          day === 0
            ? 6
            : day - 1;

        previousWeekCounts[index]++;

      }

    });


    // Build final weekly activity

    const weeklyActivity = days.map(
      (day, index) => ({

        day,

        count:
          index <= todayIndex
            ? currentWeekCounts[index]
            : previousWeekCounts[index],

        isCurrentWeek:
          index <= todayIndex,

      })
    );


    // Current streak

    const activityDates = new Set();


    history.forEach((item) => {

      const date = new Date(item.createdAt);

      date.setHours(0, 0, 0, 0);

      activityDates.add(
        date.getTime()
      );

    });


    let currentStreak = 0;

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    let checkDate = new Date(today);


    // If the user hasn't done anything today,
    // start checking from yesterday.

    if (
      !activityDates.has(
        checkDate.getTime()
      )
    ) {

      checkDate.setDate(
        checkDate.getDate() - 1
      );

    }


    while (
      activityDates.has(
        checkDate.getTime()
      )
    ) {

      currentStreak++;

      checkDate.setDate(
        checkDate.getDate() - 1
      );

    }

    // Mentor insight

    let strengths = [];
    let suggestion = null;

    if (topics.length > 0) {

      // Top 2 most practiced topics

      strengths = topics
        .slice(0, 2)
        .map((topic) => topic.name);


      // Least practiced topic

      if (topics.length > 2) {

        suggestion = topics[topics.length - 1].name;

      }

    }


    const mentorInsight = {

      strengths,

      suggestion,

      message: suggestion
        ? "to improve your problem-solving range."
        : "to expand your problem-solving range.",

      action: suggestion
        ? `Explore ${suggestion} Problems`
        : "Explore More Problems",

    };
    // Continue learning

    let continueLearning = {
      topic: null,
      description:
        "Analyze more problems to get a personalized recommendation.",
      action: "Analyze Problem",
    };


    if (topics.length >= 3) {

      const recommendedTopic =
        topics[topics.length - 1];


      continueLearning = {

        topic: recommendedTopic.name,

        description:
          `You've explored ${recommendedTopic.name} less than your other practiced topics. Build more familiarity with this concept.`,

        action: "Continue Learning",

      };

    }



    res.status(200).json({

      success: true,

      stats: {
        problemsAnalyzed,
        currentStreak,
        topicsExplored,
      },

      topics,

      languages,

      weeklyActivity,

      mentorInsight,

      continueLearning,

    });


  } catch (error) {

    console.error(
      "Dashboard error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to load dashboard data",

    });

  }

};