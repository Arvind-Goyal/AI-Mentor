import { useLocation } from "react-router-dom";
import { Bot } from "lucide-react";
import PAGE_METADATA from '../../../constants/pageMetaData';

const PageHeader = () => {
  const location = useLocation();

  const page = PAGE_METADATA[location.pathname] || { title: "AI DSA Mentor", subtitle: "", icon: Bot };
  const Icon = page.icon;

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
      <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
        <Icon size={18} strokeWidth={2.2} className="sm:w-5 sm:h-5" />
      </div>
      <div className="min-w-0 truncate">
        <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">
          {page.title}
        </h1>

        {page.subtitle && (
          <p className="hidden md:block text-xs sm:text-sm text-slate-500 truncate">
            {page.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
