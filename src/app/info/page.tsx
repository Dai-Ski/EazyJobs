"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { 
  ArrowLeft, Shield, Scale, HelpCircle, Heart, Sparkles, Globe, Cpu, Terminal, RefreshCw
} from "lucide-react";

const InfoContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"upcomings" | "legal">("upcomings");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "legal") {
      setActiveTab("legal");
    } else {
      setActiveTab("upcomings");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 font-sans flex flex-col transition-colors duration-200">
      
      {/* 1. Coming Soon Banner */}
      <div className="w-full bg-zinc-900 text-zinc-300 py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-1.5 z-50">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
        <span>One-Click Auto Apply is coming soon. Update your profile settings to prepare.</span>
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo on left */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => router.push("/")}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-extrabold shadow-sm">
                E
              </div>
              <span className="text-sm font-extrabold tracking-wider text-zinc-955 font-sans font-bold">
                EASY-JOBS
              </span>
            </div>
          </div>

          <ProfileDropdown />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-8 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Boxy Back Button with rounded corners */}
        <button
          onClick={() => router.push("/")}
          className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-650 hover:text-zinc-950 transition-colors shadow-sm cursor-pointer outline-none w-fit"
          type="button"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
          <span>Back</span>
        </button>
        
        {/* Navigation Tabs */}
        <div className="border-b border-zinc-200 flex gap-4">
          <button
            onClick={() => setActiveTab("upcomings")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors cursor-pointer outline-none ${
              activeTab === "upcomings" 
                ? "text-zinc-950 border-b-2 border-zinc-900" 
                : "text-zinc-400 hover:text-zinc-650"
            }`}
          >
            The Upcommings
          </button>
          <button
            onClick={() => setActiveTab("legal")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors cursor-pointer outline-none ${
              activeTab === "legal" 
                ? "text-zinc-950 border-b-2 border-zinc-900" 
                : "text-zinc-400 hover:text-zinc-650"
            }`}
          >
            Legal & Backstory
          </button>
        </div>

        {/* Tab Panel Content */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-sm">
          {activeTab === "upcomings" ? (
            /* Upcoming Features Tab */
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h3 className="text-base font-bold tracking-tight text-zinc-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-zinc-600" />
                  The Upcommings
                </h3>
                <p className="text-zinc-500 text-xs font-body mt-0.5">
                  See what is cooking for future system iterations. All systems styled strictly in premium monochrome.
                </p>
              </div>

              <div className="divide-y divide-zinc-200 space-y-6 text-xs text-zinc-600 leading-relaxed font-body">
                {/* Milestone 1 */}
                <div className="flex gap-4 pt-6 first:pt-0">
                  <div className="w-9 h-9 rounded-lg bg-zinc-50 text-zinc-700 flex items-center justify-center flex-shrink-0 border border-zinc-200/50">
                    <Terminal className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-zinc-900 text-xs">ATS Automated Submits</h4>
                      <span className="text-[9px] bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded font-bold uppercase font-sans">Q3 2026</span>
                    </div>
                    <p className="text-zinc-500">
                      Direct client API bindings designed to automatically submit matching parameters to Greenhouse, Lever, and Workday recruitment blocks without page reloads.
                    </p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="flex gap-4 pt-6">
                  <div className="w-9 h-9 rounded-lg bg-zinc-50 text-zinc-700 flex items-center justify-center flex-shrink-0 border border-zinc-200/50">
                    <Globe className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-zinc-900 text-xs">Autofill Browser Extension</h4>
                      <span className="text-[9px] bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded font-bold uppercase font-sans">Q3 2026</span>
                    </div>
                    <p className="text-zinc-500">
                      Synchronize your compressed resume vectors and metadata directly into standard search portal input blocks with our upcoming web companion extension.
                    </p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="flex gap-4 pt-6">
                  <div className="w-9 h-9 rounded-lg bg-zinc-50 text-zinc-700 flex items-center justify-center flex-shrink-0 border border-zinc-200/50">
                    <Cpu className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-zinc-900 text-xs">DeepSeek-R1 Cover Letter Tailoring</h4>
                      <span className="text-[9px] bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded font-bold uppercase font-sans">Q4 2026</span>
                    </div>
                    <p className="text-zinc-500">
                      Generate tailored cover letters optimized dynamically based on job-specific parameters and targeted candidate capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Legal Tab + Backstory */
            <div className="space-y-8 animate-fadeIn">
              {/* Backstory */}
              <div className="space-y-3 bg-zinc-50 p-6 rounded-xl border border-zinc-200/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5 w-fit">
                  <span>Why I Built This</span>
                  <Heart className="w-4 h-4 text-zinc-650" />
                </h3>
                <p className="text-zinc-700 text-xs leading-relaxed font-body">
                  I started EasyJobs because let's be honest: the modern job search has become an exhausting, hands-on chore that leaves candidates feeling raw and completely drained. Submitting resumes manually is a tedious, repetitive motion that sucks the absolute life out of you, leaving you begging for relief. I wanted to build something that handles the friction for you—a service that gets down to business, takes the load off your hands, and performs to completion. We make sure every match hits the spot, leaving both you and the startup fully satisfied.
                </p>
              </div>

              {/* Legal documents */}
              <div className="space-y-6 text-xs text-zinc-600 leading-relaxed font-body pt-2">
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 w-fit uppercase tracking-wider text-[10px]">
                    <span>Privacy Policy</span>
                    <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  </h4>
                  <p>
                    We value your discretion above all else. Your email, phone number, and private logs are strictly between us—actually, they're not even between us, because we don't know them ourselves! All candidate data is fully encrypted at rest. Since we literally have no idea what your personal details are, we couldn't leak them even if we were forced to. If we don't know it, it's completely safe with us. Total confidentiality, no hands-on exposure.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 w-fit uppercase tracking-wider text-[10px]">
                    <span>Terms of Service</span>
                    <Scale className="w-3.5 h-3.5 text-zinc-500" />
                  </h4>
                  <p>
                    We do the hard work so you don't have to. Our system is designed to handle multiple submissions and keep the pipeline flowing smoothly. However, to keep this directory satisfying for everyone, please do not over-stimulate our database or spam target forms. We like to keep things clean, rhythmic, and mutual. Keep your inputs high-quality, and we'll keep delivering the matches.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 w-fit uppercase tracking-wider text-[10px]">
                    <span>Transaction Commitments</span>
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                  </h4>
                  <p className="text-zinc-700 italic">
                    Once you choose to pull the trigger and proceed with checkout, the transaction is final. Because we allocate database bandwidth and initialize optimization routines immediately upon payment, we cannot offer refunds. Once the action starts, there's no turning back—no pulling out mid-way. We appreciate your commitment to the climax of the search.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  );
};

export default function InfoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] text-zinc-900 p-6">
        <RefreshCw className="w-8 h-8 text-zinc-400 animate-spin" />
        <p className="text-xs text-zinc-500 mt-3 font-body font-bold">Loading info sections...</p>
      </div>
    }>
      <InfoContent />
    </Suspense>
  );
}
