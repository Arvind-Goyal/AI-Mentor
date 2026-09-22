import { Component } from "react";
import { AlertTriangle, RotateCcw, LayoutDashboard, ChevronDown } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an unhandled rendering error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoDashboard = () => {
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const isDev = Boolean(import.meta.env?.DEV);

      return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-200">
          <div className="max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
            {/* Warning Icon with Glow */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm shadow-amber-500/10">
              <AlertTriangle size={32} />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Something went wrong
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                An unexpected application error occurred while loading this view. You can try reloading or return to safety.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold shadow-xs transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw size={15} />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-md shadow-violet-500/25 transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoDashboard}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 dark:hover:bg-violet-900/60 text-violet-700 dark:text-violet-300 text-sm font-semibold transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Expandable Technical Details (Useful for debugging) */}
            {error && (
              <details className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-left group">
                <summary className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer list-none flex items-center justify-between">
                  <span>View error details</span>
                  <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-3 p-3 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-48 scrollbar-thin">
                  <p className="text-rose-400 font-bold mb-1">{error.toString()}</p>
                  {isDev && errorInfo?.componentStack && (
                    <pre className="text-slate-400 text-[11px] whitespace-pre-wrap">
                      {errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
