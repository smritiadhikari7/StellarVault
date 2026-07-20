import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, X, ChevronRight, LayoutDashboard, CreditCard, TrendingUp, Users } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import WalletConnect from "@/components/ui/WalletConnect";
import StellarVaultLogo from "@/components/ui/StellarVaultLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();
  const { isConnected, walletAddress, disconnectWallet } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isLandingPage = pathname === "/";

  const truncateWallet = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-borderCustom shadow-sm"
            : "bg-white/50 backdrop-blur-sm border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <StellarVaultLogo size="md" variant="full" />

          {/* Desktop Nav Links */}
          {isLandingPage ? (
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                How it works
              </a>
              <Link
                to="/lend"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Lend
              </Link>
              <a
                href="#docs"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Docs
              </a>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/lend"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Lend Marketplace
              </Link>
              <Link
                to="/borrow"
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                Borrow Capital
              </Link>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isConnected && walletAddress ? (
              <div className="flex items-center gap-2">
                {/* Wallet Pill */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 border border-emerald-250 bg-emerald-50 text-success rounded-xl font-mono text-xs font-semibold select-none shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span>{truncateWallet(walletAddress)}</span>
                </div>
                {/* Disconnect button */}
                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="hidden sm:flex p-1.5 border border-slate-200 hover:bg-red-50 hover:text-danger rounded-xl transition-all duration-150 text-text-muted"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-flex px-4 py-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  Go to App
                </Link>
              </div>
            ) : (
              <>
                <div className="hidden sm:block">
                  <WalletConnect
                    showDisconnect={false}
                    className="border-primary text-primary hover:bg-primary-light font-semibold px-4 py-2 text-xs"
                  />
                </div>
                <Link
                  to={isLoggedIn ? "/dashboard" : "/auth/signup"}
                  className="hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all"
                >
                  Launch App
                </Link>
              </>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            {/* Header inside drawer */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <StellarVaultLogo size="sm" variant="full" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">
                Navigation
              </p>

              <Link
                to="/"
                className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-primary" />
                  Dashboard
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/borrow"
                className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Borrow Capital
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/lend"
                className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Lend Marketplace
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/social"
                className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Social Trust
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <div className="w-full">
                <WalletConnect showDisconnect={true} />
              </div>
              <Link
                to={isLoggedIn ? "/dashboard" : "/auth/signup"}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold text-center rounded-xl text-xs uppercase tracking-wider shadow block"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
