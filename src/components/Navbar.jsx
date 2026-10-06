import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ search = "", setSearch, showSearch = true }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    let initials = "RB";
    if (user?.name) {
        initials = user.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-zinc-950/70 backdrop-blur-2xl border-b border-white/5 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Brand Logo */}
                    <Link to="/home" className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative w-11 h-11">
                            <div className="absolute inset-0 bg-white/10 border border-white/10 rounded-full backdrop-blur-md flex items-center justify-center text-white shadow-2xl transition-all group-hover:bg-white/20 group-hover:scale-105 duration-500 z-10">
                                <i className="ph-fill ph-plant text-xl text-primary-400"></i>
                            </div>
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary-500 rounded-full border-2 border-zinc-950 shadow-[0_0_12px_rgba(255,67,20,0.6)] z-20"></div>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            Right<span className="text-zinc-500 font-light">Bite</span>
                            <span className="text-primary-500">.</span>
                        </span>
                    </Link>

                    {/* Search Bar */}
                    {showSearch && (
                        <div className="hidden md:flex flex-1 max-w-lg mx-8">
                            <div className="relative w-full group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="ph ph-magnifying-glass text-zinc-500 group-focus-within:text-primary-500 text-lg transition-colors"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search curated dishes..."
                                    className="block w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:bg-white/10 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500 shadow-inner backdrop-blur-md transition-all duration-300"
                                    value={search}
                                    onChange={(event) => setSearch?.(event.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Right Action Icons & User Dropdown */}
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/recommendations"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white transition-all backdrop-blur-md active:scale-95"
                        >
                            <i className="ph-fill ph-sparkle text-primary-400"></i>
                            <span>Recommendations</span>
                        </Link>

                        {/* User Menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                type="button"
                                onClick={() => setMenuOpen((open) => !open)}
                                className="h-10 w-10 rounded-full bg-zinc-900 border-2 border-white/10 shadow-lg overflow-hidden flex items-center justify-center hover:border-primary-500/50 transition-colors text-white font-bold text-xs cursor-pointer"
                            >
                                {initials}
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-3 w-60 rounded-[1.8rem] border border-white/10 bg-zinc-900/98 backdrop-blur-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-5 py-4 border-b border-white/5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-white font-bold text-sm truncate">{user?.name || "Member"}</p>
                                            {user?.role === "admin" && (
                                                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-zinc-500 text-xs truncate mt-0.5">{user?.email || ""}</p>
                                    </div>

                                    <div className="p-2 space-y-1">
                                        <Link
                                            to="/profile"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-zinc-200 hover:bg-white/5 text-sm transition-colors"
                                        >
                                            <i className="ph ph-user-circle text-lg text-zinc-400"></i>
                                            Profile & Preferences
                                        </Link>

                                        <Link
                                            to="/recommendations"
                                            onClick={() => setMenuOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-zinc-200 hover:bg-white/5 text-sm transition-colors"
                                        >
                                            <i className="ph-fill ph-sparkle text-lg text-primary-400"></i>
                                            My Recommendations
                                        </Link>

                                        {user?.role === "admin" && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setMenuOpen(false)}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-amber-300 hover:bg-amber-500/10 text-sm transition-colors font-semibold"
                                            >
                                                <i className="ph ph-shield-check text-lg text-amber-400"></i>
                                                Admin Dashboard
                                            </Link>
                                        )}

                                        <div className="pt-1 border-t border-white/5">
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-500/10 text-sm transition-colors cursor-pointer"
                                            >
                                                <i className="ph ph-sign-out text-lg"></i>
                                                Sign Out
                                            </button>
                                        </div>
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
