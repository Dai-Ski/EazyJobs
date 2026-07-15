"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { 
  ArrowLeft, User as UserIcon, Bell, Eye, HelpCircle, FileText, 
  Scale, LogOut, Lock, Phone, RefreshCw, Heart, Shield, Sparkles, Globe, Terminal, Cpu
} from "lucide-react";

type SettingsCategory = 
  | "profile" 
  | "security" 
  | "notifications" 
  | "upcomings"
  | "help" 
  | "legal";

const SettingsContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isPaid, logout } = useApp();

  const [activeCategory, setActiveCategory] = useState<SettingsCategory>("profile");
  
  // Security panel states
  const [phone, setPhone] = useState("+91 98765 43210");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [isPassSaved, setIsPassSaved] = useState(false);
  const [isHibernated, setIsHibernated] = useState(false);

  // Notifications panel states
  const [notifyStartups, setNotifyStartups] = useState(true);
  const [notifyAts, setNotifyAts] = useState(true);
  const [notifySalaries, setNotifySalaries] = useState(false);
  const [notifyUpdates, setNotifyUpdates] = useState(true);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      if (categoryParam === "profile") setActiveCategory("profile");
      else if (categoryParam === "security") setActiveCategory("security");
      else if (categoryParam === "notifications") setActiveCategory("notifications");
      else if (categoryParam === "upcomings") setActiveCategory("upcomings");
      else if (categoryParam === "help") setActiveCategory("help");
      else if (categoryParam === "legal") setActiveCategory("legal");
    }
  }, [searchParams]);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass || !confirmPass) {
      alert("Please fill all password fields.");
      return;
    }
    if (newPass !== confirmPass) {
      alert("New passwords do not match.");
      return;
    }
    setIsPassSaved(true);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => setIsPassSaved(false), 2000);
  };

  const handleHibernate = () => {
    setIsHibernated(!isHibernated);
    alert(isHibernated ? "Account activated. Startup matching is active." : "Account hibernated. You will not appear in startup directories.");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to permanently delete your EZJobs account? This action is irreversible and deletes all optimized resumes.")) {
      logout();
      router.push("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 font-sans flex flex-col transition-colors duration-200">
      
      {/* 1. Coming Soon Banner */}
      <div className="w-full bg-zinc-900 text-zinc-300 py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-1.5 z-50">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
        <span>One-Click Auto Apply is coming soon. Update your profile settings to prepare.</span>
      </div>
      
      {/* Top Header - Enforced Static Coordinates */}
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
                EZ-JOBS
              </span>
            </div>
          </div>
          
          {/* Profile Dropdown trigger on far right */}
          <ProfileDropdown />
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="flex-1 py-8 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Boxy Back Button with rounded corners */}
        <button
          onClick={() => router.push("/")}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-650 hover:text-zinc-950 transition-colors shadow-sm cursor-pointer outline-none w-fit"
          type="button"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Links (4/12) */}
          <aside className="md:col-span-4 bg-white border border-zinc-200 rounded-xl p-3 shadow-sm space-y-4">
            
            {/* Account Group */}
            <div>
              <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 px-3 pt-2">Account</p>
              <div className="space-y-0.5 mt-2">
                <button
                  onClick={() => setActiveCategory("profile")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer outline-none ${
                    activeCategory === "profile" 
                      ? "bg-zinc-100 text-zinc-950 font-bold border-l-2 border-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <UserIcon className="w-4 h-4 text-zinc-450 shrink-0" />
                  Profile
                </button>

                <button
                  onClick={() => setActiveCategory("security")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer outline-none ${
                    activeCategory === "security" 
                      ? "bg-zinc-100 text-zinc-950 font-bold border-l-2 border-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <Lock className="w-4 h-4 text-zinc-450 shrink-0" />
                  Security
                </button>

                <button
                  onClick={() => setActiveCategory("notifications")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer outline-none ${
                    activeCategory === "notifications" 
                      ? "bg-zinc-100 text-zinc-950 font-bold border-l-2 border-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <Bell className="w-4 h-4 text-zinc-450 shrink-0" />
                  Notifications
                </button>
              </div>
            </div>

            {/* Upcoming Group */}
            <div className="border-t border-zinc-100 pt-3">
              <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 px-3">The Upcommings</p>
              <div className="space-y-0.5 mt-2">
                <button
                  onClick={() => setActiveCategory("upcomings")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer outline-none ${
                    activeCategory === "upcomings" 
                      ? "bg-zinc-100 text-zinc-950 font-bold border-l-2 border-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-zinc-450 shrink-0" />
                  The Upcommings
                </button>
              </div>
            </div>

            {/* Info & Policy Group */}
            <div className="border-t border-zinc-100 pt-3">
              <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 px-3">Information & Policy</p>
              <div className="space-y-0.5 mt-2">
                <button
                  onClick={() => setActiveCategory("help")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer outline-none ${
                    activeCategory === "help" 
                      ? "bg-zinc-100 text-zinc-950 font-bold border-l-2 border-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-zinc-450 shrink-0" />
                  Help Center
                </button>

                <button
                  onClick={() => setActiveCategory("legal")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer outline-none ${
                    activeCategory === "legal" 
                      ? "bg-zinc-100 text-zinc-950 font-bold border-l-2 border-zinc-900" 
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <Scale className="w-4 h-4 text-zinc-450 shrink-0" />
                  Legal Stuff
                </button>

                <button
                  onClick={() => {
                    logout();
                    router.push("/auth");
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 text-red-650 hover:bg-red-50/50 transition-colors cursor-pointer outline-none border-t border-zinc-100 mt-1"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content Panel (8/12) */}
          <div className="md:col-span-8 space-y-6">
            
            {activeCategory === "profile" && (
              /* Profile Tab */
              <div className="space-y-6 animate-fadeIn">
                <ProfileSection />

                {/* Subscription preferences */}
                <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 font-body">Account Plan & Subscription</h3>
                  {isPaid ? (
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs font-body">
                      <div>
                        <p className="font-bold text-zinc-955">EZJobs Premium Plan</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">₹29 one-time payment activated via Zoho Pay.</p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-zinc-900 text-white text-[9px] font-bold uppercase select-none tracking-wider">Plan Active</span>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs font-body">
                      <div>
                        <p className="font-bold text-zinc-900">Standard Tier (Free)</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Application submittals require dynamic pay-to-route gateways.</p>
                      </div>
                      <button
                        onClick={() => router.push("/")}
                        className="liquid-glass-btn h-8 px-4 text-[10px] font-bold"
                      >
                        Upgrade Plan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCategory === "security" && (
              /* Security Tab */
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-zinc-950">Security</h3>
                  <p className="text-zinc-500 text-xs font-body mt-0.5">Configure recovery options, passwords, and account status controls.</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Primary Email</label>
                    <input
                      type="email"
                      readOnly
                      value={user?.email || "candidate@example.com"}
                      className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50 text-zinc-500 border-zinc-200 focus:outline-none select-none font-body"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Verification Phone</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
                      />
                      <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <form onSubmit={handlePasswordUpdate} className="space-y-4 pt-4 border-t border-zinc-100">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Update Password</h4>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 font-body">Current Password</label>
                      <input
                        type="password"
                        required
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-400 font-body">New Password</label>
                        <input
                          type="password"
                          required
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-400 font-body">Confirm New Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="liquid-glass-btn-secondary w-full h-8 text-[11px] font-bold"
                    >
                      {isPassSaved ? "Saved Successfully!" : "Update Credentials"}
                    </button>
                  </form>

                  {/* 2FA */}
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-zinc-100">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Two-Factor Authentication</h4>
                      <p className="text-[10px] text-zinc-400 leading-normal font-body mt-0.5">Secure candidate session setups with secondary mobile OTP tokens.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`h-7 px-3.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer outline-none ${
                        twoFactor 
                          ? "bg-zinc-900 border-zinc-950 text-white" 
                          : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50"
                      }`}
                    >
                      {twoFactor ? "Disable" : "Enable"}
                    </button>
                  </div>

                  {/* Account Status Preferences */}
                  <div className="border-t border-zinc-100 pt-6 space-y-5">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Account Controls</h4>
                    
                    {/* Hibernate */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">Hibernate Account</h4>
                        <p className="text-[10px] text-zinc-400 leading-normal font-body mt-0.5">Temporarily remove your profile vectors from India startup matches feeds.</p>
                      </div>
                      <button
                        onClick={handleHibernate}
                        className={`h-7 px-3.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer outline-none ${
                          isHibernated 
                            ? "bg-zinc-900 border-zinc-950 text-white" 
                            : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50"
                        }`}
                      >
                        {isHibernated ? "Re-activate" : "Hibernate"}
                      </button>
                    </div>

                    {/* Delete */}
                    <div className="border-t border-zinc-100 pt-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-red-650">Delete Account</h4>
                        <p className="text-[10px] text-zinc-450 leading-normal font-body mt-0.5">Permanently remove your candidate credentials, compressed files, and metadata tags.</p>
                      </div>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-3.5 h-7 border border-red-200 hover:border-red-350 rounded-lg text-[10px] text-red-500 hover:bg-red-50/50 font-bold transition-all cursor-pointer outline-none"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeCategory === "notifications" && (
              /* Notifications Tab */
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-zinc-950">Notifications</h3>
                  <p className="text-zinc-500 text-xs font-body mt-0.5">Manage alert digests and push telemetry reports.</p>
                </div>

                <div className="space-y-6 font-body text-xs">
                  {/* Job Search alerts */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[10px]">Searching for a Job</h4>
                    
                    <div className="space-y-2.5">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyStartups}
                          onChange={(e) => setNotifyStartups(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-800 mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-zinc-900 block leading-tight">Weekly Startup Summaries</span>
                          <span className="text-[10px] text-zinc-450 mt-0.5 block">Email reports on matching Indian startups matching your preferences checklist.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyAts}
                          onChange={(e) => setNotifyAts(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-800 mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-zinc-900 block leading-tight">Direct ATS Submission Logs</span>
                          <span className="text-[10px] text-zinc-450 mt-0.5 block">Push alerts verifying direct vector delivery inside client systems.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* News alerts */}
                  <div className="space-y-3 pt-4 border-t border-zinc-100">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[10px]">News & Reports</h4>
                    
                    <div className="space-y-2.5">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifySalaries}
                          onChange={(e) => setNotifySalaries(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-800 mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-zinc-900 block leading-tight">Salary & Recruitment Trends</span>
                          <span className="text-[10px] text-zinc-450 mt-0.5 block">Monthly analysis on startup index salaries and ATS volume shifts.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifyUpdates}
                          onChange={(e) => setNotifyUpdates(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-800 mt-0.5"
                        />
                        <div>
                          <span className="font-semibold text-zinc-900 block leading-tight">Product Roadmap Announcements</span>
                          <span className="text-[10px] text-zinc-450 mt-0.5 block">Alerts detailing new Chrome extension syncs and cover letter model integrations.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "upcomings" && (
              /* Upcoming Features Tab */
              <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-zinc-950 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-zinc-700" />
                    The Upcommings
                  </h3>
                  <p className="text-zinc-500 text-xs font-body mt-0.5">
                    See what is cooking for future system iterations. All systems styled strictly in premium monochrome.
                  </p>
                </div>

                <div className="divide-y divide-zinc-200 space-y-6 text-xs text-zinc-650 leading-relaxed font-body">
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
            )}

            {activeCategory === "help" && (
              /* Help Center Tab */
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-zinc-950">Help Center</h3>
                  <p className="text-zinc-500 text-xs font-body mt-0.5">Detailed system parameters, operations logs, and merchant checkouts support.</p>
                </div>
                
                <div className="text-xs text-zinc-650 leading-relaxed font-body space-y-4">
                  <div className="space-y-2 border-l-2 border-zinc-200 pl-4 py-1">
                    <h4 className="font-bold text-zinc-900">How do I verify candidate matches?</h4>
                    <p>
                      EZJobs scans target resume vectors dynamically. You must drag and drop your resume in the Profile pane. Our platform automatically downsamples files inside the sandbox cache to extract keywords. Once confirmed, listings in the feed displaying your roles will badge matched status automatically.
                    </p>
                  </div>

                  <div className="space-y-2 border-l-2 border-zinc-200 pl-4 py-1">
                    <h4 className="font-bold text-zinc-900">Zoho Pay Merchant Operations</h4>
                    <p>
                      Merchant checkouts are secured via PCI-DSS compliant Zoho Pay routing gateways. Unlocking premium auto-submits is processed instantly. If you experience network timeouts at merchant checkpoints, credentials will auto-sync on retry.
                    </p>
                  </div>

                  <div className="space-y-2 border-l-2 border-zinc-200 pl-4 py-1">
                    <h4 className="font-bold text-zinc-900">Is account hibernation reversible?</h4>
                    <p>
                      Yes. Hibernating temporarily filters your vectors from active searches. You can re-activate matches at any point from the Security panel with one click.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-zinc-100 bg-zinc-50 p-6 rounded-xl space-y-4">
                    <div>
                      <p className="font-bold text-zinc-900">Need direct human support?</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Submit your query below, and our operations team will reach out directly.</p>
                    </div>
                    
                    <form 
                      action="https://api.web3forms.com/submit" 
                      method="POST" 
                      className="space-y-3.5 text-left"
                    >
                      <input type="hidden" name="access_key" value="a296f968-7472-42b2-995a-a404f870bbd3" />
                      <input type="hidden" name="subject" value="New Support Query from EZJobs Dashboard" />
                      <input type="hidden" name="from_name" value="EZJobs Client Support" />

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block font-sans">
                          Your Email Address
                        </label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          placeholder="you@example.com" 
                          className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder-zinc-450 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all text-xs font-body"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 block font-sans">
                          Message
                        </label>
                        <textarea 
                          name="message" 
                          required 
                          rows={3}
                          placeholder="How can we help you? Describe your issue in detail..." 
                          className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder-zinc-455 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all text-xs font-body resize-none"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="liquid-glass-btn w-full h-9 text-xs font-semibold flex items-center justify-center cursor-pointer text-white transition-all shadow-sm outline-none"
                      >
                        Submit Query
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "legal" && (
              /* Legal Stuff Tab */
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-8 animate-fadeIn">
                
                {/* 1. Backstory */}
                <div className="space-y-3 bg-zinc-50 p-6 rounded-xl border border-zinc-200/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5 w-fit">
                    <span>Why I Built This</span>
                    <Heart className="w-4 h-4 text-zinc-650" />
                  </h4>
                  <p className="text-zinc-700 text-xs leading-relaxed font-body">
                    I started EZJobs because let's be honest: candidates deserve to feel the thrill of a real buzz—that sweet, vibrating ring on your phone when a recruiter buzzes you with an immediate job offer acceptance. The manual job search is an exhausting, hands-on chore that leaves you completely drained, waiting for that phone to wake up. I wanted to build something that speeds up the connection, taking the friction off your hands so you get buzzed faster. We handle the placement details to completion, making sure every match hits the spot and rings in your next career step.
                  </p>
                </div>

                {/* 2. Merged Community Policies */}
                <div className="space-y-3 font-body text-xs text-zinc-655">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 w-fit uppercase tracking-wider text-[10px]">
                    <span>Community Policies</span>
                    <Scale className="w-3.5 h-3.5 text-zinc-500" />
                  </h4>
                  <p className="leading-relaxed">
                    We do the hard work so you don't have to. Our system is designed to handle multiple submissions and keep the pipeline flowing smoothly. However, to keep this directory satisfying for everyone, please do not over-stimulate our database or spam target forms. We like to keep things clean, rhythmic, and mutual. Keep your inputs high-quality, and we'll keep delivering the matches.
                  </p>
                </div>

                {/* 3. Merged Privacy Policy */}
                <div className="space-y-3 font-body text-xs text-zinc-655 border-t border-zinc-150 pt-6">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 w-fit uppercase tracking-wider text-[10px]">
                    <span>Privacy Policy</span>
                    <Shield className="w-3.5 h-3.5 text-zinc-500" />
                  </h4>
                  <p className="leading-relaxed">
                    We value your discretion above all else. Your email, phone number, and private logs are strictly between us—actually, they're not even between us, because we don't know them ourselves! All candidate data is fully encrypted at rest. Since we literally have no idea what your personal details are, we couldn't leak them even if we were forced to. If we don't know it, it's completely safe with us. Total confidentiality, no hands-on exposure.
                  </p>
                </div>

                {/* 4. Zoho pay transaction refund disclosure */}
                <div className="space-y-3 font-body text-xs text-zinc-655 border-t border-zinc-150 pt-6">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 w-fit uppercase tracking-wider text-[10px]">
                    <span>Transaction Commitments</span>
                    <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
                  </h4>
                  <p className="leading-relaxed italic">
                    Once you choose to pull the trigger and proceed with checkout, the transaction is final. Because we allocate database bandwidth and initialize optimization routines immediately upon payment, we cannot offer refunds. Once the action starts, there's no turning back—no pulling out mid-way. We appreciate your commitment to the climax of the search.
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] text-zinc-900 p-6">
          <RefreshCw className="w-8 h-8 text-zinc-400 animate-spin" />
          <p className="text-xs text-zinc-500 mt-3 font-body font-bold font-sans">Loading settings dashboard...</p>
        </div>
      }>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
