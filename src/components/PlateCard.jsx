import React from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200";

const PlateCard = ({ id, image, name, description, price, isAvailable, categoryName }) => {
    return (
    <Link
        to={`/plats/${id}`}
        className="group relative bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] p-3 border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.02] shadow-2xl hover:shadow-[0_0_40px_rgba(255,67,20,0.1)] hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer overflow-hidden"
    >
        {isAvailable ? (
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-5 z-10 isolated">
            <img
                src={image || FALLBACK_IMAGE}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>

            <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <span className="bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {categoryName || "Curated"}
                </span>
            </div>
            </div>
        ) : (
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-5 z-10 isolated">
            
            <div className="absolute inset-0 bg-zinc-950/50 z-10 flex items-center justify-center backdrop-blur-md">
                <span className="bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-2xl shadow-2xl tracking-widest uppercase text-sm">
                Sold Out
                </span>
            </div>

            <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"
                alt="Margherita Pizza"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-0"></div>
            </div>
        )
        }

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
            <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-lg backdrop-blur-sm">
            <i className="ph-bold ph-check"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest">
                Available
            </span>
            </div>
        </div>
        </div>
    </Link>
    );
};

export default PlateCard;
