"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings as CogIcon } from "lucide-react";
import { motion } from "framer-motion";

export const ProfileDropdown: React.FC = () => {
  const router = useRouter();
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    // Complete the 360-degree spin animation before transitioning
    setTimeout(() => {
      setIsRotating(false);
      router.push("/settings?category=profile");
    }, 350);
  };

  return (
    <div className="relative font-sans z-40">
      <button
        onClick={handleClick}
        className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-655 hover:text-zinc-955 transition-all shadow-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-zinc-800"
        type="button"
        aria-label="Account settings"
        title="Account settings"
      >
        <motion.div
          animate={{ rotate: isRotating ? 360 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <CogIcon className="w-[18px] h-[18px] stroke-[1.8]" />
        </motion.div>
      </button>
    </div>
  );
};
