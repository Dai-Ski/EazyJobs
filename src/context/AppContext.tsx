"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  joinedDate: string;
  resumeAttached?: boolean;
  compressionRate?: string;
  applicationsCount?: number;
}

export interface Job {
  id: string;
  companyName: string;
  companyLogo: string;
  role: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  skills: string[];
  link: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface ResumeFile {
  name: string;
  originalSize: number;
  compressedSize: number;
  isCompacted: boolean;
  compressionProgress: number;
  isCompressing: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  headline: string;
  skills: string[];
  resume: ResumeFile | null;
  avatar: string | null;
}

export interface Activity {
  id: string;
  text: string;
  timestamp: string;
  type: "profile" | "resume" | "join" | "checkout";
}

interface AppContextType {
  user: User | null;
  isAdmin: boolean;
  isMasked: boolean;
  isPaid: boolean;
  profile: UserProfile;
  activities: Activity[];
  jobs: Job[];
  isParsing: boolean;
  resumeParsingProgress: number;
  preferredRoles: string[];
  isPreferencesConfirmed: boolean;
  login: (email: string, role: "user" | "admin") => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  startResumeUpload: (fileName: string, fileSize: number) => void;
  startResumeParsing: () => void;
  confirmPreferences: (roles: string[]) => void;
  completeZohoPayment: () => void;
  setMasked: (masked: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Vector icons styled for startup credibility
const swiggySvg = `<svg class="w-6 h-6 text-[#FC8019]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.649.5.5 5.649.5 12c0 6.351 5.149 11.5 11.5 11.5s11.5-5.149 11.5-11.5c0-6.351-5.149-11.5-11.5-11.5zm3.766 8.358c-.378.378-1.042.378-1.42 0L12.69 7.202v7.714c0 .534-.434.968-.968.968s-.968-.434-.968-.968V7.202L9.098 8.858c-.378.378-1.042.378-1.42 0a1.004 1.004 0 010-1.42L11.29 3.82c.378-.378 1.042-.378 1.42 0l3.612 3.618a1.004 1.004 0 01.002 1.42z"/></svg>`;
const credSvg = `<svg class="w-5 h-5 text-zinc-950" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.8L18.8 19H5.2L12 6.8z"/></svg>`;
const razorpaySvg = `<svg class="w-5 h-5 text-[#0A2540]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 12L12 1.5 1.5 12H6v8.5c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5V12h4.5zM12 5.5l5.5 5.5H15v7.5H9V11H6.5L12 5.5z"/></svg>`;
const flipkartSvg = `<svg class="w-5 h-5 text-[#2874F0]" viewBox="0 0 24 24" fill="currentColor"><path d="M4.2 3h15.6c.7 0 1.2.5 1.2 1.2v15.6c0 .7-.5 1.2-1.2 1.2H4.2C3.5 21 3 20.5 3 19.8V4.2C3 3.5 3.5 3 4.2 3zm9.3 12.2V7.8l-3.5 3.5 3.5 3.9z"/></svg>`;
const zomatoSvg = `<svg class="w-5 h-5 text-[#CB202D]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
const freshworksSvg = `<svg class="w-5 h-5 text-[#008A52]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.8L18.8 19H5.2L12 6.8z"/></svg>`;
const olaSvg = `<svg class="w-5 h-5 text-[#88FF33]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/></svg>`;
const inmobiSvg = `<svg class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5a3 3 0 113-3 3 3 0 01-3 3z"/></svg>`;

const mockJobs: Job[] = [
  {
    id: "job-1",
    companyName: "Razorpay",
    companyLogo: razorpaySvg,
    role: "Staff Backend Engineer",
    location: "Bangalore, India",
    salary: "₹24L - ₹36L",
    type: "Full-time",
    postedDate: "1D AGO",
    skills: ["Go", "Distributed Systems", "SQL", "gRPC", "API Gateway"],
    link: "https://razorpay.com/jobs",
    description: "Razorpay is building the next generation of online transaction processing for businesses in India. As a Staff Backend Engineer, you will own the database scalability metrics, lead the architecture of transaction routing pipelines, and design secure merchant API endpoints.",
    requirements: [
      "5+ years of production experience in Go, Rust, or Node.js.",
      "Extensive knowledge of transaction databases (PostgreSQL/MySQL) and locking models.",
      "Proven track record scaling high-throughput distributed message lines."
    ],
    responsibilities: [
      "Architect microservice communication protocols.",
      "Optimize ledger balance computation latency to sub-10ms.",
      "Guide junior engineering teammates on distributed concurrency patterns."
    ]
  },
  {
    id: "job-2",
    companyName: "Swiggy",
    companyLogo: swiggySvg,
    role: "Senior Frontend Engineer",
    location: "Bangalore, India",
    salary: "₹20L - ₹28L",
    type: "Full-time",
    postedDate: "2H AGO",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Performance Tuning"],
    link: "https://swiggy.com/careers",
    description: "Swiggy is India's leading on-demand convenience platform. This role sits inside the Instamart Core UI Optimization team. You will focus directly on Core Web Vitals (LCP, INP) to ensure checkout loads instantaneously across all mobile browsers in low-bandwidth regions.",
    requirements: [
      "4+ years building responsive SPAs/MPAs in React and Next.js.",
      "Deep understanding of browser rendering paths and JS engine compilation.",
      "Experience setting up client caching and CDN edge routing."
    ],
    responsibilities: [
      "Optimize client assets bundles, slashing first-load payload sizes by 40%.",
      "Develop responsive and accessible web layouts for customer grocery carts.",
      "Enforce WCAG AA accessibility compliance criteria on interactive fields."
    ]
  },
  {
    id: "job-3",
    companyName: "Cred",
    companyLogo: credSvg,
    role: "Product Designer",
    location: "Bangalore, India",
    salary: "₹18L - ₹25L",
    type: "Full-time",
    postedDate: "3D AGO",
    skills: ["Figma", "UI Design", "Framer Motion", "Design Systems", "Prototyping"],
    link: "https://cred.club/careers",
    description: "Cred is a member-only club rewarding credit-worthy individuals in India. We pride ourselves on creating state-of-the-art visual aesthetics. In this role, you will design visual interfaces, establish clean layouts, and develop micro-interactions that communicate delight.",
    requirements: [
      "3+ years in Product Design, with a solid portfolio of premium desktop/mobile apps.",
      "High proficiency in Figma, design systems, and vector components.",
      "Ability to translate static layouts into interactive prototypes (Framer/ProtoPie)."
    ],
    responsibilities: [
      "Own user journeys for new fintech features from wireframe to release.",
      "Establish typography grids, color palettes, and component design tokens.",
      "Collaborate with developers to ensure final code matches designed animations."
    ]
  },
  {
    id: "job-4",
    companyName: "Zomato",
    companyLogo: zomatoSvg,
    role: "Lead iOS Developer",
    location: "Gurgaon, India",
    salary: "₹22L - ₹30L",
    type: "Full-time",
    postedDate: "4D AGO",
    skills: ["Swift", "SwiftUI", "AppKit", "Core Graphics", "iOS SDK"],
    link: "https://zomato.com/careers",
    description: "Zomato helps millions of food lovers find, order, and review dishes every day. As our Lead iOS Engineer, you will drive swift compilations, build custom CarPlay navigation feeds, and optimize location tracking widgets for delivery agents.",
    requirements: [
      "6+ years writing production Swift/Objective-C.",
      "Deep knowledge of memory profiles, background processing, and core locations.",
      "Shipped multiple high-traffic consumer iOS apps to the App Store."
    ],
    responsibilities: [
      "Refactor cart UI pages into modular SwiftUI components.",
      "Configure concurrent network queues to fetch menus offline.",
      "Oversee app bundle sizes and profile allocations during checkout cycles."
    ]
  },
  {
    id: "job-5",
    companyName: "Flipkart",
    companyLogo: flipkartSvg,
    role: "Systems Architect",
    location: "Bangalore, India (Hybrid)",
    salary: "₹28L - ₹38L",
    type: "Full-time",
    postedDate: "12H AGO",
    skills: ["Rust", "WASM", "WebSockets", "Redis", "NoSQL"],
    link: "https://flipkart.com/careers",
    description: "Flipkart is India's leading e-commerce platform. Join our Realtime Pricing team, scaling socket pipes to sync flash-sale prices to millions of users simultaneously. You will implement memory-efficient vector search pipelines using WebAssembly.",
    requirements: [
      "5+ years writing low-level systems (Rust, C++, or Go).",
      "Experience managing WebSockets hubs syncing 100k+ connections.",
      "Deep familiarity with Redis keyspaces and custom memory layouts."
    ],
    responsibilities: [
      "Build concurrent event loops distributing flash-sale prices.",
      "Compile client-side search modules into WASM for high performance.",
      "Establish metric alerts using Prometheus and Grafana templates."
    ]
  },
  {
    id: "job-6",
    companyName: "InMobi",
    companyLogo: inmobiSvg,
    role: "Technical Writer",
    location: "Hyderabad, India (Hybrid)",
    salary: "₹12L - ₹16L",
    type: "Contract",
    postedDate: "5D AGO",
    skills: ["Technical Writing", "API Documentation", "React", "Node.js"],
    link: "https://inmobi.com/careers",
    description: "InMobi is a global mobile advertising leader. We provide SDKs to millions of mobile publishers. You will write technical manuals, structure developer portal guides, and document setup steps for our core advertising React Native components.",
    requirements: [
      "3+ years documenting complex SDK structures or developer APIs.",
      "Ability to read and explain React/JavaScript codes.",
      "Experience with static documentation generators (Markdown, Docusaurus)."
    ],
    responsibilities: [
      "Draft integration walk-throughs for mobile publishers.",
      "Verify code snippets in documentation libraries before releases.",
      "Work with engineers to write specifications for merchant consoles."
    ]
  },
  {
    id: "job-7",
    companyName: "Freshworks",
    companyLogo: freshworksSvg,
    role: "Developer Advocate",
    location: "Chennai, India",
    salary: "₹15L - ₹20L",
    type: "Full-time",
    postedDate: "1W AGO",
    skills: ["Technical Writing", "Python", "React", "Public Speaking", "Community Relations"],
    link: "https://freshworks.com/careers",
    description: "Freshworks makes business software easy. As our Developer Advocate, you will be the bridge between internal engineering and our global customer community. You will write tutorials, give presentations, and code sandbox integrations.",
    requirements: [
      "2+ years experience in developer relations, advocacy, or technical evangelism.",
      "Solid engineering base in Python, Javascript, or Ruby.",
      "Excellent communication and presentation skills."
    ],
    responsibilities: [
      "Build open-source template widgets using Freshworks API hubs.",
      "Organize community forums, webinars, and hackathons.",
      "Publish engineering blog posts describing new features."
    ]
  },
  {
    id: "job-8",
    companyName: "Ola Electric",
    companyLogo: olaSvg,
    role: "EV UI Architect",
    location: "Pune, India",
    salary: "₹22L - ₹32L",
    type: "Full-time",
    postedDate: "2W AGO",
    skills: ["C++", "OpenGL", "Unity", "Embedded Linux", "UX Architecture"],
    link: "https://ola.com/careers",
    description: "Ola Electric is driving clean mobility across India. Build the digital screens powering our next-generation EVs. You will design, develop, and profile embedded graphic dashboards that display speeds, navigations, and batteries.",
    requirements: [
      "5+ years developing native graphics applications in C++.",
      "Experience optimizing OpenGL or Unity pipelines for hardware targets.",
      "Familiarity with Embedded Linux UI compilers."
    ],
    responsibilities: [
      "Design dashboard layouts displaying speedometer and map directions.",
      "Minimize graphic rendering threads to avoid battery drain.",
      "Implement touch inputs that behave reliably under extreme temperatures."
    ]
  }
];

const initialActivities: Activity[] = [
  { id: "act-1", text: "Sarah Jenkins completed profile setup", timestamp: "5 mins ago", type: "profile" },
  { id: "act-2", text: "Alex Carter joined EasyJobs", timestamp: "12 mins ago", type: "join" },
  { id: "act-3", text: "Sarah Jenkins compressed resume (2.4 MB ➔ 380 KB, -84%)", timestamp: "15 mins ago", type: "resume" },
  { id: "act-4", text: "Marcus Vance joined EasyJobs", timestamp: "30 mins ago", type: "join" },
  { id: "act-5", text: "Marcus Vance compressed resume (3.8 MB ➔ 450 KB, -88%)", timestamp: "40 mins ago", type: "resume" },
];

const defaultProfile: UserProfile = {
  name: "John Doe",
  email: "john@example.com",
  headline: "Frontend Engineer specializing in premium interactive interfaces",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  resume: null,
  avatar: null,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  
  // Simulated parsing states
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [resumeParsingProgress, setResumeParsingProgress] = useState<number>(0);
  const [preferredRoles, setPreferredRoles] = useState<string[]>([]);
  const [isPreferencesConfirmed, setIsPreferencesConfirmed] = useState<boolean>(false);

  // Hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("easyjobs_user");
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedProfile = localStorage.getItem("easyjobs_profile");
      if (storedProfile) setProfile(JSON.parse(storedProfile));

      const storedPaid = localStorage.getItem("easyjobs_isPaid");
      if (storedPaid) setIsPaid(storedPaid === "true");

      const storedRoles = localStorage.getItem("easyjobs_preferredRoles");
      if (storedRoles) setPreferredRoles(JSON.parse(storedRoles));

      const storedConfirmed = localStorage.getItem("easyjobs_isConfirmed");
      if (storedConfirmed) setIsPreferencesConfirmed(storedConfirmed === "true");
    }
  }, []);

