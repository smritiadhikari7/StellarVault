import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import {
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  Users,
  ShieldCheck,
  BarChart2,
  Settings,
  Wallet,
  Menu,
  X,
  LogOut,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { userProfile } from "@/lib/mock-data";
import StellarVaultLogo from "@/components/ui/StellarVaultLogo";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { walletAddress, disconnectWallet } = useWallet();
  const [activeGuaranteesCount, setActiveGuaranteesCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync active guarantees count
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkGuarantees = () => {
        const stored = localStorage.getItem("locked_guarantees");
        if (stored) {
          const list = JSON.parse(stored);
          const activeList = list.filter(
            (g: any) => g.status === "Active Loan"
          );
          setActiveGuaranteesCount(activeList.length);
        }
      };
      checkGuarantees();
      window.addEventListener("guarantees_updated", checkGuarantees);
      return () =>
        window.removeEventListener("guarantees_updated", checkGuarantees);
    }
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Borrow", href: "/borrow", icon: CreditCard },
    { name: "Lend Marketplace", href: "/lend", icon: TrendingUp },
    { name: "Social Trust", href: "/social", icon: Users },
    { name: "KYC Verification", href: "/kyc", icon: ShieldCheck },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Admin Panel", href: "/admin", icon: Settings },
  ];

  const truncateWallet = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const displayName = user?.name || userProfile.name;
  const displayWallet = walletAddress || userProfile.walletAddress;

  const handleSignOut = () => {
    disconnectWallet();
    logout();
  };

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Sidebar Header / Logo */}
      <div className="h-16 flex items-center px-4 xl:px-6 border-b border-borderCustom gap-2 overflow-hidden flex-shrink-0">
        <StellarVaultLogo size="md" variant="full" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 space-y-1 px-2 xl:px-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-150 group relative ${
                isActive
                  ? "bg-primary-light text-primary font-bold border-l-4 border-primary shadow-sm"
                  : "text-text-secondary hover:bg-slate-50 hover:text-text-primary font-medium"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive ? "text-primary" : "text-text-secondary group-hover:text-text-primary"
                }`}
              />
              <span className="hidden xl:block text-sm whitespace-nowrap">
                {item.name}
              </span>

              {/* Mobile text inside drawer */}
              <span className="block xl:hidden md:hidden text-sm whitespace-nowrap">
                {item.name}
              </span>

              {/* Tooltip for collapsed desktop sidebar */}
              <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 hidden md:block xl:hidden shadow-lg">
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Active Guarantees Alert Warning */}
      {activeGuaranteesCount > 0 && (
        <div className="mx-2 mb-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 font-semibold leading-snug flex items-start gap-2 overflow-hidden flex-shrink-0">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
          <span className="hidden xl:block">
            {activeGuaranteesCount} active guarantee{activeGuaranteesCount > 1 ? "s" : ""}.
          </span>
          <span className="block xl:hidden md:hidden">
            {activeGuaranteesCount} active guarantee{activeGuaranteesCount > 1 ? "s" : ""}.
          </span>
        </div>
      )}

      {/* Bottom User Area */}
      <div className="p-3 xl:p-4 border-t border-borderCustom bg-slate-50/80 flex items-center justify-between gap-2 overflow-hidden flex-shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary via-indigo-600 to-accent text-white flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 shadow">
            {displayName.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:block min-w-0 flex-1">
            <p className="text-xs font-bold text-text-primary truncate">
              {displayName}
            </p>
            <div className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
              <Wallet className="w-3 h-3 text-text-muted flex-shrink-0" />
              <span className="truncate">{truncateWallet(displayWallet)}</span>
            </div>
          </div>
          {/* Mobile drawer user details */}
          <div className="block xl:hidden md:hidden min-w-0 flex-1">
            <p className="text-xs font-bold text-text-primary truncate">
              {displayName}
            </p>
            <div className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
              <Wallet className="w-3 h-3 text-text-muted flex-shrink-0" />
              <span className="truncate">{truncateWallet(displayWallet)}</span>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          title="Sign Out"
          className="p-2 hover:bg-red-50 hover:text-danger rounded-xl transition-colors text-text-muted flex-shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header (Visible only on mobile screens < md) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-borderCustom z-40 px-4 flex items-center justify-between shadow-sm">
        <StellarVaultLogo size="sm" variant="full" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Dashboard Menu"
          className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-Out Drawer (Visible only when mobileOpen is true on < md) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          {/* Slide-out Panel */}
          <aside className="relative w-4/5 max-w-xs h-full bg-white shadow-2xl flex flex-col z-10 animate-slide-in">
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (Fixed left, visible on md+) */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-borderCustom flex-col z-40 transition-all duration-300 w-16 xl:w-60 shadow-sm">
        {navContent}
      </aside>
    </>
  );
}
