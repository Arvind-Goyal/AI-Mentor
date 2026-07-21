const BrowserFrame = ({ children }) => {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">

      {/* Browser Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">

        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        {/* Address Bar */}
        <div className="rounded-lg border border-slate-200 bg-white px-5 py-1.5 text-sm font-medium text-slate-500">
          ai-dsa-mentor.vercel.app
        </div>

        {/* Right Side */}
        <div className="w-14" />
      </div>

      {/* Browser Body */}
      <div className="bg-white">
        {children}
      </div>

    </div>
  );
};

export default BrowserFrame;