import React from "react";
import { Link } from "react-router-dom";

interface StellarVaultLogoProps {
  variant?: "icon" | "full" | "horizontal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
  linkTo?: string;
  theme?: "dark" | "light" | "auto";
}

export default function StellarVaultLogo({
  variant = "full",
  size = "md",
  className = "",
  showBadge = true,
  linkTo = "/",
  theme = "auto",
}: StellarVaultLogoProps) {
  // Size dimensions
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const logoIcon = (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 ${iconSizes[size]} transition-transform duration-300 hover:scale-105`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Main Shield Gradient */}
          <linearGradient
            id="svShieldGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Accent Star Gradient */}
          <linearGradient
            id="svStarGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          {/* Glow Effect Filter */}
          <filter id="svGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon Shield Container */}
        <path
          d="M50 5 L88 24 V70 L50 95 L12 70 V24 Z"
          fill="url(#svShieldGrad)"
          rx="6"
        />

        {/* Inner Dark Vault Plate */}
        <path
          d="M50 12 L81 28 V66 L50 88 L19 66 V28 Z"
          fill="#0F172A"
          opacity="0.88"
        />

        {/* Outer Geometric Accent Ring */}
        <path
          d="M50 18 L76 32 V62 L50 80 L24 62 V32 Z"
          stroke="url(#svStarGrad)"
          strokeWidth="2.5"
          strokeDasharray="4 2"
          opacity="0.6"
        />

        {/* Central 4-Point Stellar Star */}
        <path
          d="M50 24 C50 38 38 50 24 50 C38 50 50 62 50 76 C50 62 62 50 76 50 C62 50 50 38 50 24 Z"
          fill="url(#svStarGrad)"
          filter="url(#svGlow)"
        />

        {/* Core Security Node (Vault Eye) */}
        <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="2.5" fill="#2563EB" />
      </svg>
    </div>
  );

  if (variant === "icon") {
    if (linkTo) {
      return (
        <Link
          to={linkTo}
          className={`inline-block ${className}`}
          aria-label="StellarVault Home"
        >
          {logoIcon}
        </Link>
      );
    }
    return <div className={`inline-block ${className}`}>{logoIcon}</div>;
  }

  const textColorClass =
    theme === "dark"
      ? "text-white"
      : theme === "light"
      ? "text-slate-900"
      : "text-text-primary";

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {logoIcon}
      <div className="flex items-baseline">
        <span
          className={`font-sans font-black tracking-tight ${textSizes[size]} ${textColorClass} group-hover:text-primary transition-colors`}
        >
          Stellar<span className="font-extrabold text-primary">Vault</span>
        </span>
        {showBadge && (
          <span className="ml-1 inline-flex items-center justify-center font-mono font-black text-xs text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-accent">
            X
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} aria-label="StellarVault Home">
        {content}
      </Link>
    );
  }

  return content;
}
