import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Toaster richColors position="top-right" />
      <AppRoutes />
    </div>
  );
};

export default App;
