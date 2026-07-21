import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

import { toast } from "sonner";


const HeroButtons = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Primary CTA */}
      <Link
        to="/signup"
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/30"
      >
        Start Learning Free
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      {/* Secondary CTA */}
      <button
  type="button"
  onClick={() => toast.info("🎬 Demo coming soon!")}
  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
>
  <Play className="h-5 w-5 fill-current" />
  Watch Demo
</button>
    </div>
  );
};

export default HeroButtons;
