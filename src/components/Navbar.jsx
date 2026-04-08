import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = ({ search = "", setSearch, showSearch = true }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    let initials = "RB";

    if (user?.name) {
        initials = user.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-b border-white/5 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    <Link to="/home" className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 bg-white/10 border border-white/10 rounded-full backdrop-blur-md flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-white/20 group-hover:scale-105 duration-500 z-10">
                                <i className="ph-fill ph-plant text-xl"></i>
                            </div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary-500 rounded-full border-2 border-zinc-950 shadow-[0_0_15px_rgba(255,67,20,0.6)] z-20 transition-transform group-hover:scale-110"></div>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">Right<span className="text-zinc-500 font-light">Bite</span><span className="text-primary-500">.</span></span>
                    </Link>

                    {showSearch && (
                        <div className="hidden md:flex flex-1 max-w-xl mx-12">
                            <div className="relative w-full group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="ph ph-magnifying-glass text-zinc-500 group-focus-within:text-primary-500 text-xl transition-colors"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search curated dishes..."
                                    className="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-full text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-white/10 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500 shadow-inner backdrop-blur-md transition-all duration-300"
                                    value={search}
                                    onChange={(event) => setSearch?.(event.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-6">
                        <button type="button" className="text-zinc-400 hover:text-white transition-colors p-2 hidden sm:block relative group">
                            <i className="ph ph-bell text-2xl group-hover:scale-110 transition-transform"></i>
                            <div className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(255,67,20,0.8)]"></div>
                        </button>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuOpen((open) => !open)}
                                className="h-10 w-10 rounded-full bg-zinc-800 border-2 border-white/10 shadow-lg overflow-hidden flex items-center justify-center hover:border-white/30 transition-colors text-white font-bold"
                            >
                                {initials}
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-3 w-56 rounded-[1.5rem] border border-white/10 bg-zinc-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
                                    <div className="px-5 py-4 border-b border-white/5">
                                        <p className="text-white font-bold">{user?.name || "Guest"}</p>
                                        <p className="text-zinc-500 text-sm">{user?.email || "No email"}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            to="/profile"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-200 hover:bg-white/5 transition-colors"
                                        >
                                            <i className="ph ph-user-circle text-lg"></i>
                                            Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-300 hover:bg-red-500/10 transition-colors"
                                        >
                                            <i className="ph ph-sign-out text-lg"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
