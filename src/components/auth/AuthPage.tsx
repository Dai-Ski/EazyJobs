"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Eye, EyeOff, ShieldCheck, Zap, Layers, RefreshCw } from "lucide-react";

// Form schemas
const loginSchema = zod.object({
  email: zod.string().email({ message: "Please enter a valid email address." }),
  password: zod.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: zod.boolean().optional(),
});

type LoginFormValues = zod.infer<typeof loginSchema>;

export const AuthPage: React.FC = () => {
  const router = useRouter();
  const { login } = useApp();
  const [role, setRole] = useState<"user" | "admin">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    login(data.email, role);

    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#faf9f6] font-sans transition-colors duration-200">
      
      {/* Left Column: Brand Hero Panel */}
      <div className="hidden lg:flex lg:col-span-5 bg-zinc-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute -top-[30%] -right-[30%] w-[80%] h-[80%] rounded-full bg-zinc-700/10 blur-[120px]" />
        
        {/* Header */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-bold">
            E
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            EasyJobs<span className="text-zinc-400 font-normal text-xs ml-1">AI</span>
          </span>
        </div>

        {/* Hero Content */}
        <div className="my-auto z-10 max-w-sm">
          <h1 className="text-white text-3xl font-extrabold font-sans tracking-tight leading-tight mb-5">
            The Startup Career Directory.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-body">
            Create your candidate profile, auto-compress your resume for platform efficiency, and navigate verified tech startups instantly.
          </p>

          {/* Benefit Indicators */}
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold text-xs">Simulated PDF Optimizer</h4>
                <p className="text-zinc-500 text-[11px] font-body mt-0.5">Drag-and-drop resume compactor reduces PDF payload size by up to 90%.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold text-xs">Direct Job Redirections</h4>
                <p className="text-zinc-500 text-[11px] font-body mt-0.5">Apply directly on target career pages (Stripe, Vercel, Figma portfolios).</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-zinc-200 font-bold text-xs">Administrative Logs Sync</h4>
                <p className="text-zinc-500 text-[11px] font-body mt-0.5">Mock analytics synchronizes profiles directly to the system console.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-zinc-500 text-xs font-body z-10 flex justify-between items-center border-t border-zinc-800 pt-4">
          <span>© 2026 EasyJobs Inc.</span>
          <span className="flex items-center gap-1.5 font-semibold text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
            System Live
          </span>
        </div>
      </div>

      {/* Right Column: Auth Panel */}
      <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-16 lg:px-24 py-12 relative">
        <div className="max-w-md w-full mx-auto space-y-6">
          
          {/* Header Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-950 font-sans">
              EasyJobs
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
              Welcome back
            </h2>
            <p className="mt-1 text-xs text-zinc-500 font-body">
              Sign in to manage your resume profile and monitor system metrics.
            </p>
          </div>

          {/* Segmented Controller Role Selector */}
          <div className="p-1 rounded-xl bg-zinc-100 border border-zinc-200 flex relative">
            <button
              onClick={() => {
                setRole("user");
                reset();
              }}
              type="button"
              className={`relative z-10 flex-1 py-1.5 text-xs font-semibold transition-colors duration-200 rounded-lg outline-none cursor-pointer ${
                role === "user" ? "text-zinc-950" : "text-zinc-500"
              }`}
            >
              User Feed
            </button>
            <button
              onClick={() => {
                setRole("admin");
                reset();
              }}
              type="button"
              className={`relative z-10 flex-1 py-1.5 text-xs font-semibold transition-colors duration-200 rounded-lg outline-none cursor-pointer ${
                role === "admin" ? "text-zinc-950" : "text-zinc-500"
              }`}
            >
              Console Admin
            </button>

            {/* Sliding Pill Background */}
            <motion.div
              className="absolute top-1 bottom-1 left-1 rounded-lg bg-white border border-zinc-200 shadow-sm"
              style={{ width: "calc(50% - 4px)" }}
              animate={{ x: role === "user" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-body"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder={role === "admin" ? "admin@easyjobs.com" : "you@example.com"}
                autoComplete="email"
                {...register("email")}
                disabled={isLoading}
                className={`w-full px-3 py-2 rounded-lg border bg-white border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-xs ${
                  errors.email ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 font-body">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-body"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Mock credentials verification. Enter at least 6 characters.")}
                  className="text-[10px] text-zinc-500 font-bold hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  disabled={isLoading}
                  className={`w-full pl-3 pr-9 py-2 rounded-lg border bg-white border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-xs ${
                    errors.password ? "border-red-500 focus:ring-red-500/10 focus:border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500 font-body">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="w-3.5 h-3.5 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-800 focus:ring-offset-0 cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-xs text-zinc-500 font-body select-none cursor-pointer"
              >
                Keep me signed in on this client
              </label>
            </div>

            {/* Liquid Glass Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="liquid-glass-btn w-full h-10 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Validating session credentials...
                </>
              ) : (
                `Sign In as ${role === "admin" ? "Console Admin" : "Candidate"}`
              )}
            </button>
          </form>

          {/* Privacy statement */}
          <div className="border-t border-zinc-200 pt-6">
            <p className="text-[10px] text-zinc-400 leading-normal font-body">
              <strong>Administration Notice:</strong> Candidate account details, optimization logs, and vectors are handled according to privacy guidelines. Secure validations are enforced at the server routing gate.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
