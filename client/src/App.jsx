import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 transition-colors duration-200">
      <Toaster richColors position="top-right" theme="light" />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </div>
  );
};

export default App;
