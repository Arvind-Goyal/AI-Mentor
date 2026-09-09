const ProfileTabs = ({
  activeTab,
  setActiveTab,
  followersCount = 0,
  followingCount = 0,
}) => {
  const tabs = [
    {
      id: "achievements",
      label: "Achievements",
    },
    {
      id: "followers",
      label: `Followers (${followersCount})`,
    },
    {
      id: "following",
      label: `Following (${followingCount})`,
    },
  ];

  return (
    <div className="mt-6 border-b border-slate-200">
      <div className="flex items-center gap-8">

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative
                px-1
                pb-3
                text-sm
                font-medium
                transition-colors
                ${
                  isActive
                    ? "text-violet-600"
                    : "text-slate-500 hover:text-slate-800"
                }
              `}
            >
              {tab.label}

              {isActive && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-0.5
                    w-full
                    rounded-full
                    bg-violet-500
                  "
                />
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default ProfileTabs;