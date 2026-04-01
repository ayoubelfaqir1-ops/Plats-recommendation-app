const Navbar = () => {
    return (
        <nav class="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-b border-white/5 transition-all">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-24">
                    <div class="flex items-center space-x-3 group cursor-pointer">
                        <div class="relative w-12 h-12">
                            <div class="absolute inset-0 bg-white/10 border border-white/10 rounded-full backdrop-blur-md flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-white/20 group-hover:scale-105 duration-500 z-10">
                                <i class="ph-fill ph-plant text-xl"></i>
                            </div>
                            <div class="absolute bottom-0 right-0 w-4 h-4 bg-primary-500 rounded-full border-2 border-zinc-950 shadow-[0_0_15px_rgba(255,67,20,0.6)] z-20 transition-transform group-hover:scale-110"></div>
                        </div>
                        <span class="text-2xl font-black tracking-tighter text-white">Right<span class="text-zinc-500 font-light">Bite</span><span class="text-primary-500">.</span></span>
                    </div>

                    <div class="hidden md:flex flex-1 max-w-xl mx-12">
                        <div class="relative w-full group">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i class="ph ph-magnifying-glass text-zinc-500 group-focus-within:text-primary-500 text-xl transition-colors"></i>
                            </div>
                            <input type="text" placeholder="Search curated dishes..." class="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-full text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-white/10 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500 shadow-inner backdrop-blur-md transition-all duration-300" />
                        </div>
                    </div>

                    <div class="flex items-center space-x-6">
                        <button class="text-zinc-400 hover:text-white transition-colors p-2 hidden sm:block relative group">
                            <i class="ph ph-bell text-2xl group-hover:scale-110 transition-transform"></i>
                            <div class="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(255,67,20,0.8)]"></div>
                        </button>
                        <div class="h-10 w-10 rounded-full bg-zinc-800 border-2 border-white/10 shadow-lg overflow-hidden flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="User" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;