const Footer = () => {
    return (
    <footer className="border-t border-white/5 mt-auto relative z-10 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <div className="flex items-center space-x-3 opacity-50 grayscale">
                    <div className="relative w-8 h-8">
                        <div className="absolute inset-0 bg-zinc-800 rounded-full flex items-center justify-center text-white shadow-md z-10">
                            <i className="ph-fill ph-plant text-xs"></i>
                        </div>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white">Right<span className="text-zinc-500">Bite</span>.</span>
                </div>
                <p className="text-zinc-600 text-sm font-light tracking-wide">© 2026 AI Nutrition Design. Engineered for taste.</p>
                <div className="flex space-x-5">
                    <a href="#" className="text-zinc-600 hover:text-primary-500 transition-colors"><i className="ph-fill ph-twitter-logo text-xl"></i></a>
                    <a href="#" className="text-zinc-600 hover:text-primary-500 transition-colors"><i className="ph-fill ph-instagram-logo text-xl"></i></a>
                </div>
            </div>
        </div>
    </footer>
    );
}
export default Footer;
