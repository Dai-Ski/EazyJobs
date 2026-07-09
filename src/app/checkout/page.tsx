"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Lock, ShieldCheck, Check, RefreshCw, CreditCard, ArrowLeft, Sparkles } from "lucide-react";
import { ProfileDropdown } from "@/components/profile/ProfileDropdown";

// Sub-component that reads search parameters
const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, completeZohoPayment, jobs } = useApp();

  const jobId = searchParams.get("jobId");
  const targetJob = jobs.find((j) => j.id === jobId);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Zoho Pay Transaction processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Play success sound/visual delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    // Commit to context
    completeZohoPayment();
    
    // Redirect back
    if (jobId) {
      router.push(`/jobs/${jobId}?payment_success=true`);
    } else {
      router.push("/?payment_success=true");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden relative">
      
      {/* Simulation overlay loaders */}
      {isProcessing && (
        <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-10 h-10 text-zinc-500 animate-spin" />
          <div className="text-center">
            <p className="text-sm font-bold text-zinc-900">Securing Transaction...</p>
            <p className="text-[10px] text-zinc-400 font-body mt-1">Authorizing with Zoho Pay gateway node</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 flex items-center justify-center">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-zinc-900">Payment Authorized!</p>
            <p className="text-xs text-zinc-400 font-body mt-1">Redirecting you back to EasyJobs</p>
          </div>
        </div>
      )}

      {/* Zoho Pay Branding Header */}
      <div className="bg-zinc-900 text-white p-6 flex items-center justify-between">
        <div>
          <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-400">Secure Merchant Checkout</span>
          <h2 className="text-lg font-extrabold tracking-tight flex items-center gap-1.5 mt-0.5">
            ZOHO <span className="text-zinc-400 font-normal">Pay</span>
          </h2>
        </div>
        <ShieldCheck className="w-8 h-8 text-zinc-400 stroke-[1.5]" />
      </div>

      <div className="p-6 space-y-6">
        {/* Order details summary */}
        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-between text-xs font-body">
          <div>
            <p className="font-bold text-zinc-900 font-sans">EasyJobs Premium Plan</p>
            {targetJob && (
              <p className="text-[10px] text-zinc-500 mt-0.5">Applying for: {targetJob.role} at {targetJob.companyName}</p>
            )}
          </div>
          <span className="text-lg font-extrabold text-zinc-900 font-mono">₹29</span>
        </div>

        {/* Payment toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 border border-zinc-200 rounded-lg">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              paymentMethod === "card" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("upi")}
            className={`py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
              paymentMethod === "upi" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            UPI / QR Code
          </button>
        </div>

        {/* Forms */}
        <form onSubmit={handlePay} className="space-y-4">
          {paymentMethod === "card" ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-body">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder={user?.name || "John Doe"}
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-body">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
                  />
                  <CreditCard className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-body">Expiry Date</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900 text-center"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-body">CVV Code</label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900 text-center"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-body">Enter VPA / UPI ID</label>
                <input
                  type="text"
                  required
                  placeholder="username@okaxis"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-zinc-50/50 border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-800/10 focus:border-zinc-500 transition-all font-body text-zinc-900"
                />
              </div>

              <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 flex items-center justify-center flex-col space-y-2">
                <div className="w-32 h-32 bg-white border border-zinc-200 rounded-lg flex items-center justify-center select-none shadow-sm relative">
                  {/* Mock QR graphic */}
                  <div className="w-[100px] h-[100px] bg-[repeating-linear-gradient(45deg,#ccc,#ccc_10px,#fff_10px,#fff_20px)] opacity-55" />
                  <span className="absolute text-[8px] font-bold uppercase tracking-wider text-zinc-400 bg-white px-1.5 py-0.5 rounded shadow-sm">Scan VPA QR</span>
                </div>
                <p className="text-[9px] text-zinc-400 font-body">Scan with Swiggy Pay, PhonePe, or GPay</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="liquid-glass-btn w-full h-11 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer outline-none mt-2"
          >
            Confirm & Pay ₹29
          </button>
        </form>

        {/* Security assurance */}
        <div className="flex items-center gap-2 justify-center text-[10px] text-zinc-400 font-body">
          <Lock className="w-3.5 h-3.5" />
          <span>PCI-DSS Compliant • 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">
      
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
              <span className="text-sm font-extrabold tracking-wider text-zinc-950 font-sans">
                EASY-JOBS
              </span>
            </div>
          </div>

          <ProfileDropdown />
        </div>
      </header>

      {/* Centered Card Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 space-y-4">
        {/* Boxy Back Button with rounded corners */}
        <div className="max-w-md w-full">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-655 hover:text-zinc-955 transition-colors shadow-sm cursor-pointer outline-none w-fit"
            type="button"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span>Back</span>
          </button>
        </div>
        <Suspense fallback={
          <div className="max-w-md w-full bg-white border border-zinc-200 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
            <RefreshCw className="w-8 h-8 text-zinc-500 animate-spin" />
            <p className="text-xs text-zinc-500 mt-3 font-body font-bold">Loading checkout gateway...</p>
          </div>
        }>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
}
