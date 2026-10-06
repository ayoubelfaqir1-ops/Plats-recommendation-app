import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import {
    getRecommended,
    deleteRecommendation,
} from "../services/recommended.service";

const parseWarnings = (warningMessage) => {
    if (!warningMessage) return [];
    try {
        const parsed = JSON.parse(warningMessage);
        return Array.isArray(parsed) ? parsed : [String(parsed)];
    } catch {
        return [String(warningMessage)];
    }
};

const Recommendations = () => {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("all"); // 'all' | 'compatible' | 'conflicts'
    const [deletingId, setDeletingId] = useState(null);

    const {
        data: rawRecommendations,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["recommendations"],
        queryFn: getRecommended,
    });

    const recommendations = Array.isArray(rawRecommendations)
        ? rawRecommendations
        : Array.isArray(rawRecommendations?.data)
        ? rawRecommendations.data
        : [];

    const deleteMutation = useMutation({
        mutationFn: deleteRecommendation,
        onMutate: (id) => setDeletingId(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["recommendations"]);
            queryClient.invalidateQueries(["recommended"]);
        },
        onSettled: () => setDeletingId(null),
    });

    const handleDelete = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to remove this analysis?")) {
            deleteMutation.mutate(id);
        }
    };

    // Filter logic
    const filteredList = recommendations.filter((item) => {
        if (filter === "compatible") return item.compatible === true;
        if (filter === "conflicts") return item.compatible === false;
        return true;
    });

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col">
                <Navbar showSearch={false} />

                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/5">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-3">
                                <i className="ph-fill ph-sparkle text-sm"></i>
                                AI Insights
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                                My Recommendations
                            </h1>
                            <p className="text-zinc-400 text-base sm:text-lg mt-2 max-w-2xl font-light">
                                Review compatibility analysis for dishes tested against your dietary profile.
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-2xl border border-white/10 w-fit backdrop-blur-md">
                            <button
                                type="button"
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    filter === "all"
                                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                All ({recommendations.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setFilter("compatible")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    filter === "compatible"
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                        : "text-zinc-400 hover:text-emerald-300"
                                }`}
                            >
                                Compatible
                            </button>
                            <button
                                type="button"
                                onClick={() => setFilter("conflicts")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    filter === "conflicts"
                                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                                        : "text-zinc-400 hover:text-amber-300"
                                }`}
                            >
                                Needs Attention
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="py-24 text-center text-zinc-500">
                            <div className="w-12 h-12 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-sm font-medium">Loading recommendations history...</p>
                        </div>
                    ) : error ? (
                        <div className="rounded-[2.5rem] bg-red-500/5 border border-red-500/20 p-8 text-center max-w-md mx-auto my-12">
                            <i className="ph-bold ph-warning text-3xl text-red-400 mb-2 block"></i>
                            <p className="text-red-300 font-bold">Failed to load recommendations</p>
                            <p className="text-zinc-500 text-sm mt-1">Please try again in a moment.</p>
                        </div>
                    ) : filteredList.length === 0 ? (
                        <div className="rounded-[3rem] bg-white/[0.02] border border-white/5 p-12 text-center max-w-lg mx-auto my-12 backdrop-blur-xl">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-primary-400 mx-auto mb-4">
                                <i className="ph-fill ph-sparkle"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No analyses found</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                {filter === "all"
                                    ? "You haven't run AI dietary checks on any dishes yet. Browse dishes and click 'Run Analysis' to see compatibility scores."
                                    : `No dishes found matching the '${filter}' filter.`}
                            </p>
                            <Link
                                to="/home"
                                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 px-6 rounded-2xl text-sm transition-all shadow-[0_0_20px_rgba(255,67,20,0.3)] active:scale-95"
                            >
                                <i className="ph-bold ph-compass"></i>
                                Explore Dishes
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredList.map((rec) => {
                                const plat = rec.plat || {};
                                const warnings = parseWarnings(rec.warning_message);
                                const isDeleting = deletingId === rec.id;

                                return (
                                    <div
                                        key={rec.id}
                                        className="rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-xl relative overflow-hidden group"
                                    >
                                        <div>
                                            {/* Dish Header */}
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                                                        <img
                                                            src={
                                                                plat.image ||
                                                                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300"
                                                            }
                                                            alt={plat.name || "Dish"}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white text-lg line-clamp-1">
                                                            {plat.name || "Dish Analysis"}
                                                        </h3>
                                                        <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                                                            {plat.category?.name || "Curated"} · ${plat.price || "--"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    type="button"
                                                    disabled={isDeleting}
                                                    onClick={(e) => handleDelete(rec.id, e)}
                                                    className="text-zinc-500 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                                    title="Delete this recommendation"
                                                >
                                                    <i className="ph-bold ph-trash text-base"></i>
                                                </button>
                                            </div>

                                            {/* Score & Compatibility Banner */}
                                            <div
                                                className={`rounded-2xl p-4 mb-4 border flex items-center justify-between ${
                                                    rec.compatible
                                                        ? "bg-emerald-500/10 border-emerald-500/20"
                                                        : "bg-amber-500/10 border-amber-500/20"
                                                }`}
                                            >
                                                <div>
                                                    <span
                                                        className={`text-xs font-bold uppercase tracking-widest block ${
                                                            rec.compatible ? "text-emerald-400" : "text-amber-400"
                                                        }`}
                                                    >
                                                        {rec.compatible ? "Compatible" : "Caution / Incompatible"}
                                                    </span>
                                                    <span className="text-zinc-400 text-xs">
                                                        Analyzed against your tags
                                                    </span>
                                                </div>

                                                <div className="text-2xl font-black text-white">
                                                    {rec.score ?? 0}
                                                    <span
                                                        className={`text-sm ${
                                                            rec.compatible ? "text-emerald-400" : "text-amber-400"
                                                        }`}
                                                    >
                                                        %
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Reasoning */}
                                            <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {rec.reasoning || "No detailed reasoning provided."}
                                            </p>

                                            {/* Warnings if any */}
                                            {warnings.length > 0 && (
                                                <div className="mb-4 space-y-1.5">
                                                    {warnings.slice(0, 2).map((w, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-400/90"
                                                        >
                                                            <i className="ph-bold ph-warning text-sm shrink-0 mt-0.5"></i>
                                                            <span className="line-clamp-2">{w}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Action */}
                                        <div className="pt-4 border-t border-white/5 mt-2 flex justify-between items-center">
                                            <span className="text-[11px] text-zinc-500">
                                                {rec.created_at
                                                    ? new Date(rec.created_at).toLocaleDateString()
                                                    : "Recent"}
                                            </span>

                                            {plat.id && (
                                                <Link
                                                    to={`/plats/${plat.id}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-400 hover:text-primary-300 transition-colors"
                                                >
                                                    View Details
                                                    <i className="ph-bold ph-arrow-right text-xs"></i>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
};

export default Recommendations;
