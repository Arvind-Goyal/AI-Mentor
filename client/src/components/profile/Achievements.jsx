import { useState } from "react";

import {
  Trophy,
  Target,
  Medal,
  Flame,
  Crown,
  Lock,
} from "lucide-react";

const getStreakMilestone = (streak) => {
  if (streak >= 365) {
    return {
      title: "365 Day Streak",
      description: "Maintained a 365-day streak",
    };
  }

  if (streak >= 200) {
    return {
      title: "200 Day Streak",
      description: "Maintained a 200-day streak",
    };
  }

  if (streak >= 100) {
    return {
      title: "100 Day Streak",
      description: "Maintained a 100-day streak",
    };
  }

  if (streak >= 30) {
    return {
      title: "Monthly Streak",
      description: "Maintained a 30-day streak",
    };
  }

  return null;
};

const Achievements = ({
  achievements = [],
  currentStreak = 0,
  longestStreak = 0,
}) => {
  const [showAll, setShowAll] = useState(false);

  const streakAchievement = getStreakMilestone(currentStreak);

  /*
   * The profileData contains the normal achievements.
   * Streak and Longest Streak are added here dynamically.
   */
  const achievementList = [
    ...achievements,

    {
      id: "streak",
      icon: "🔥",
      title: streakAchievement?.title || "Monthly Streak",
      description:
        streakAchievement?.description ||
        "Maintain a 30-day streak to unlock",
      unlocked: streakAchievement !== null,
    },

    {
      id: "longestStreak",
      icon: "👑",
      title: "Longest Streak",
      description: "Your personal best streak",
      value: longestStreak > 0 ? `${longestStreak} days` : null,
      unlocked: longestStreak > 0,
    },
  ];

  /*
   * Show only 6 achievements initially.
   * If there are more, View All reveals everything.
   */
  const visibleAchievements = showAll
    ? achievementList
    : achievementList.slice(0, 6);

  const iconMap = {
    "🚩": Trophy,
    "🔟": Target,
    "🏅": Medal,
    "💯": Trophy,
    "🔥": Flame,
    "👑": Crown,
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">

      {/* Header */}
      <div className="mb-4 flex items-end justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Achievements
          </h2>

          <p className="mt-0.5 text-sm text-slate-500">
            Milestones you've earned along your journey.
          </p>
        </div>

        {/* View All / Show Less */}
        {achievementList.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="
              text-sm
              font-medium
              text-violet-600
              transition
              hover:text-violet-700
            "
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}

      </div>

      {/* Achievement Cards */}
      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          lg:grid-cols-6
        "
      >

        {visibleAchievements.map((achievement) => {

          const Icon = iconMap[achievement.icon] || Trophy;

          /*
           * Normal achievements:
           * date exists  → unlocked
           * date missing → locked
           *
           * Dynamic achievements:
           * explicitly use unlocked property.
           */
          const isUnlocked =
            achievement.unlocked !== undefined
              ? achievement.unlocked
              : Boolean(achievement.date);

          return (
            <div
              key={achievement.id}
              className={`
                relative
                min-h-[145px]
                rounded-xl
                border
                px-4
                py-4
                transition-all
                ${
                  isUnlocked
                    ? `
                      border-violet-100
                      bg-gradient-to-br
                      from-white
                      to-violet-50/50
                      hover:-translate-y-0.5
                      hover:shadow-sm
                    `
                    : `
                      border-slate-200
                      bg-slate-50/60
                    `
                }
              `}
            >

              {/* Lock */}
              {!isUnlocked && (
                <div className="absolute right-3 top-3">
                  <Lock
                    size={14}
                    className="text-slate-400"
                  />
                </div>
              )}

              {/* Icon */}
              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  ${
                    isUnlocked
                      ? "bg-violet-100 text-violet-600"
                      : "bg-slate-200 text-slate-400"
                  }
                `}
              >
                <Icon size={20} />
              </div>

              {/* Content */}
              <div className="mt-3">

                {/* Title */}
                <h3
                  className={`
                    text-sm
                    font-semibold
                    ${
                      isUnlocked
                        ? "text-slate-900"
                        : "text-slate-500"
                    }
                  `}
                >
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="mt-1 text-xs leading-4 text-slate-500">
                  {achievement.description}
                </p>

                {/* Value */}
                {achievement.value && (
                  <p className="mt-2 text-base font-bold text-violet-600">
                    {achievement.value}
                  </p>
                )}

                {/* Date */}
                {achievement.date && (
                  <p className="mt-2 text-[11px] text-slate-400">
                    Unlocked<br />
                      {achievement.date}
                  </p>
                )}

                {/* Locked */}
                {!isUnlocked && (
                  <p className="mt-2 text-[11px] font-medium text-slate-400">
                    Locked
                  </p>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default Achievements;