import { useState } from "react";
import { UserPlus, UserMinus } from "lucide-react";

const FollowersList = ({
  followers = [],
  onFollow,
  onUnfollow,
  readOnly = false,
}) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (user) => {
    if (readOnly) return;

    const userId = user._id || user.id;

    try {
      setLoadingId(userId);

      if (user.isFollowing) {
        await onUnfollow(userId);
      } else {
        await onFollow(userId);
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
          {readOnly
            ? "People following this user."
            : "People following you."}
        </p>
      </div>

      {/* Followers */}
      <div className="divide-y divide-slate-100">

        {followers.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">
            No followers yet.
          </p>
        ) : (
          followers.map((user) => {
            const userId = user._id || user.id;

            return (
              <div
                key={userId}
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
                    src={
                      user.profilePicture ||
                      user.avatar ||
                      "/default-avatar.png"
                    }
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
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleAction(user)}
                    disabled={loadingId === userId}
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

                    {loadingId === userId ? (
                      user.isFollowing
                        ? "Unfollowing..."
                        : "Following..."
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
                )}

              </div>
            );
          })
        )}

      </div>

    </section>
  );
};

export default FollowersList;