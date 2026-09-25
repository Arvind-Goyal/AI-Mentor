import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  LayoutDashboard,
  Code2,
  Sparkles,
  History,
  Compass,
} from "lucide-react";
import ROUTES from "../../constants/routes";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      {/* Background Decorative Blur Rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Brand Header */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200/60 text-xs font-semibold text-violet-700 shadow-xs">
          <Compass size={14} className="animate-spin-slow text-violet-600" />
          <span>Error 404 • Lost in Cyberspace</span>
        </div>

        {/* 404 Big Heading */}
        <div className="space-y-3">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 bg-clip-text text-transparent select-none">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Page Not Found
          </h2>
          <p className="max-w-md mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            We searched through every algorithm and data structure, but couldn't find the page you're looking for. It might have been moved, renamed, or doesn't exist.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-xs transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>

          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-md shadow-violet-500/25 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>

          <Link
            to={ROUTES.EDITOR}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-700 text-sm font-semibold transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <Code2 size={16} />
            <span>Code Editor</span>
          </Link>
        </div>

        {/* Quick Links Suggestions Card */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Popular Destinations
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to={ROUTES.DASHBOARD}
              className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-violet-300 transition group text-left"
            >
              <LayoutDashboard size={18} className="text-violet-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-slate-800">Dashboard</div>
              <div className="text-[11px] text-slate-500 truncate">Your progress</div>
            </Link>

            <Link
              to={ROUTES.EDITOR}
              className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-violet-300 transition group text-left"
            >
              <Code2 size={18} className="text-violet-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-slate-800">Editor</div>
              <div className="text-[11px] text-slate-500 truncate">Write code</div>
            </Link>

            <Link
              to={ROUTES.ANALYZE}
              className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-violet-300 transition group text-left"
            >
              <Sparkles size={18} className="text-violet-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-slate-800">Analyze</div>
              <div className="text-[11px] text-slate-500 truncate">AI problem solver</div>
            </Link>

            <Link
              to={ROUTES.HISTORY}
              className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-violet-300 transition group text-left"
            >
              <History size={18} className="text-violet-600 mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-slate-800">History</div>
              <div className="text-[11px] text-slate-500 truncate">Past sessions</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
