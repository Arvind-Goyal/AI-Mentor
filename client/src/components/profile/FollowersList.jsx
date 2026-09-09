import { useState } from "react";
import { UserPlus, UserMinus } from "lucide-react";

const FollowersList = ({
  followers = [],
  onFollow,
  onUnfollow,
}) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (user) => {
    try {
      setLoadingId(user.id);

      if (user.isFollowing) {
        await onUnfollow(user.id);
      } else {
        await onFollow(user.id);
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">
          Followers
        </h2>

        <p className="mt-0.5 text-sm text-slate-500">
          People following you.
        </p>
      </div>

      {/* Followers */}
      <div className="divide-y divide-slate-100">

        {followers.map((user) => (
          <div
            key={user.id}
            className="
              flex
              items-center
              justify-between
              py-3
              first:pt-0
              last:pb-0
            "
          >

            {/* User */}
            <div className="flex items-center gap-3">

              <img
                src={user.avatar}
                alt={user.name}
                className="
                  h-11
                  w-11
                  rounded-full
                  object-cover
                  ring-2
                  ring-slate-100
                "
              />

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {user.name}
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  {user.username}
                </p>
              </div>

            </div>

            {/* Follow / Following */}
            <button
                type="button"
                onClick={() => handleAction(user)}
                disabled={loadingId === user.id}
                className={`
                  group
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  transition-all
                  duration-200

                  ${
                    user.isFollowing
                      ? `
                        border-slate-200
                        bg-white
                        text-slate-600
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-600
                      `
                      : `
                        border-violet-200
                        bg-violet-50
                        text-violet-600
                        hover:bg-violet-100
                      `
                  }

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                `}
              >
                {user.isFollowing ? (
                  <UserMinus size={14} />
                ) : (
                  <UserPlus size={14} />
                )}

                {loadingId === user.id ? (
                  user.isFollowing ? "Unfollowing..." : "Following..."
                ) : user.isFollowing ? (
                  <>
                    <span className="group-hover:hidden">
                      Following
                    </span>

                    <span className="hidden group-hover:inline">
                      Unfollow
                    </span>
                  </>
                ) : (
                  "Follow"
                )}
              </button>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FollowersList;