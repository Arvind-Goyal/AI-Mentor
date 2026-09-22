import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import ErrorBoundary from "./components/common/ErrorBoundary";
import useTheme from "./hooks/useTheme";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Toaster richColors position="top-right" theme={theme === "dark" ? "dark" : "light"} />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </div>
  );
};

export default App;
