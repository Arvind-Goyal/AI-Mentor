const ReviewSection = ({ icon, title, children }) => {
  return (
    <div className="border-b border-slate-200 pb-5 mb-5 last:border-none">

      <div className="flex items-center gap-2 mb-3">
        {icon}

        <h3 className="font-semibold text-slate-800">
          {title}
        </h3>
      </div>

      {children}

    </div>
  );
};

export default ReviewSection;