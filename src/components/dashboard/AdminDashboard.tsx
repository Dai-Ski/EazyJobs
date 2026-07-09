"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp, User } from "@/context/AppContext";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Briefcase, TrendingUp, FileText, 
  ArrowLeft, CheckCircle2, Eye, EyeOff, LayoutDashboard,
  Settings, ShieldAlert
} from "lucide-react";

// Mock database users showing applications counts
const mockDbUsers: User[] = [
  { name: "Sarah Jenkins", email: "sarah.j@gmail.com", role: "user", joinedDate: "Jul 10, 2026", resumeAttached: true, applicationsCount: 12 },
  { name: "Alex Carter", email: "alex.carter@outlook.com", role: "user", joinedDate: "Jul 11, 2026", resumeAttached: false, applicationsCount: 2 },
  { name: "Marcus Vance", email: "marcus.v@figma.com", role: "user", joinedDate: "Jul 08, 2026", resumeAttached: true, applicationsCount: 24 },
  { name: "Emily Davis", email: "emily.d@vercel.com", role: "user", joinedDate: "Jul 12, 2026", resumeAttached: false, applicationsCount: 0 },
];

export const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { activities, isMasked, setMasked, profile } = useApp();
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    const list = [...mockDbUsers];
    
    if (profile && profile.name !== "John Doe") {
      const activeUserIndex = list.findIndex(u => u.email === profile.email);
      if (activeUserIndex === -1) {
        list.push({
          name: profile.name,
          email: profile.email,
          role: "user",
          joinedDate: "Today",
          resumeAttached: !!profile.resume,
          applicationsCount: profile.resume ? 1 : 0
        });
      }
    }
    setUsersList(list);
  }, [profile]);

  const maskEmail = (email: string) => {
    if (!isMasked) return email;
    const [local, domain] = email.split("@");
    if (!local || !domain) return email;
    const masked = local.length > 2 ? `${local[0]}***${local[local.length - 1]}` : `${local[0]}***`;
    return `${masked}@${domain}`;
  };

  const totalRegistered = usersList.length;
  const resumesUploaded = usersList.filter(u => u.resumeAttached).length;
  const totalAppsCount = usersList.reduce((acc, curr) => acc + (curr.applicationsCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans flex text-zinc-900 transition-colors duration-200">
      
      {/* 1. Left Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col justify-between flex-shrink-0">
        <div className="p-6 space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-extrabold shadow-sm">
              E
            </div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
              IN-SYS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-bold text-xs tracking-wide"
            >
              <LayoutDashboard className="w-4 h-4 text-zinc-700" />
              Overview
            </a>
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-bold text-xs tracking-wide cursor-pointer transition-colors text-left outline-none"
            >
              <Briefcase className="w-4 h-4 text-zinc-400" />
              Job Feed View
            </button>
            <a
              href="#"
              onClick={() => alert("Configure system limits from settings console.")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-bold text-xs tracking-wide transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              Settings
            </a>
          </nav>
        </div>

        {/* User Session profile dropdown */}
        <div className="p-4 border-t border-zinc-200 flex justify-center">
          <ProfileDropdown />
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              System Admin
            </h1>
            <p className="text-zinc-500 text-xs font-body mt-0.5">
              Monitor registered candidates and resume vector compression performance.
            </p>
          </div>
          
          <button
            onClick={() => router.push("/")}
            className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors shadow-sm cursor-pointer outline-none font-semibold"
            aria-label="Back to home page"
            title="Back to Job Feed"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Stat 1: Candidates */}
          <div className="p-5 rounded-xl border border-zinc-200 bg-white shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400 font-body">Total Candidates</span>
              <h3 className="text-2xl font-bold font-mono tracking-tight">{totalRegistered}</h3>
              <p className="text-[10px] text-zinc-400 font-body">Accounts created</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Stat 2: Resumes */}
          <div className="p-5 rounded-xl border border-zinc-200 bg-white shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400 font-body">Resumes Uploaded</span>
              <h3 className="text-2xl font-bold font-mono tracking-tight">{resumesUploaded}</h3>
              <p className="text-[10px] text-zinc-400 font-body">PDF compression active</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          {/* Stat 3: Applications */}
          <div className="p-5 rounded-xl border border-zinc-200 bg-white shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-zinc-400 font-body">Applications Applied</span>
              <h3 className="text-2xl font-bold font-mono tracking-tight">{totalAppsCount}</h3>
              <p className="text-[10px] text-zinc-650 flex items-center gap-0.5 font-body font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                Active submissions sync
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Directory */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-zinc-900 text-sm">
                Candidates Database
              </h3>
              <p className="text-zinc-400 text-xs font-body mt-0.5">
                Review registered profiles and verify resume compression rates.
              </p>
            </div>

            {/* Masking Toggle */}
            <button
              onClick={() => setMasked(!isMasked)}
              className="h-8 px-3 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-zinc-50 text-zinc-600 hover:text-zinc-950 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer outline-none"
            >
              {isMasked ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-zinc-600" />
                  Masking: On (Presentation)
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-zinc-600" />
                  Masking: Off (Sensitive Data)
                </>
              )}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 text-zinc-400 border-b border-zinc-200 font-semibold uppercase tracking-wider font-body">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email Address</th>
                  <th className="px-6 py-3">Joined Date</th>
                  <th className="px-6 py-3">Resume Status</th>
                  <th className="px-6 py-3 text-center">Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-body">
                {usersList.map((usr, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-zinc-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-zinc-900">
                      {usr.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-zinc-600">
                      {maskEmail(usr.email)}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {usr.joinedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        usr.resumeAttached 
                          ? "bg-zinc-100 text-zinc-700" 
                          : "bg-zinc-50 text-zinc-400 border border-zinc-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${usr.resumeAttached ? "bg-zinc-800" : "bg-zinc-300"}`} />
                        {usr.resumeAttached ? "Compacted" : "No Resume"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-zinc-800 font-mono">
                      {usr.applicationsCount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-zinc-50/30 border-t border-zinc-200 flex items-center gap-2 text-[10px] text-zinc-400 font-body leading-normal">
            <ShieldAlert className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>
              <strong>GDPR & Access Rules:</strong> Presentational masking toggles rendering logic. Unmasked email parameters require active secure administrative headers in session.
            </span>
          </div>
        </div>
      </main>

      {/* 3. Right Sidebar: Live Activity Feed */}
      <aside className="w-80 border-l border-zinc-200 bg-white p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div>
              <h3 className="font-semibold text-zinc-900 text-sm">
                System Log Ticker
              </h3>
              <p className="text-zinc-400 text-[10px] font-body">Profile setups & file uploads.</p>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400"></span>
            </span>
          </div>

          {/* Activity Logs */}
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {activities.slice(0, 10).map((act) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, x: 20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="p-3 rounded-lg border border-zinc-100 bg-zinc-50/50 space-y-1.5"
                >
                  <div className="flex justify-between items-center text-[10px] font-body font-bold">
                    <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800">
                      {act.type}
                    </span>
                    <span className="text-zinc-400 font-normal">{act.timestamp}</span>
                  </div>
                  <p className="text-xs font-semibold leading-normal text-zinc-700 font-body">
                    {act.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex items-center justify-between text-[10px] text-zinc-400 font-body">
          <span>Server stream: Active</span>
          <span className="flex items-center gap-1 text-zinc-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Synchronized
          </span>
        </div>
      </aside>

    </div>
  );
};
