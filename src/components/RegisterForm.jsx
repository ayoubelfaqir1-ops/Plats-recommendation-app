const RegisterForm = () => {
    return (
        <div
            class="w-full lg:w-5/12 xl:w-4/12 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-6 relative z-10 h-screen overflow-y-auto no-scrollbar">

            <a href="index.html" class="flex items-center space-x-3 group cursor-pointer w-fit mb-8">
                <div class="relative w-10 h-10">
                    <div
                        class="absolute inset-0 bg-white/10 border border-white/10 rounded-full backdrop-blur-md flex items-center justify-center text-white shadow-xl transition-all group-hover:bg-white/20 group-hover:scale-105 z-10">
                        <i class="ph-fill ph-plant text-lg"></i>
                    </div>
                    <div
                        class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary-500 rounded-full border-[1.5px] border-zinc-950 shadow-[0_0_10px_rgba(255,67,20,0.6)] z-20">
                    </div>
                </div>
                <span class="text-2xl font-black tracking-tighter text-white">Right<span
                    class="text-zinc-500 font-light">Bite</span><span class="text-primary-500">.</span></span>
            </a>

            <div class="mb-6 lg:mb-8">
                <h1 class="text-3xl lg:text-4xl font-black text-white tracking-tighter mb-2 leading-tight">Create
                    your<br />account</h1>
                <p class="text-zinc-400 text-sm font-light">Unlock perfectly curated meals tailored to your dietary DNA.
                </p>
            </div>

            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-zinc-400 mb-1.5">Display Name</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i class="ph ph-user text-zinc-500 text-lg"></i>
                        </div>
                        <input type="text" placeholder="Alex Rivera"
                            class="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/5 transition-all shadow-inner backdrop-blur-sm" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-zinc-400 mb-1.5">Primary Email</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i class="ph ph-envelope text-zinc-500 text-lg"></i>
                        </div>
                        <input type="email" placeholder="alex@example.com"
                            class="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/5 transition-all shadow-inner backdrop-blur-sm" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i class="ph ph-lock-key text-zinc-500 text-lg"></i>
                        </div>
                        <input type="password" placeholder="••••••••"
                            class="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/5 transition-all shadow-inner backdrop-blur-sm" />
                    </div>
                </div>

                <button type="button"
                    class="w-full bg-primary-500 hover:bg-primary-400 text-white font-bold py-3.5 mt-6 rounded-xl shadow-[0_0_20px_rgba(255,67,20,0.3)] hover:shadow-[0_0_30px_rgba(255,67,20,0.5)] transition-all active:scale-[0.98] uppercase tracking-widest text-sm relative overflow-hidden group">
                    <span class="relative z-10 flex items-center justify-center gap-2">
                        Register Now
                        <i class="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </span>
                    <div
                        class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    </div>
                </button>
            </form>

            <p class="text-left text-zinc-500 text-xs mt-6">
                Already have an account? <a href="login.html"
                    class="text-white hover:text-primary-400 font-bold transition-colors">Log in</a>
            </p>
        </div>
    );
}
export default RegisterForm;
