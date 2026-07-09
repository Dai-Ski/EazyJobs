"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp, Job } from "@/context/AppContext";
import { MapPin, IndianRupee, ArrowRight, Sparkles } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();
  const { isPreferencesConfirmed, preferredRoles } = useApp();

  const isRecommended = isPreferencesConfirmed && preferredRoles.some((role) => {
    const lowerRole = role.toLowerCase();
    const jobRole = job.role.toLowerCase();
    
    if (lowerRole.includes("frontend") && jobRole.includes("frontend")) return true;
    if (lowerRole.includes("backend") && jobRole.includes("backend")) return true;
    if (lowerRole.includes("designer") && jobRole.includes("designer")) return true;
    if (lowerRole.includes("ios") && jobRole.includes("ios")) return true;
    if (lowerRole.includes("writer") && jobRole.includes("writer")) return true;
    if (lowerRole.includes("architect") && jobRole.includes("architect")) return true;
    if (lowerRole.includes("fullstack") && (jobRole.includes("frontend") || jobRole.includes("backend"))) return true;
    return false;
  });

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -1 }}
      onClick={handleCardClick}
      className={`p-5 rounded-xl border bg-white hover:shadow-md transition-all duration-200 ease-out flex flex-col justify-between h-full group cursor-pointer relative ${
        isRecommended 
          ? "border-zinc-400 ring-1 ring-zinc-450/15" 
          : "border-zinc-200 hover:border-zinc-300"
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-200 bg-zinc-50/50 group-hover:scale-105 transition-transform"
              dangerouslySetInnerHTML={{ __html: job.companyLogo }}
            />
            <div>
              <h3 className="font-bold text-zinc-900 text-xs">
                {job.companyName}
              </h3>
              <p className="text-[10px] text-zinc-400 font-body">
                {job.type}
              </p>
            </div>
          </div>
          
          {/* Neutral gray recommended badge */}
          {isRecommended ? (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800 text-[9px] font-bold uppercase tracking-wider select-none">
              <Sparkles className="w-2.5 h-2.5 text-zinc-600" />
              Recommended
            </span>
          ) : (
            <span className="text-[9px] font-bold text-zinc-400 font-body uppercase tracking-wider">
              {job.postedDate}
            </span>
          )}
        </div>

        {/* Role */}
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-zinc-950 tracking-tight leading-snug group-hover:text-zinc-600 transition-colors">
            {job.role}
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500 font-body">
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-zinc-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-0.5 font-bold text-zinc-700">
              <IndianRupee className="w-3 h-3 text-zinc-400" />
              {job.salary}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium font-body bg-zinc-50 border border-zinc-200/60 text-zinc-500"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[10px] text-zinc-400 font-body self-center pl-0.5">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="pt-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="liquid-glass-btn-secondary w-full h-8 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer outline-none"
        >
          View Opportunity
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
