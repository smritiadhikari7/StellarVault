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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isLandingPage = pathname === "/";

  const truncateWallet = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const headerClass = isLandingPage
    ? scrolled
      ? "bg-[#080807]/88 backdrop-blur-xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
      : "bg-[#080807]/55 backdrop-blur-md border-b border-white/5"
    : scrolled
      ? "bg-white/90 backdrop-blur-md border-b border-borderCustom shadow-sm"
      : "bg-white/50 backdrop-blur-sm border-b border-slate-100";

  const landingLinkClass = "text-sm font-semibold text-white/62 hover:text-[#ffb46f] transition-colors";
  const appLinkClass = "text-sm font-medium text-text-secondary hover:text-primary transition-colors";

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <StellarVaultLogo size="md" variant="full" theme={isLandingPage ? "dark" : "auto"} />

          {isLandingPage ? (
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className={landingLinkClass}>Features</a>
              <a href="#how-it-works" className={landingLinkClass}>How it works</a>
              <Link to="/lend" className={landingLinkClass}>Pricing</Link>
              <a href="#docs" className={landingLinkClass}>Docs</a>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className={appLinkClass}>Home</Link>
              <Link to="/dashboard" className={appLinkClass}>Dashboard</Link>
              <Link to="/lend" className={appLinkClass}>Lend Marketplace</Link>
              <Link to="/borrow" className={appLinkClass}>Borrow Capital</Link>
            </nav>
          )}

          <div className="flex items-center gap-3">
            {isConnected && walletAddress ? (
              <div className="flex items-center gap-2">
                <div
                  className={
                    "flex items-center gap-1.5 px-3 py-1.5 border font-mono text-xs font-semibold select-none " +
                    (isLandingPage
                      ? "border-[#18c37e]/35 bg-[#18c37e]/10 text-[#8cffce]"
                      : "border-emerald-250 bg-emerald-50 text-success rounded-xl shadow-sm")
                  }
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span>{truncateWallet(walletAddress)}</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className={
                    "hidden sm:flex p-1.5 border transition-all duration-150 " +
                    (isLandingPage
                      ? "border-white/12 text-white/58 hover:border-red-400/45 hover:bg-red-500/10 hover:text-red-200"
                      : "border-slate-200 hover:bg-red-50 hover:text-danger rounded-xl text-text-muted")
                  }
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <Link
                  to="/dashboard"
                  className={
                    "hidden sm:inline-flex px-4 py-2 text-xs font-bold transition-all " +
                    (isLandingPage
                      ? "border border-[#ff7a1a] bg-[#ff7a1a] text-[#160b03] hover:bg-[#ff9346]"
                      : "bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl shadow-sm")
                  }
                >
                  Go to App
                </Link>
              </div>
            ) : (
              <>
                <div className="hidden sm:block">
                  <WalletConnect
                    showDisconnect={false}
                    className={
                      isLandingPage
                        ? "border-white/16 bg-white/5 text-white hover:bg-white/10 font-semibold px-4 py-2 text-xs"
                        : "border-primary text-primary hover:bg-primary-light font-semibold px-4 py-2 text-xs"
                    }
                  />
                </div>
                <Link
                  to={isLoggedIn ? "/dashboard" : "/auth/signup"}
                  className={
                    "hidden sm:inline-flex px-5 py-2.5 text-xs font-bold transition-all " +
                    (isLandingPage
                      ? "border border-[#ff7a1a] bg-[#ff7a1a] text-[#160b03] hover:bg-[#ff9346]"
                      : "bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl shadow-sm hover:shadow")
                  }
                >
                  Launch App
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className={
                "md:hidden p-2 border transition-colors " +
                (isLandingPage
                  ? "border-white/12 text-white hover:bg-white/10"
                  : "rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100")
              }
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col animate-fade-in">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            className={
              "relative ml-auto w-full max-w-xs h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto " +
              (isLandingPage ? "bg-[#080807] text-white border-l border-white/10" : "bg-white")
            }
          >
            <div className={"flex items-center justify-between pb-4 mb-6 border-b " + (isLandingPage ? "border-white/10" : "border-slate-100")}>
              <StellarVaultLogo size="sm" variant="full" theme={isLandingPage ? "dark" : "auto"} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={
                  "p-1.5 border " +
                  (isLandingPage ? "border-white/12 text-white/70 hover:bg-white/10" : "rounded-lg border-slate-200 text-slate-500 hover:bg-slate-100")
                }
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <p className={"text-[11px] font-bold px-3 mb-1 " + (isLandingPage ? "text-white/38" : "text-slate-400")}>Navigation</p>

              {[
                { to: "/", label: "Home", icon: null },
                { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                { to: "/borrow", label: "Borrow Capital", icon: CreditCard },
                { to: "/lend", label: "Lend Marketplace", icon: TrendingUp },
                { to: "/social", label: "Social Trust", icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={
                      "flex items-center justify-between px-3 py-3 text-sm font-semibold transition-colors " +
                      (isLandingPage
                        ? "text-white/72 hover:bg-white/10 hover:text-[#ffb46f]"
                        : "rounded-xl text-slate-700 hover:bg-slate-50 hover:text-primary")
                    }
                  >
                    <span className="flex items-center gap-2">
                      {Icon && <Icon className={"w-4 h-4 " + (isLandingPage ? "text-[#ffb46f]" : "text-primary")} />}
                      {item.label}
                    </span>
                    <ChevronRight className={"w-4 h-4 " + (isLandingPage ? "text-white/35" : "text-slate-400")} />
                  </Link>
                );
              })}
            </div>

            <div className={"pt-6 mt-6 space-y-3 border-t " + (isLandingPage ? "border-white/10" : "border-slate-100")}>
              <div className="w-full">
                <WalletConnect showDisconnect={true} />
              </div>
              <Link
                to={isLoggedIn ? "/dashboard" : "/auth/signup"}
                className={
                  "w-full py-3 font-bold text-center text-xs block " +
                  (isLandingPage
                    ? "border border-[#ff7a1a] bg-[#ff7a1a] text-[#160b03]"
                    : "bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow")
                }
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