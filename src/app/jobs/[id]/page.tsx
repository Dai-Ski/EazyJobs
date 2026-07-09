"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { 
  ArrowLeft, MapPin, IndianRupee, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, ExternalLink, RefreshCw 
} from "lucide-react";

const JobDetailsContent: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { jobs, isPaid, profile } = useApp();
  const [showPaidBanner, setShowPaidBanner] = useState(false);

  const jobId = params.id as string;
  const job = jobs.find((j) => j.id === jobId);

  useEffect(() => {
    if (searchParams.get("payment_success") === "true" && isPaid) {
      setShowPaidBanner(true);
      const timer = setTimeout(() => setShowPaidBanner(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, isPaid]);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] text-zinc-900 p-6 font-sans">
        <h3 className="text-sm font-bold">Job Listing Not Found</h3>
        <p className="text-[11px] text-zinc-400 font-body mt-1">This opportunity may have expired or been removed.</p>
        <button
          onClick={() => router.push("/")}
          className="liquid-glass-btn-secondary h-9 px-4 mt-6 text-xs font-semibold cursor-pointer"
        >
          Return to home feed
        </button>
      </div>
    );
  }

  const handleApplyClick = () => {
    if (isPaid) {
      window.open(job.link, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/checkout?jobId=${job.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 font-sans flex flex-col transition-colors duration-200">
      
      {/* 1. Coming Soon Banner */}
      <div className="w-full bg-zinc-900 text-zinc-300 py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-1.5 z-50">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
        <span>One-Click Auto Apply is coming soon. Update your profile settings to prepare.</span>
      </div>
      
      {/* Top Header */}
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

      {/* Main Workspace */}
      <main className="flex-1 py-8 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Boxy Back Button with rounded corners */}
        <button
          onClick={() => router.push("/")}
          className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-650 hover:text-zinc-950 transition-colors shadow-sm cursor-pointer outline-none w-fit"
          type="button"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
          <span>Back</span>
        </button>
        
        {/* Success Alerts */}
        {showPaidBanner && (
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-805 flex items-start gap-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-zinc-850 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">Transaction complete!</h4>
              <p className="text-[11px] text-zinc-500 font-body mt-0.5">
                Premium Automation active via Zoho Pay. Your optimized resume ({profile.resume ? `${Math.round((1 - profile.resume.compressedSize / profile.resume.originalSize) * 100)}% smaller` : "Basic Profile"}) has been dispatched to {job.companyName}'s system.
              </p>
            </div>
          </div>
        )}

        {/* Job Core Summary Info */}
        <div className="p-6 sm:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center border border-zinc-200 bg-zinc-50/50 flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: job.companyLogo }}
            />
            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-550 uppercase tracking-wider font-body">{job.companyName}</span>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950 leading-snug">{job.role}</h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 font-body pt-1">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-0.5 font-bold text-zinc-700">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {job.salary}
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-500 border border-zinc-200/50">
                  {job.type}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleApplyClick}
            className="liquid-glass-btn h-11 px-6 text-xs font-semibold flex items-center justify-center gap-1.5 self-start md:self-auto shrink-0"
          >
            {isPaid ? (
              <>
                Verify Application
                <ExternalLink className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Apply Now via Zoho Pay
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Split Description Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Main Job details (8/12) */}
          <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Position Overview</h3>
              <p className="text-zinc-700 text-sm leading-relaxed font-body">
                {job.description}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-zinc-600 text-xs font-body leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 flex-shrink-0 mt-2" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications & Requirements */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Qualifications & Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-zinc-600 text-xs font-body leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 flex-shrink-0 mt-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Relevant Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs font-medium font-body"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Sidebar (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-5 sticky top-24">
              
              {isPaid ? (
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Application Natively Queued</h4>
                    <p className="text-zinc-500 text-[11px] font-body mt-1 leading-normal">
                      Your candidate parameters and compressed resume vectors have been registered. Our AI client-hub has dispatched the credentials to the startup hiring managers.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleApplyClick}
                    className="w-full liquid-glass-btn h-9 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer outline-none"
                  >
                    Verify on Portal
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-805 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-zinc-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Zoho Pay Routing Gateway</h4>
                    <p className="text-zinc-500 text-[11px] font-body mt-1 leading-normal">
                      Unlock instant auto-submits, recruiter direct indexing, and vector PDF attachments for this and all other startup positions with Zoho Pay.
                    </p>
                  </div>
                  
                  <div className="text-center py-2 bg-zinc-50 border border-zinc-200/80 rounded-lg">
                    <span className="text-2xl font-extrabold text-zinc-950">₹29</span>
                    <span className="text-[10px] text-zinc-400 font-body ml-1">one-time payment</span>
                  </div>

                  <button
                    onClick={handleApplyClick}
                    className="w-full liquid-glass-btn h-10 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer outline-none"
                  >
                    Apply via Zoho Pay
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Merchant safety */}
              <div className="border-t border-zinc-100 pt-4 space-y-2 text-[10px] text-zinc-400 font-body">
                <div className="flex items-center gap-1.5 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Verified Zoho Merchant</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default function JobDetailPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] text-zinc-900 p-6">
          <RefreshCw className="w-8 h-8 text-zinc-500 animate-spin" />
          <p className="text-xs text-zinc-500 mt-3 font-body">Loading job opportunities...</p>
        </div>
      }>
        <JobDetailsContent />
      </Suspense>
    </div>
  );
}
