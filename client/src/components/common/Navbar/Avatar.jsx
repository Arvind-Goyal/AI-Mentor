import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const Avatar = ({
  size = "md",
  showStatus = true,
  onClick,
}) => {
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);

  const getFirstChar = (name = "") => {
    const clean = (name || "").trim();
    return clean ? clean[0].toUpperCase() : "U";
  };

  const initial = getFirstChar(user?.name || user?.username);
  const photoUrl = user?.profilePicture || user?.avatar;

  const sizes = {
    sm: {
      container: "w-8 h-8 text-xs",
      status: "w-2.5 h-2.5",
    },
    md: {
      container: "w-10 h-10 text-sm",
      status: "w-3 h-3",
    },
    lg: {
      container: "w-13 h-13 text-lg",
      status: "w-4 h-4",
    },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <button
      onClick={onClick}
      className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500"
    >
      <div
        className={`
          ${currentSize.container}
          rounded-full
          bg-gradient-to-br
          from-violet-600
          to-indigo-600
          flex
          items-center
          justify-center
          font-bold
          text-white
          shadow-md
          hover:scale-105
          transition-transform
          duration-200
          overflow-hidden
          select-none
        `}
      >
        {photoUrl && !imgError ? (
          <img
            src={photoUrl}
            alt={user?.name || "User"}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          initial
        )}
      </div>

      {showStatus && (
        <span
          className={`
            absolute
            bottom-0
            right-0
            ${currentSize.status}
            rounded-full
            bg-emerald-500
            border-2
            border-white
          `}
        />
      )}
    </button>
  );
};

export default Avatar;