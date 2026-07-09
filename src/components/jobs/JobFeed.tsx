"use client";

import React, { useState, useEffect } from "react";
import { JobCard } from "./JobCard";
import { useApp } from "@/context/AppContext";
import { Search, MapPin, Sparkles, X, CheckSquare, Square, Briefcase } from "lucide-react";

export const JobFeed: React.FC = () => {
  const { jobs, isPreferencesConfirmed, preferredRoles } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const availableCities = [
    "All Cities",
    "Bangalore",
    "Gurgaon",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Remote"
  ];

  const isJobRecommended = (jobRole: string) => {
    if (!isPreferencesConfirmed) return false;
    return preferredRoles.some((role) => {
      const lowerRole = role.toLowerCase();
      const lowerJobRole = jobRole.toLowerCase();
      
      if (lowerRole.includes("frontend") && lowerJobRole.includes("frontend")) return true;
      if (lowerRole.includes("backend") && lowerJobRole.includes("backend")) return true;
      if (lowerRole.includes("designer") && lowerJobRole.includes("designer")) return true;
      if (lowerRole.includes("ios") && lowerJobRole.includes("ios")) return true;
      if (lowerRole.includes("writer") && lowerJobRole.includes("writer")) return true;
      if (lowerRole.includes("architect") && lowerJobRole.includes("architect")) return true;
      if (lowerRole.includes("fullstack") && (lowerJobRole.includes("frontend") || lowerJobRole.includes("backend"))) return true;
      return false;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      const filtered = jobs.filter((job) => {
        const matchesSearch =
          job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCity =
          selectedCity === "All Cities" ||
          (selectedCity === "Remote" && job.location.toLowerCase().includes("remote")) ||
          job.location.toLowerCase().includes(selectedCity.toLowerCase());

        const matchesRecommended = !showOnlyRecommended || isJobRecommended(job.role);

        return matchesSearch && matchesCity && matchesRecommended;
      });

      const sorted = [...filtered].sort((a, b) => {
        const aRec = isJobRecommended(a.role) ? 1 : 0;
        const bRec = isJobRecommended(b.role) ? 1 : 0;
        return bRec - aRec;
      });

      setFilteredJobs(sorted);
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCity, showOnlyRecommended, jobs, preferredRoles, isPreferencesConfirmed]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setShowOnlyRecommended(false);
  };

  return (
    <div className="space-y-5 font-sans">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-950">
            India Startup Opportunities
          </h2>
          <p className="mt-0.5 text-xs text-zinc-400 font-body">
            Search roles across Indian tech hubs. Recommended roles float to the top automatically.
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-zinc-100 border border-zinc-200 text-zinc-800 px-3 py-1 rounded-lg text-xs font-semibold font-body select-none">
          <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
          {filteredJobs.length} roles found
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search roles, companies, or skills (e.g. Go, React, Rust)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border bg-white border-zinc-200 text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 outline-none cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Location Selector */}
        <div className="flex gap-2">
          <div className="relative flex items-center bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-700">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 mr-1.5" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent focus:outline-none pr-6 cursor-pointer text-zinc-900 font-sans"
            >
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city === "All Cities" ? "All Indian Cities" : city}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Recommendation Checkbox */}
          {isPreferencesConfirmed && (
            <button
              onClick={() => setShowOnlyRecommended(!showOnlyRecommended)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold cursor-pointer outline-none transition-all ${
                showOnlyRecommended
                  ? "bg-zinc-50 border-zinc-450 text-zinc-950 shadow-sm"
                  : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {showOnlyRecommended ? (
                <CheckSquare className="w-4 h-4 text-zinc-800 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-zinc-300 shrink-0" />
              )}
              <span>Recommended Only</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="p-5 border border-zinc-200 bg-white h-[180px] rounded-xl flex flex-col justify-between animate-pulse"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-100 rounded-xl" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-14 bg-zinc-100 rounded" />
                      <div className="h-2 w-8 bg-zinc-100 rounded" />
                    </div>
                  </div>
                  <div className="h-2 w-10 bg-zinc-100 rounded" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-4 w-[75%] bg-zinc-100 rounded" />
                  <div className="h-3 w-[40%] bg-zinc-100 rounded" />
                </div>
              </div>
              <div className="h-8 w-full bg-zinc-100 rounded-lg" />
            </div>
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-200 rounded-xl bg-white/40">
          <Briefcase className="mx-auto h-10 w-10 text-zinc-300 mb-3 stroke-[1.5]" />
          <h3 className="text-xs font-bold text-zinc-900">No startup jobs match search</h3>
          <p className="mt-1 text-[11px] text-zinc-400 font-body max-w-xs mx-auto">
            Try adjusting your search keywords, city selections, or disabling recommendation toggles.
          </p>
          <div className="mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-lg text-[10px] shadow-sm transition-all cursor-pointer"
            >
              Clear Search Criteria
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
