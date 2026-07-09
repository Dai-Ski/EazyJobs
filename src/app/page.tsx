"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { JobFeed } from "@/components/jobs/JobFeed";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { Sparkles, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";

const HomeContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isPaid, isPreferencesConfirmed, preferredRoles } = useApp();
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  useEffect(() => {
    if (searchParams.get("payment_success") === "true" && isPaid) {
      setShowSuccessBanner(true);
      const timer = setTimeout(() => setShowSuccessBanner(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, isPaid]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-zinc-900 font-sans transition-colors duration-200">
      
      {/* 1. Coming Soon Banner */}
      <div className="w-full bg-zinc-900 text-zinc-300 py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-1.5 z-50">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
        <span>One-Click Auto Apply is coming soon. Update your profile settings to prepare.</span>
      </div>

      {/* 2. Global Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md">
        <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
          
          {/* Logo on far left */}
          <div 
            onClick={() => router.push("/")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-extrabold shadow-sm">
              E
            </div>
            <span className="text-sm font-extrabold tracking-wider text-zinc-950 font-sans">
              EASY-JOBS
            </span>
          </div>

          {/* Navigation Controls: Profile button only */}
          <div className="flex items-center gap-2.5">
            <ProfileDropdown />
          </div>

        </div>
      </header>

      {/* 3. Alerts */}
      {showSuccessBanner && (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-800 flex items-start gap-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-zinc-800 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">Premium Access Enabled</h4>
              <p className="text-[11px] text-zinc-500 font-body mt-0.5">
                Zoho Pay payment was verified. Natively compacted applications are now unlocked. Recommended startups will receive priority routing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Recommendation Banner */}
      {isPreferencesConfirmed && (
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-100 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-zinc-600 shrink-0" />
              <p className="text-xs font-semibold text-zinc-800 font-body">
                Job recommendations are active for: <span className="text-zinc-950 font-bold">{preferredRoles.join(", ")}</span>. Matching roles have been highlighted in the feed.
              </p>
            </div>
            <button
              onClick={() => router.push("/settings")}
              className="text-[10px] text-zinc-500 font-bold hover:underline cursor-pointer"
            >
              Modify preferences ➔
            </button>
          </div>
        </div>
      )}

      {/* 5. Main Feed Dashboard */}
      <main className="flex-1 py-8 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <JobFeed />
        </div>
      </main>

      {/* 6. Footer */}
      <footer className="border-t border-zinc-200 py-6 mt-12 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-zinc-400 font-body">
          <span>© 2026 EasyJobs Inc. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
};

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] text-zinc-900 p-6">
        <RefreshCw className="w-8 h-8 text-zinc-400 animate-spin" />
        <p className="text-xs text-zinc-500 mt-3 font-body font-bold">Initializing startup feed...</p>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
