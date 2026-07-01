const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    bgColor,
    iconColor
}) => {
    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

            {/* Top */}

            <div className="flex items-center gap-4">

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}
                >
                    <span className={`text-2xl ${iconColor}`}>
                        {icon}
                    </span>
                </div>

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                        {value}
                    </h3>

                </div>

            </div>

            {/* Bottom */}

            <p className="mt-4 text-sm text-slate-500">
                {subtitle}
            </p>

        </div>

    );
};

export default StatCard;