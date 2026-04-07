import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { getPlatById } from "../services/plats.service";
import {
  analyzePlatRecommendation,
  getRecommendationsByPlat,
} from "../services/recommended.service";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200";

const parseWarnings = (warningMessage) => {
  if (!warningMessage) {
    return [];
  }

  try {
    const parsed = JSON.parse(warningMessage);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return [String(warningMessage)];
  }
};

const PlatDetails = () => {
  const { platId } = useParams();
  const [isStartingAnalysis, setIsStartingAnalysis] = useState(false);

  const platQuery = useQuery({
    queryKey: ["plat", platId],
    queryFn: () => getPlatById(platId),
    enabled: Boolean(platId),
  });

  const recommendationQuery = useQuery({
    queryKey: ["recommendations", platId],
    queryFn: () => getRecommendationsByPlat(platId),
    enabled: Boolean(platId),
    refetchInterval: (query) =>
      query.state.data?.[0]?.status === "pending" ? 3000 : false,
  });

  const plat = platQuery.data;
  const latestRecommendation = recommendationQuery.data?.[0] ?? null;
  const recommendationWarnings = parseWarnings(
    latestRecommendation?.warning_message
  );

  const handleAnalyze = async () => {
    try {
      setIsStartingAnalysis(true);
      await analyzePlatRecommendation(platId);
      await recommendationQuery.refetch();
    } finally {
      setIsStartingAnalysis(false);
    }
  };

  if (platQuery.isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
        <p className="text-zinc-400 text-lg">Loading plat details...</p>
      </div>
    );
  }

  if (platQuery.error || !plat) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col">
          <Navbar showSearch={false} />
          <div className="flex-grow flex items-center justify-center px-6">
            <div className="max-w-lg text-center">
              <h1 className="text-3xl font-black text-white mb-4">Plat not found</h1>
              <p className="text-zinc-400 mb-8">
                The requested plat could not be loaded.
              </p>
              <Link
                to="/home"
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 px-6 rounded-2xl transition-all"
              >
                <i className="ph-bold ph-arrow-left"></i>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col">
      <Navbar showSearch={false} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <img
                src={plat.image || FALLBACK_IMAGE}
                alt={plat.name}
                className="w-full h-full object-cover aspect-square lg:min-h-[36rem]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <section className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <span className="bg-black/40 border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  {plat.category?.name || "Curated Dish"}
                </span>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                    plat.is_available
                      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                      : "text-amber-400 bg-amber-400/10 border-amber-400/20"
                  }`}
                >
                  <i
                    className={`ph-bold ${
                      plat.is_available ? "ph-check" : "ph-x-circle"
                    }`}
                  ></i>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {plat.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
                {plat.name}
              </h1>
              <div className="text-4xl font-black text-primary-400 mb-6">
                ${plat.price}
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed font-light">
                {plat.description || "No description has been added for this plat yet."}
              </p>
            </section>

            {!latestRecommendation && (
              <section className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-3">
                  AI Dietary Analysis
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Run an analysis to compare this plat with the current user profile and
                  dietary preferences.
                </p>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isStartingAnalysis}
                  className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-2xl transition-all"
                >
                  <i className="ph-bold ph-scan text-lg"></i>
                  {isStartingAnalysis ? "Starting analysis..." : "Run analysis"}
                </button>
              </section>
            )}

            {latestRecommendation?.status === "pending" && (
              <section className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-3">
                  AI Dietary Analysis
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  Analysis is running. The page checks automatically every few seconds
                  until the result is ready.
                </p>
              </section>
            )}

            {latestRecommendation?.status === "ready" && (
              <section className="bg-gradient-to-br from-zinc-900 to-black rounded-[2.5rem] p-8 shadow-2xl border border-emerald-500/20">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      AI Dietary Analysis
                    </h2>
                    <p className="text-zinc-400">
                      Latest analysis result for this plat.
                    </p>
                  </div>
                  <div className="bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-black px-4 py-2 rounded-xl uppercase tracking-widest">
                    {latestRecommendation.score}% match
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[10rem_1fr] items-start">
                  <div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-6 text-center">
                    <div className="text-5xl font-black text-white">
                      {latestRecommendation.score}
                      <span className="text-2xl text-emerald-400">%</span>
                    </div>
                    <div className="text-xs uppercase tracking-[0.3em] text-zinc-500 mt-2">
                      score
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      {latestRecommendation.reasoning || "No reasoning returned."}
                    </p>
                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                      Compatibility:
                      <span
                        className={`ml-3 ${
                          latestRecommendation.compatible
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {latestRecommendation.compatible
                          ? "Compatible"
                          : "Needs attention"}
                      </span>
                    </p>
                  </div>
                </div>

                {recommendationWarnings.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {recommendationWarnings.map((warning, index) => (
                      <div
                        key={`${warning}-${index}`}
                        className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5"
                      >
                        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">
                          Warning
                        </h3>
                        <p className="text-sm text-amber-500/80 leading-relaxed">
                          {warning}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {latestRecommendation?.status === "failed" && (
              <section className="bg-zinc-900 border border-red-500/20 rounded-[2.5rem] p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-3">
                  AI Dietary Analysis
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  The last analysis failed. You can try again.
                </p>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 px-6 rounded-2xl transition-all"
                >
                  <i className="ph-bold ph-arrow-clockwise text-lg"></i>
                  Retry analysis
                </button>
              </section>
            )}

            {recommendationQuery.error && (
              <section className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-6">
                <p className="text-red-300">
                  Recommendation data could not be loaded for this plat.
                </p>
              </section>
            )}

            <section className="bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                Ingredient Profile
              </h2>
              <div className="flex flex-wrap gap-3">
                {plat.ingredients?.length ? (
                  plat.ingredients.map((ingredient) => (
                    <span
                      key={ingredient.id}
                      className="px-5 py-2.5 bg-zinc-900 border border-white/5 rounded-full text-zinc-300 text-sm font-medium"
                    >
                      {ingredient.name}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-500">
                    No ingredients listed for this plat yet.
                  </span>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default PlatDetails;
