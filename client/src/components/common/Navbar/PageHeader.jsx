import { useLocation } from "react-router-dom";
import { Bot } from "lucide-react";
import PAGE_METADATA from '../../../constants/pageMetaData';

const PageHeader = () => {

     const location = useLocation();

    const page = PAGE_METADATA[location.pathname] || { title: "AI Leetcode Assistant", subtitle: "", icon: Bot };
    const Icon = page.icon;
    
  return (
    <div className="flex flex-col gap-2 py-2 md:flex-row md:items-center md:justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Icon size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                   {page.title}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {page.subtitle}
                </p>
              </div>
            </div>

          </div>
  )
}

export default PageHeader
