import { Link } from "react-router-dom";
import myLogo from "../assets/PLogo.png";
import { useState } from "react";

 
const ADMIN_EMAIL = "prajnaya@gmail.com";
const ADMIN_PASSWORD = "prajnaya321p";

function Signin({ setPage }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!formData.email || !formData.password) {
            setMessage({ type: "error", text: "Please fill in both email and password." });
            return;
        }

        
        if (
            formData.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
            formData.password === ADMIN_PASSWORD
        ) {
            const adminUser = {
                name: "Admin",
                email: ADMIN_EMAIL,
                role: "admin",
            };

            localStorage.setItem("currentUser", JSON.stringify(adminUser));

            setMessage({ type: "success", text: "Admin login successful! Redirecting..." });

            setTimeout(() => {
                setPage("home"); 
            }, 800);
            return;
        }
 
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

     
        const matchedUser = existingUsers.find(
            (u) => u.email.toLowerCase() === formData.email.toLowerCase()
        );

        if (!matchedUser) {
            setMessage({ type: "error", text: "No account found with this email." });
            return;
        }

        if (matchedUser.password !== formData.password) {
            setMessage({ type: "error", text: "Incorrect password. Please try again." });
            return;
        }

 
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));

        setMessage({ type: "success", text: "Login successful! Redirecting..." });

       
        setTimeout(() => {
            setPage("home");
        }, 800);
    };

    return (
        <div className="min-h-screen w-full h-[100vh] flex flex-col lg:flex-row bg-white">

            {/* Left Panel: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 sm:px-16 lg:px-24 py-8 bg-white shadow-xl lg:shadow-none z-10">

                {/* Logo */}
                <div className="flex items-center gap-3 mb-8 lg:mb-0">
                    <img src={myLogo} alt="Prajanya logo" className="h-9 w-9 object-contain" />
                    <span className="flex flex-col leading-none">
                        <h2 className="text-md font-bold tracking-tight text-emerald-900 uppercase">Prajanya</h2>
                        <span className="text-[10px] font-medium text-stone-400 tracking-widest uppercase mt-0.5">Health Cares</span>
                    </span>
                </div>

                {/* Main Form Content Area */}
                <div className="w-full max-w-md mx-auto my-auto py-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-stone-500">
                            Please enter your details to sign in to your account.
                        </p>
                    </div>
 
                    {message.text && (
                        <div
                            className={`mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium border ${
                                message.type === "error"
                                    ? "bg-red-50 border-red-200 text-red-700"
                                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                            }`}
                        >
                            <span className="text-base leading-none">
                                {message.type === "error" ? "⚠️" : "✅"}
                            </span>
                            {message.text}
                        </div>
                    )}

                    {/* Form Fields */}
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-[15px] text-stone-800 placeholder:text-stone-400 bg-stone-50/50 transition duration-200 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1.5">
                                <label htmlFor="password" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                                    Password
                                </label>
                                <a href="#" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-[15px] text-stone-800 placeholder:text-stone-400 bg-stone-50/50 transition duration-200 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 outline-none"
                            />
                        </div>

                        <div className="flex items-start gap-3 mb-6">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600 focus:ring-offset-0 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-xs text-stone-500 leading-normal cursor-pointer select-none">
                                Remember me on this device
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-emerald-800 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-800/20 transition duration-200 hover:bg-emerald-900 hover:shadow-emerald-900/30 active:scale-[0.99]"
                        >
                            Sign In
                        </button>

                        <p className="text-center text-sm text-stone-500 mt-6">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setPage("sign_up")}
                                className="font-bold text-emerald-800 hover:text-emerald-900 transition underline underline-offset-4">
                                Create one
                            </button>
                        </p>
                    </form>
                </div>

                <div className="text-center lg:text-left text-xs text-stone-400 lg:hidden mt-4">
                    © {new Date().getFullYear()} Prajanya Health Cares
                </div>
            </div>

            {/* Right Panel: Brand & Info */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white flex-col justify-between p-16">

                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-700/20 blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-600/10 blur-3xl pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

                <div className="flex items-center gap-3 relative z-10 opacity-90">
                    <img src={myLogo} alt="Prajanya logo" className="h-8 w-8 object-contain brightness-0 invert" />
                    <span className="text-xs font-bold tracking-widest uppercase">Prajanya Inside</span>
                </div>

                <div className="relative z-10 max-w-md my-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/50 text-xs font-medium text-emerald-200 mb-6 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Welcome Back Leader
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight mb-5">
                        Continue Your Wellness Ritual.
                    </h1>
                    <p className="text-emerald-100/70 text-[15px] leading-relaxed font-light">
                        Sign in to track your ongoing wellness progress, consult with your Ayurvedic guides, and reorder your customized health regimes with a single click.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-emerald-800/60">
                        <div>
                            <h4 className="font-semibold text-white text-sm">Secure Portal</h4>
                            <p className="text-xs text-emerald-200/60 mt-0.5">End-to-end encrypted health data.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-sm">Instant Sync</h4>
                            <p className="text-xs text-emerald-200/60 mt-0.5">Real-time updates across tracking devices.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-emerald-200/40 font-medium">
                    © {new Date().getFullYear()} Prajanya Health Cares. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Signin;