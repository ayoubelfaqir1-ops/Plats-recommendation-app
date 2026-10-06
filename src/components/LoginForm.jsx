import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            await login(email, password);
            navigate("/home");
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                "Invalid email or password. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full lg:w-5/12 xl:w-4/12 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-6 relative z-10 h-screen overflow-y-auto no-scrollbar">
            <Link to="/home" className="flex items-center space-x-3 group cursor-pointer w-fit mb-8">
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-white/10 border border-white/10 rounded-full backdrop-blur-md flex items-center justify-center text-white shadow-xl transition-all group-hover:bg-white/20 group-hover:scale-105 z-10">
                        <i className="ph-fill ph-plant text-lg"></i>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary-500 rounded-full border-[1.5px] border-zinc-950 shadow-[0_0_10px_rgba(255,67,20,0.6)] z-20"></div>
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">
                    Right<span className="text-zinc-500 font-light">Bite</span><span className="text-primary-500">.</span>
                </span>
            </Link>

            <div className="mb-8 lg:mb-10">
                <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tighter mb-3 leading-tight">
                    Welcome<br />back
                </h1>
                <p className="text-zinc-400 text-sm font-light">
                    Access your curated dietary experience.
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                        Primary Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="ph ph-envelope text-zinc-500 text-lg"></i>
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="alex@example.com"
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/5 transition-all shadow-inner backdrop-blur-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-zinc-400">
                            Password
                        </label>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="ph ph-lock-key text-zinc-500 text-lg"></i>
                        </div>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/5 transition-all shadow-inner backdrop-blur-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {errorMessage && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {errorMessage}
                    </div>
                )}

                <div className="flex items-center space-x-2 pt-2">
                    <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 rounded bg-black/20 border-white/10 text-primary-500 focus:ring-primary-500/50 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="remember" className="text-sm text-zinc-400 cursor-pointer select-none">
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-500 hover:bg-primary-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 mt-8 rounded-xl shadow-[0_0_20px_rgba(255,67,20,0.3)] hover:shadow-[0_0_30px_rgba(255,67,20,0.5)] transition-all active:scale-[0.98] uppercase tracking-widest text-sm relative overflow-hidden group"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? "Signing in..." : "Log In"}
                        <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </form>

            <p className="text-left text-zinc-500 text-xs mt-8">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-white hover:text-primary-400 font-bold transition-colors"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
