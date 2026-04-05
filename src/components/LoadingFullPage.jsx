const LoadingFullPage = () => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 relative z-10 flex flex-col items-center justify-center px-6">

        <div className="relative flex items-center justify-center mb-10">

            <div className="loader-ring absolute"></div>

            <div
                className="relative w-[110px] h-[110px] z-20 bg-zinc-950 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                <i className="ph-fill ph-plant text-[50px] text-white animate-pulse-glow"></i>
                <div
                    className="absolute bottom-3 right-3 w-6 h-6 bg-primary-500 rounded-full border-[2.5px] border-zinc-950 shadow-[0_0_15px_rgba(255,67,20,0.8)]">
                </div>
            </div>
        </div>

        <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter shimmer inline-block">
                Welcome back
            </h2>
            <p
                className="text-zinc-500 font-medium tracking-wide text-sm lg:text-base flex items-center justify-center gap-2">
                <i className="ph-bold ph-user-circle text-primary-500"></i>
                Syncing your dietary profile
                <span className="flex space-x-1 ml-1">
                    <span className="animate-bounce" style={{ animationDelay: "0s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                </span>
            </p>
        </div>

        <div className="w-64 lg:w-72 h-1.5 mt-14 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full shadow-[0_0_10px_rgba(255,67,20,0.5)]"
                style={{ animation: "progress 2s ease-in-out infinite alternate" }}></div>
        </div>

        <div className="text-zinc-600 text-[10px] lg:text-xs mt-6 font-mono font-medium tracking-[0.2em] uppercase">
            Authenticating Session
        </div>

    </div>
    );
}
export default LoadingFullPage;
