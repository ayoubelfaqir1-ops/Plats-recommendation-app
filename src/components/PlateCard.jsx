import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200";

const PlateCard = ({
    id,
    image,
    name,
    description,
    price,
    isAvailable,
    categoryName,
    recommendation = null,
}) => {
    const dishImage = image || FALLBACK_IMAGE;

    return (
        <Link
            to={`/plats/${id}`}
            className="group relative bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] p-3 border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.02] shadow-2xl hover:shadow-[0_0_40px_rgba(255,67,20,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer overflow-hidden"
        >
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-5 z-10 isolated">
                <img
                    src={dishImage}
                    alt={name}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isAvailable
                            ? "group-hover:scale-110"
                            : "filter grayscale-[40%] group-hover:scale-105"
                    }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>

                {!isAvailable && (
                    <div className="absolute inset-0 bg-zinc-950/60 z-20 flex items-center justify-center backdrop-blur-xs">
                        <span className="bg-zinc-900/90 border border-white/20 text-white font-bold px-5 py-2.5 rounded-2xl shadow-2xl tracking-widest uppercase text-xs">
                            Sold Out
                        </span>
                    </div>
                )}

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-30">
                    <span className="bg-black/50 backdrop-blur-xl border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                        {categoryName || "Curated"}
                    </span>

                    {recommendation?.status === "ready" && (
                        <span
                            className={`backdrop-blur-xl border text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xl ${
                                recommendation.compatible
                                    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                                    : "bg-amber-500/20 border-amber-400/40 text-amber-300"
                            }`}
                        >
                            <i className="ph-fill ph-sparkle text-xs"></i>
                            {recommendation.score}% Match
                        </span>
                    )}
                </div>
            </div>

            <div className="px-3 pb-3 flex-grow flex flex-col justify-between relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1 tracking-tight mb-2">
                        {name}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed font-light">
                        {description || "No description available for this dish yet."}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
                    <span className="text-2xl font-black text-white">${price}</span>

                    {isAvailable ? (
                        <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                            <i className="ph-bold ph-check text-xs"></i>
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                Available
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1.5 text-zinc-400 bg-zinc-800/50 border border-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                            <i className="ph-bold ph-x text-xs"></i>
                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                Unavailable
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PlateCard;
