const StatsCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white
                 px-6 py-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]
                 transition hover:shadow-md"
    >

      <div className="flex items-center justify-between">

        {/* Left Content */}
        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>


          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            {value}
          </h2>


          <div className="mt-2 flex items-center text-xs">

            {change && (
              <span className="font-semibold text-emerald-500">
                ↑ {change}
              </span>
            )}


            <span
              className={`${
                change ? "ml-1" : ""
              } text-slate-400`}
            >
              {description}
            </span>

          </div>

        </div>



        {/* Icon */}
        <div
          className={`flex h-14 w-14 items-center justify-center
                      rounded-2xl ${iconBg}`}
        >
          <Icon
            size={26}
            strokeWidth={2}
            className={iconColor}
          />
        </div>


      </div>

    </div>
  );
};


export default StatsCard;