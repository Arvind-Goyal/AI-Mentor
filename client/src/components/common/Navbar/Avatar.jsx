import React from "react";

const Avatar = ({
  name = "Arvind Kumar",
  size = "md",
  showStatus = true,
  onClick,
}) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const sizes = {
    sm: {
      container: "w-8 h-8 text-sm",
      status: "w-2.5 h-2.5",
    },
    md: {
      container: "w-10 h-10 text-base",
      status: "w-3 h-3",
    },
    lg: {
      container: "w-13 h-13 text-lg",
      status: "w-4 h-4",
    },
  };

  const currentSize = sizes[size];

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
          font-semibold
          text-white
          shadow-md
          hover:scale-105
          transition-transform
          duration-200
        `}
      >
        {initials}
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