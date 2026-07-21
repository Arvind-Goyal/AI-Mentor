const Divider = () => {
    return (
        <div className="flex items-center gap-4 py-5">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-sm text-slate-500">
                OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />
        </div>
    );
};

export default Divider;