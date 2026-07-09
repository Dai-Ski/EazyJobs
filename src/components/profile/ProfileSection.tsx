"use client";

import React, { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { UploadCloud, CheckCircle2, RefreshCw, Trash2, FileText, Sparkles, Plus, X, User } from "lucide-react";

export const ProfileSection: React.FC = () => {
  const { profile, updateProfile, startResumeUpload } = useApp();
  
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [headline, setHeadline] = useState(profile.headline);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>(profile.skills);
  const [isSaved, setIsSaved] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [avatarProgress, setAvatarProgress] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      startResumeUpload(file.name, file.size);
    } else {
      alert("Please upload a PDF document.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        startResumeUpload(file.name, file.size);
      } else {
        alert("Please upload a PDF document.");
      }
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      setAvatarProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setAvatarProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          const reader = new FileReader();
          reader.onload = (event) => {
            updateProfile({ avatar: event.target?.result as string });
            setAvatarProgress(null);
          };
          reader.readAsDataURL(file);
        }
      }, 120);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, headline, skills });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 1;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const getCompressionStageMessage = (progress: number) => {
    if (progress < 25) return "Analyzing PDF fonts & vector maps...";
    if (progress < 50) return "Downsampling high-resolution images...";
    if (progress < 75) return "Compacting metadata and object streams...";
    if (progress < 100) return "Submitting layout optimizations...";
    return "Optimized and saved!";
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold tracking-tight text-zinc-950 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-zinc-700" />
          Candidate Profile
        </h3>
        <p className="text-zinc-500 text-xs font-body mt-0.5">
          Provide your details and upload your resume to show verification metrics.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-5">
        
        {/* Profile Picture Upload Section */}
        <div className="flex items-center gap-4 pb-5 border-b border-zinc-200/60">
          <div className="w-16 h-16 rounded-full border border-zinc-200 bg-zinc-50 flex items-center justify-center overflow-hidden flex-shrink-0 relative select-none">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-7 h-7 text-zinc-400 stroke-[1.8]" />
            )}
            {avatarProgress !== null && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center select-none z-10">
                <span className="text-[10px] font-bold text-zinc-800 font-mono">{avatarProgress}%</span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-body">Profile Picture</h4>
            <p className="text-[9px] text-zinc-400 leading-normal font-body">Simulated compression for pixel map optimization.</p>
            
            <div className="flex items-center gap-2 pt-1.5">
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="liquid-glass-btn-secondary h-7 px-3 text-[10px] font-bold flex items-center gap-1 cursor-pointer outline-none"
              >
                Upload Photo
              </button>
              {profile.avatar && (
                <button
                  type="button"
                  onClick={() => updateProfile({ avatar: null })}
                  className="px-2.5 h-7 border border-zinc-200 hover:border-red-200 rounded-lg text-[10px] text-red-500 hover:bg-red-50/50 font-bold transition-all cursor-pointer outline-none"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Professional Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
          />
        </div>

        {/* Skills Tag input */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Figma, Rust)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              className="flex-1 px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center cursor-pointer outline-none"
            >
              <Plus className="w-4 h-4 text-zinc-650" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium font-body bg-zinc-100 border border-zinc-200 text-zinc-700"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-500 cursor-pointer p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="liquid-glass-btn w-full h-9 text-xs font-semibold cursor-pointer outline-none flex items-center justify-center gap-1.5"
        >
          {isSaved ? "Saved Successfully!" : "Save Profile"}
        </button>
      </form>

      {/* Drag & Drop Resume Area */}
      <div className="space-y-3 pt-6 border-t border-zinc-200">
        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-body">Resume PDF (Auto-Compressor)</label>
        
        {!profile.resume ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragOver
                ? "border-zinc-400 bg-zinc-50"
                : "border-zinc-200 hover:border-zinc-300 bg-zinc-50/50 hover:bg-zinc-50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf"
              className="hidden"
            />
            <UploadCloud className="w-10 h-10 mx-auto text-zinc-400 stroke-[1.5] mb-3" />
            <p className="text-xs font-bold text-zinc-950">Drag & drop your Resume PDF here</p>
            <p className="text-[10px] text-zinc-400 font-body mt-1">or click to browse from explorer</p>
          </div>
        ) : profile.resume.isCompressing ? (
          <div className="p-5 border border-zinc-200 rounded-xl bg-zinc-50/50 space-y-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-zinc-400 animate-spin flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-zinc-950 truncate">{profile.resume.name}</p>
                <p className="text-[10px] text-zinc-400 font-body">Original Size: {formatSize(profile.resume.originalSize)}</p>
              </div>
              <span className="text-xs font-bold text-zinc-800 font-mono">
                {profile.resume.compressionProgress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-800 transition-all duration-200"
                style={{ width: `${profile.resume.compressionProgress}%` }}
              />
            </div>

            <p className="text-[10px] font-semibold text-zinc-500 animate-pulse font-body">
              {getCompressionStageMessage(profile.resume.compressionProgress)}
            </p>
          </div>
        ) : (
          <div className="p-4 border border-zinc-200 rounded-xl bg-zinc-50/30 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-700 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-950 truncate leading-snug">{profile.resume.name}</p>
                  <p className="text-[10px] text-zinc-400 font-body">Vector optimized & compacted</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => updateProfile({ resume: null })}
                className="text-zinc-400 hover:text-red-500 cursor-pointer p-1 transition-colors"
                title="Remove resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Compression Stats */}
            <div className="grid grid-cols-3 gap-2 text-center border-t border-zinc-200/60 pt-4">
              <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/50">
                <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400 font-body">Before</span>
                <span className="text-xs font-bold font-mono text-zinc-650">{formatSize(profile.resume.originalSize)}</span>
              </div>
              <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/50">
                <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400 font-body">After</span>
                <span className="text-xs font-bold font-mono text-zinc-700">{formatSize(profile.resume.compressedSize)}</span>
              </div>
              <div className="bg-zinc-100 p-2.5 rounded-lg border border-zinc-200 text-zinc-800 flex flex-col justify-center">
                <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-400 font-body">Saved</span>
                <span className="text-xs font-bold font-mono">
                  -{Math.round((1 - profile.resume.compressedSize / profile.resume.originalSize) * 100)}%
                </span>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-[10px] text-zinc-700 flex items-center gap-1.5 font-body">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-zinc-500" />
              <span>Resume PDF compressed successfully. Operational for match feeds.</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
