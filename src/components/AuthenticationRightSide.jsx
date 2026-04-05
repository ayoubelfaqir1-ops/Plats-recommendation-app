const AuthenticationRightSide = () => {
    return (
        <div
            className="hidden lg:flex flex-1 perspective-container items-center justify-center p-8 relative overflow-hidden element-preserve-3d h-screen">

            <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md border-l border-white/5"></div>

            <div
                className="w-full max-w-4xl rotated-ui relative rounded-[2.5rem] bg-zinc-900 border border-white/10 z-10 flex flex-col scale-[0.85] xl:scale-[0.95] 2xl:scale-100 transform origin-center">

                <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-black/20 rounded-t-[2.5rem]">
                    <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
                    <div className="mx-auto text-xs text-zinc-600 font-medium font-mono pl-4">app.rightbite.com</div>
                </div>

                <div className="flex flex-1 p-6 gap-6 h-[480px] overflow-hidden rounded-b-[2.5rem]">

                    <div
                        className="w-64 h-full bg-white/[0.02] rounded-3xl flex flex-col p-5 border border-white/5 space-y-6">

                        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                            <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
                                    className="w-full h-full object-cover"/>
                            </div>
                            <div>
                                <div className="text-white text-sm font-bold">Welcome back,</div>
                                <div className="text-zinc-400 text-xs">Alex Rivera</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div
                                className="h-10 bg-primary-500/10 border border-primary-500/20 rounded-xl flex items-center px-4 gap-3">
                                <div className="w-5 h-5 rounded-md bg-primary-500/80"></div>
                                <div className="h-2 w-24 bg-primary-500/50 rounded flex-1"></div>
                            </div>
                            <div className="h-10 bg-transparent flex items-center px-4 gap-3 opacity-50">
                                <div className="w-5 h-5 rounded-md bg-white/20"></div>
                                <div className="h-2 w-20 bg-white/20 rounded flex-1"></div>
                            </div>
                            <div className="h-10 bg-transparent flex items-center px-4 gap-3 opacity-50">
                                <div className="w-5 h-5 rounded-md bg-white/20"></div>
                                <div className="h-2 w-28 bg-white/20 rounded flex-1"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6">

                        <div className="flex gap-6 h-36">

                            <div
                                className="flex-[3] bg-primary-500 border border-primary-400/50 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,67,20,0.2)] flex flex-col justify-between relative overflow-hidden">
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10">
                                </div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <h4 className="text-white/80 font-bold uppercase tracking-wider text-xs">Vitals</h4>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <i className="ph-bold ph-heartbeat text-white"></i>
                                    </div>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-5xl font-black text-white">100<span
                                            className="text-2xl text-white/70">%</span></div>
                                    <div className="text-white/80 text-xs mt-1">Perfect Nutritional Alignment</div>
                                </div>
                            </div>

                            <div
                                className="flex-[2] bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                                <h4 className="text-zinc-500 font-bold uppercase tracking-wider text-xs">Curations</h4>
                                <div className="text-3xl font-black text-white">128</div>
                                <div className="text-emerald-400 text-xs flex items-center gap-1 font-bold">
                                    <i className="ph-bold ph-trend-up"></i> New this week
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex gap-6">
                            <div className="w-48 h-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover"/>
                            </div>
                            <div className="flex-1 py-2 flex flex-col">
                                <div className="h-6 w-3/4 bg-white/10 rounded-md mb-4"></div>
                                <div className="h-3 w-1/2 bg-white/5 rounded-md mb-2"></div>
                                <div className="h-3 w-5/6 bg-white/5 rounded-md mb-8"></div>
                                <div className="mt-auto flex justify-between items-end">
                                    <div className="h-8 w-24 bg-primary-500/20 rounded-lg"></div>
                                    <div className="h-10 w-32 bg-white/10 rounded-xl"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div
                className="absolute top-[30%] left-[8%] bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl z-20 flex items-center gap-4 animate-float translate-z-20 scale-90 xl:scale-100">
                <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Weekly Spend</div>
                    <div className="text-white font-black text-lg">$145.50</div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                        12% under budget
                    </div>
                </div>

                <div
                    className="w-10 h-10 rounded-full border-[3px] border-emerald-400 flex items-center justify-center border-l-emerald-400/20">
                    <span className="text-[10px] font-bold text-white">88%</span>
                </div>
            </div>

            <div
                className="absolute bottom-[20%] right-[10%] bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl z-20 w-56 animate-float-delayed translate-z-20 scale-90 xl:scale-100">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">AI Analysis</div>
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <i className="ph-bold ph-check text-emerald-400 text-[10px]"></i>
                    </div>
                </div>
                <div className="text-white font-bold text-sm mb-1">Perfect Harmony</div>
                <div className="text-zinc-400 text-[10px] line-clamp-2 leading-relaxed">Cross-referenced against extended
                    allergen history successfully.</div>
            </div>

            <div
                className="absolute top-[20%] right-[25%] w-12 h-12 bg-zinc-800 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-20 flex items-center justify-center animate-float translate-z-10">
                <i className="ph-fill ph-magic-wand text-primary-500 text-lg drop-shadow-[0_0_8px_rgba(255,67,20,0.8)]"></i>
            </div>

            <div
                className="absolute bottom-[35%] left-[5%] w-10 h-10 bg-white/5 border border-white/10 rounded-full p-0 shadow-2xl backdrop-blur-xl z-20 flex items-center justify-center animate-float-delayed translate-z-10 text-zinc-300">
                <i className="ph-fill ph-eye text-base"></i>
            </div>

        </div>
    );
}
export default AuthenticationRightSide;