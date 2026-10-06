import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-2xl mb-6 text-primary-400 text-3xl">
                    <i className="ph-fill ph-compass"></i>
                </div>

                <h1 className="text-7xl font-black text-white tracking-tighter mb-2">
                    4<span className="text-primary-500">0</span>4
                </h1>
                <h2 className="text-2xl font-bold text-white mb-3">
                    Page Not Found
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    The dish or curation you are looking for doesn't exist, has been moved, or you took a wrong turn.
                </p>

                <Link
                    to="/home"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-primary-500 hover:bg-primary-400 text-white font-bold transition-all shadow-[0_0_25px_rgba(255,67,20,0.3)] active:scale-95 text-sm"
                >
                    <i className="ph-bold ph-arrow-left"></i>
                    Back to Home Feed
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
