import { useState } from "react";
import { UserMinus } from "lucide-react";

const FollowingList = ({
  following = [],
  onUnfollow,
}) => {
  const [unfollowingId, setUnfollowingId] = useState(null);

  const handleUnfollow = async (userId) => {
    try {
      setUnfollowingId(userId);

      await onUnfollow(userId);
    } finally {
      setUnfollowingId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm">

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">
          Following
        </h2>

        <p className="mt-0.5 text-sm text-slate-500">
          People you follow.
        </p>
      </div>

      <div className="divide-y divide-slate-100">

        {following.map((user) => (
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

            <button
              type="button"
              onClick={() => handleUnfollow(user.id)}
              disabled={unfollowingId === user.id}
              className="
                group
                flex
                items-center
                gap-1.5
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                py-1.5
                text-xs
                font-medium
                text-slate-600
                transition-all
                duration-200
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <UserMinus size={14} />

              {unfollowingId === user.id ? (
                "Unfollowing..."
              ) : (
                <>
                  <span className="group-hover:hidden">
                    Following
                  </span>

                  <span className="hidden group-hover:inline">
                    Unfollow
                  </span>
                </>
              )}
            </button>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FollowingList;