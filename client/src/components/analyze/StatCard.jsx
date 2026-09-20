import React from "react";
import { Maximize2, ArrowUpRight } from "lucide-react";

const StatCard = ({
  icon: Icon,
  title,
  value,
  rawItems,
  subtitle,
  bgColor = "bg-slate-100",
  textColor = "text-slate-700",
  onClick,
}) => {
  const isMultiItem = Array.isArray(rawItems) && rawItems.length > 1;
  const moreCount = isMultiItem ? rawItems.length - 1 : null;
  const displayValue = isMultiItem ? rawItems[0] : value;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-violet-300 cursor-pointer flex flex-col justify-between h-[126px] select-none"
      title="Click to view full details"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bgColor} ${textColor} transition-transform duration-200 group-hover:scale-105`}
          >
            {Icon && <Icon size={21} strokeWidth={2.2} />}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {title}
            </p>

            <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
              <h3
                className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-[150px] sm:max-w-[170px]"
                title={String(value || "")}
              >
                {displayValue || "—"}
              </h3>

              {moreCount && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 group-hover:bg-blue-100 transition shrink-0">
                  +{moreCount} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expand Icon */}
        <div className="text-slate-400 group-hover:text-violet-600 transition-colors p-1 rounded-md group-hover:bg-violet-50 shrink-0">
          <Maximize2 size={13} />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100/90 text-xs">
        <span className="text-slate-400 font-medium truncate max-w-[130px]">
          {subtitle}
        </span>
        <span className="text-[11px] font-semibold text-violet-600 group-hover:text-violet-700 flex items-center gap-0.5 shrink-0 opacity-90 group-hover:opacity-100 transition">
          <span>View full</span>
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  );
};

export default StatCard;