  const login = (email: string, role: "user" | "admin") => {
    const defaultName = role === "admin" ? "Aditya Admin" : email.split("@")[0];
    const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
    
    const newUser: User = {
      name: formattedName,
      email,
      role,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      resumeAttached: !!profile.resume,
      compressionRate: profile.resume ? `${Math.round((1 - profile.resume.compressedSize / profile.resume.originalSize) * 100)}%` : undefined,
    };
    
    setUser(newUser);
    localStorage.setItem("easyjobs_user", JSON.stringify(newUser));

    if (role === "user") {
      const updatedProfile = { ...profile, name: formattedName, email };
      setProfile(updatedProfile);
      localStorage.setItem("easyjobs_profile", JSON.stringify(updatedProfile));
    }

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      text: `${formattedName} joined EasyJobs as ${role}`,
      timestamp: "Just now",
      type: "join",
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("easyjobs_user");
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    localStorage.setItem("easyjobs_profile", JSON.stringify(updatedProfile));

    const name = user?.name || updatedProfile.name;
    const newActivity: Activity = {
      id: `act-prof-${Date.now()}`,
      text: `${name} updated profile information`,
      timestamp: "Just now",
      type: "profile",
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const startResumeUpload = (fileName: string, fileSize: number) => {
    const initialResume: ResumeFile = {
      name: fileName,
      originalSize: fileSize,
      compressedSize: 0,
      isCompacted: false,
      compressionProgress: 0,
      isCompressing: true,
    };

    // Reset questionnaire flags on re-upload
    setIsPreferencesConfirmed(false);
    localStorage.removeItem("easyjobs_isConfirmed");

    setProfile((prev) => {
      const updated = { ...prev, resume: initialResume };
      localStorage.setItem("easyjobs_profile", JSON.stringify(updated));
      return updated;
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setProfile((prev) => {
        if (!prev.resume) return prev;
        
        const isFinished = progress >= 100;
        const finalCompressedSize = Math.round(fileSize * 0.14);
        const currentCompressedSize = isFinished ? finalCompressedSize : Math.round(fileSize * (1 - (progress * 0.86) / 100));

        const updatedResume: ResumeFile = {
          ...prev.resume,
          compressionProgress: Math.min(progress, 100),
          isCompressing: !isFinished,
          isCompacted: isFinished,
          compressedSize: currentCompressedSize,
        };

        const updated = { ...prev, resume: updatedResume };
        
        if (isFinished) {
          clearInterval(interval);
          localStorage.setItem("easyjobs_profile", JSON.stringify(updated));
          
          const name = user?.name || prev.name;
          const reductionPercent = Math.round((1 - finalCompressedSize / fileSize) * 100);
          
          const newActivity: Activity = {
            id: `act-res-${Date.now()}`,
            text: `${name} compressed resume (${(fileSize / (1024*1024)).toFixed(1)} MB ➔ ${(finalCompressedSize/1024).toFixed(0)} KB, -${reductionPercent}%)`,
            timestamp: "Just now",
            type: "resume",
          };
          setActivities((prevAct) => [newActivity, ...prevAct]);

          if (user) {
            setUser((prevUser) => prevUser ? { ...prevUser, resumeAttached: true, compressionRate: `${reductionPercent}%` } : null);
          }
          
          // Once compression completes, trigger PDF parsing
          setTimeout(() => {
            startResumeParsing();
          }, 300);
        }
        
        const isCompressing = !isFinished;
        return updated;
      });
    }, 150);
  };

  const startResumeParsing = () => {
    setIsParsing(true);
    setResumeParsingProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setResumeParsingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsParsing(false);
      }
    }, 300);
  };

  const confirmPreferences = (roles: string[]) => {
    setPreferredRoles(roles);
    setIsPreferencesConfirmed(true);
    localStorage.setItem("easyjobs_preferredRoles", JSON.stringify(roles));
    localStorage.setItem("easyjobs_isConfirmed", "true");

    const name = user?.name || profile.name;
    const newActivity: Activity = {
      id: `act-pref-${Date.now()}`,
      text: `${name} confirmed job search preferences for: ${roles.join(", ")}`,
      timestamp: "Just now",
      type: "profile",
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const completeZohoPayment = () => {
    setIsPaid(true);
    localStorage.setItem("easyjobs_isPaid", "true");

    const name = user?.name || profile.name;
    const checkoutActivity: Activity = {
      id: `act-check-${Date.now()}`,
      text: `${name} completed Zoho Pay checkout (₹29)`,
      timestamp: "Just now",
      type: "checkout",
    };
    setActivities((prev) => [checkoutActivity, ...prev]);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin,
        isMasked,
        isPaid,
        profile,
        activities,
        jobs: mockJobs,
        isParsing,
        resumeParsingProgress,
        preferredRoles,
        isPreferencesConfirmed,
        login,
        logout,
        updateProfile,
        startResumeUpload,
        startResumeParsing,
        confirmPreferences,
        completeZohoPayment,
        setMasked: setIsMasked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
