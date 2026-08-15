"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  Calculator,
  Check,
  ChevronRight,
  CreditCard,
  DollarSign,
  Layers,
  LockKeyhole,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";

const stats = [
  { label: "Credit disbursed", key: "disbursed" },
  { label: "Verified borrowers", key: "borrowers" },
  { label: "Repayment rate", key: "repayment" },
  { label: "Default rate", key: "defaultRate" },
] as const;

const featureRows = [
  {
    icon: BarChart3,
    title: "Risk intelligence",
    text: "Wallet age, payment velocity, repayment history, and social trust are scored in one live credit profile.",
  },
  {
    icon: Bell,
    title: "Instant alerts",
    text: "Borrowers and lenders see covenant changes, due windows, and score movement before risk becomes expensive.",
  },
  {
    icon: LockKeyhole,
    title: "ZK identity",
    text: "Verification signals raise limits without exposing private documents or forcing collateral into escrow.",
  },
];

const trustSignals = [
  { label: "On-chain history", value: 92, color: "bg-[#ff7a1a]" },
  { label: "Repayment behavior", value: 88, color: "bg-[#18c37e]" },
  { label: "Social endorsements", value: 94, color: "bg-[#58c7ff]" },
  { label: "ZK verification", value: 80, color: "bg-[#f8d66d]" },
  { label: "AI prediction", value: 91, color: "bg-white" },
];

const steps = [
  {
    icon: Wallet,
    number: "01",
    title: "Connect reputation",
    text: "Link a Stellar wallet and verified social signals so StellarVault can read creditworthiness without asking for collateral.",
  },
  {
    icon: DollarSign,
    number: "02",
    title: "Request capital",
    text: "Choose a loan size, duration, and repayment profile. The risk engine prices the request against your live score.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Repay and level up",
    text: "Automated repayment events feed back into the score, increasing future limits and improving rates over time.",
  },
];

const tiers = [
  {
    name: "Starter",
    label: "Tier 1",
    amount: "$500 - $2,000",
    score: "500+",
    kyc: "Basic signals",
    rate: "10% APY",
    action: "Get started",
    featured: false,
  },
  {
    name: "Growth",
    label: "Most used",
    amount: "$5,000 - $20,000",
    score: "650+",
    kyc: "Level 2 verified",
    rate: "14.2% APY",
    action: "Apply for growth",
    featured: true,
  },
  {
    name: "Premium",
    label: "Tier 3",
    amount: "$20,000+",
    score: "800+",
    kyc: "Level 3 verified",
    rate: "16.5% APY",
    action: "Apply premium",
    featured: false,
  },
];

function formatStat(key: (typeof stats)[number]["key"], values: Record<string, number>) {
  if (key === "disbursed") return "$" + values.disbursed + "M+";
  if (key === "borrowers") return values.borrowers.toLocaleString() + "+";
  if (key === "repayment") return values.repayment + "%";
  return values.defaultRate + "%";
}

export default function LandingPage() {
  const { isLoggedIn } = useAuth();
  const { isConnected, walletAddress } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const [showWalletAlert, setShowWalletAlert] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setShowWalletAlert(true);
    }
  }, [location.state]);

  const [disbursed, setDisbursed] = useState(0);
  const [borrowers, setBorrowers] = useState(0);
  const [repayment, setRepayment] = useState(0);
  const [defaultRate, setDefaultRate] = useState(0);

  const [calcAmount, setCalcAmount] = useState(5000);
  const [calcDuration, setCalcDuration] = useState(6);

  useEffect(() => {
    const duration = 1000;
    const stepsCount = 30;
    const stepTime = duration / stepsCount;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setDisbursed(
        Math.min(Math.floor((2.4 / stepsCount) * currentStep * 10) / 10, 2.4),
      );
      setBorrowers(Math.min(Math.floor((18400 / stepsCount) * currentStep), 18400));
      setRepayment(
        Math.min(Math.floor((94.7 / stepsCount) * currentStep * 10) / 10, 94.7),
      );
      setDefaultRate(
        Math.min(Math.floor((0.8 / stepsCount) * currentStep * 10) / 10, 0.8),
      );

      if (currentStep >= stepsCount) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const getEstimatedYield = () => {
    const apy =
      calcDuration === 1
        ? 0.12
        : calcDuration === 3
          ? 0.14
          : calcDuration === 6
            ? 0.16
            : 0.18;
    const interest = calcAmount * apy * (calcDuration / 12);
    return {
      interest: Math.round(interest),
      total: Math.round(calcAmount + interest),
      apy: apy * 100,
    };
  };

  const yieldResult = getEstimatedYield();

  const handleStartBorrowing = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isConnected || !walletAddress) {
      setShowWalletAlert(true);
      return;
    }
    setShowWalletAlert(false);
    navigate(isLoggedIn ? "/borrow" : "/auth/signup");
  };

  const handleEarnAsLender = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isConnected || !walletAddress) {
      setShowWalletAlert(true);
      return;
    }
    setShowWalletAlert(false);
    navigate(isLoggedIn ? "/lend" : "/auth/signup");
  };

  const statValues = { disbursed, borrowers, repayment, defaultRate };

  return (
    <div className="stellar-landing min-h-screen bg-[#080807] text-white font-sans">
      <Navbar />

      <main>
        <section className="sv-hero relative min-h-[calc(100vh-64px)] overflow-hidden border-b border-white/10 px-4 pt-10 sm:px-6 lg:px-8">
          <div className="sv-hero-grid" />
          <div className="sv-hero-beam sv-hero-beam-left" />
          <div className="sv-hero-beam sv-hero-beam-right" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl flex-col items-center justify-center pb-24 text-center">
            <div className="mb-8 inline-flex items-center gap-2 border border-[#ff7a1a]/30 bg-[#ff7a1a]/10 px-3 py-2 text-xs font-semibold text-[#ffd7bd] shadow-[0_0_32px_rgba(255,122,26,0.18)]">
              <Zap className="h-4 w-4 text-[#ff7a1a]" />
              <span>LIVE CREDIT BUILT ON STELLAR</span>
            </div>

            <div className="sv-card-stage" aria-hidden="true">
              <div className="sv-card-shadow" />
              <div className="sv-payment-card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white/55">STELLARVAULT X</p>
                    <p className="mt-1 text-2xl font-black text-white">847</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-[#ffb46f]" />
                </div>
                <div className="sv-card-chip" />
                <div className="mt-auto grid grid-cols-3 gap-3 text-left text-[10px] font-semibold text-white/55">
                  <div>
                    <p>LIMIT</p>
                    <span className="mt-1 block text-sm text-white">$20K</span>
                  </div>
                  <div>
                    <p>APR</p>
                    <span className="mt-1 block text-sm text-white">14.2%</span>
                  </div>
                  <div>
                    <p>RISK</p>
                    <span className="mt-1 block text-sm text-[#18c37e]">LOW</span>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-7xl">
              StellarVault credit.
              <span className="block text-[#ff7a1a]">Managed by trust.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              Borrow without collateral and lend into verified credit markets using on-chain reputation, social proof, and AI risk pricing.
            </p>

            <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleStartBorrowing}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#ff7a1a] bg-[#ff7a1a] px-6 py-3 text-sm font-bold text-[#160b03] transition hover:bg-[#ff9346] focus:outline-none focus:ring-2 focus:ring-[#ffb46f] focus:ring-offset-2 focus:ring-offset-[#080807]"
              >
                <span>Start Borrowing</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleEarnAsLender}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/18 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#080807]"
              >
                <span>Earn as Lender</span>
                <TrendingUp className="h-4 w-4" />
              </button>
            </div>

            {showWalletAlert && (
              <div className="mt-5 flex max-w-md items-center gap-3 border border-red-400/35 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                <span className="h-2 w-2 bg-red-400" />
                <span>Please connect your wallet first.</span>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-white/62">
              {["No collateral", "ZK identity", "Instant Stellar settlement"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-[#18c37e]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#080807] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.key} className="bg-[#0d0d0b] p-5 text-center sm:p-7">
                <p className="font-mono text-2xl font-black text-white sm:text-3xl">
                  {formatStat(stat.key, statValues)}
                </p>
                <p className="mt-2 text-xs font-semibold text-white/48">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="relative overflow-hidden bg-[#080807] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-4 text-xs font-bold text-[#ffb46f]">CREDIT INTELLIGENCE</p>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                Smart finance. Zero collateral drag.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/62">
                The reference video's black premium finance mood is rebuilt for StellarVault with the product's actual lending, borrowing, wallet, and score flows still wired in.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="sv-ai-stage mx-auto" aria-hidden="true">
                <div className="sv-ai-arc" />
                <div className="sv-ai-core">
                  <Layers className="h-10 w-10 text-[#ffb46f]" />
                </div>
                <span className="sv-ai-node sv-ai-node-a">92</span>
                <span className="sv-ai-node sv-ai-node-b">ZK</span>
                <span className="sv-ai-node sv-ai-node-c">AI</span>
                <span className="sv-ai-node sv-ai-node-d">14%</span>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-4">
              {featureRows.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#ff7a1a]/45 hover:bg-white/[0.055]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#ff7a1a]/35 bg-[#ff7a1a]/10 text-[#ffb46f]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{feature.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/58">{feature.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-[#f6f4ef] px-4 py-20 text-[#11110f] sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-black text-[#a24b10]">HOW IT WORKS</p>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">From wallet reputation to usable capital.</h2>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[#11110f]/10 bg-[#11110f]/10 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="bg-[#f6f4ef] p-7 sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-3xl font-black text-[#ff7a1a]">{step.number}</span>
                      <div className="flex h-11 w-11 items-center justify-center border border-[#11110f]/12 bg-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-black">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#11110f]/68">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#080807] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-4 text-xs font-bold text-[#ffb46f]">TRUST SCORE</p>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">A live credit profile lenders can price.</h2>
              <p className="mt-5 text-base leading-8 text-white/62">
                StellarVault turns heterogeneous trust data into a transparent score, then routes capital by risk and repayment behavior.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
                <div className="bg-[#10100e] p-5">
                  <p className="text-xs font-semibold text-white/45">Current score</p>
                  <p className="mt-2 font-mono text-4xl font-black text-white">847</p>
                </div>
                <div className="bg-[#10100e] p-5">
                  <p className="text-xs font-semibold text-white/45">Risk band</p>
                  <p className="mt-2 font-mono text-4xl font-black text-[#18c37e]">LOW</p>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.035] p-6 lg:col-span-7 sm:p-8">
              <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
                <div className="sv-score-ring mx-auto">
                  <div className="flex h-36 w-36 flex-col items-center justify-center bg-[#080807] text-center">
                    <span className="font-mono text-4xl font-black text-white">847</span>
                    <span className="text-xs font-bold text-white/45">TRUST</span>
                  </div>
                </div>
                <div className="space-y-5">
                  {trustSignals.map((signal) => (
                    <div key={signal.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-white/72">{signal.label}</span>
                        <span className="font-mono font-bold text-white">{signal.value}/100</span>
                      </div>
                      <div className="h-2 bg-white/10">
                        <div className={signal.color + " h-2"} style={{ width: signal.value + "%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#080807] px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-4 text-xs font-bold text-[#ffb46f]">CREDIT TIERS</p>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">Simple limits. No collateral surprise.</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {tiers.map((tier) => (
                <article
                  key={tier.name}
                  className={
                    "relative flex min-h-[360px] flex-col justify-between border p-7 transition " +
                    (tier.featured
                      ? "border-[#ff7a1a] bg-[#ff7a1a] text-[#140a03] shadow-[0_0_80px_rgba(255,122,26,0.35)] md:-translate-y-4"
                      : "border-white/10 bg-white/[0.035] text-white hover:border-white/22")
                  }
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-black">{tier.name}</h3>
                      <span className={"text-xs font-bold " + (tier.featured ? "text-[#5b2505]" : "text-white/45")}>{tier.label}</span>
                    </div>
                    <p className="mt-8 text-xs font-bold opacity-70">LOAN CAPACITY</p>
                    <p className="mt-2 text-3xl font-black">{tier.amount}</p>
                    <ul className="mt-8 space-y-4 text-sm font-semibold">
                      <li className="flex items-center gap-3"><Check className="h-4 w-4 shrink-0" /> Minimum score: {tier.score}</li>
                      <li className="flex items-center gap-3"><Check className="h-4 w-4 shrink-0" /> Verification: {tier.kyc}</li>
                      <li className="flex items-center gap-3"><Check className="h-4 w-4 shrink-0" /> Interest: {tier.rate}</li>
                    </ul>
                  </div>
                  <Link
                    to="/borrow"
                    className={
                      "mt-8 inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-3 text-sm font-black transition " +
                      (tier.featured
                        ? "border-[#140a03] bg-[#140a03] text-white hover:bg-[#281104]"
                        : "border-white/18 bg-white/5 text-white hover:border-[#ff7a1a]/60 hover:bg-[#ff7a1a]/10")
                    }
                  >
                    {tier.action}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0e0e0c] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#ff7a1a]/35 bg-[#ff7a1a]/10 text-[#ffb46f]">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">Social trust that moves your rate.</h2>
              <p className="mt-5 text-base leading-8 text-white/62">
                Peer endorsements, DAO reputation, and verified network strength can improve a borrower profile while preserving lender visibility.
              </p>
              <Link to="/social" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#ffb46f] hover:text-white">
                Explore Social Trust Graph
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="sv-network" aria-hidden="true">
                <span className="sv-network-line sv-network-line-a" />
                <span className="sv-network-line sv-network-line-b" />
                <span className="sv-network-line sv-network-line-c" />
                <span className="sv-network-line sv-network-line-d" />
                <span className="sv-network-node sv-network-core">847</span>
                <span className="sv-network-node sv-network-a">790</span>
                <span className="sv-network-node sv-network-b">812</span>
                <span className="sv-network-node sv-network-c">680</span>
                <span className="sv-network-node sv-network-d">825</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f4ef] px-4 py-20 text-[#11110f] sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="mb-4 text-xs font-black text-[#a24b10]">LENDER YIELD</p>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">Capital allocation with a clear return model.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#11110f]/68">
                Lenders can estimate returns before allocating into verified borrower pools. The existing calculator is preserved with the same amount, term, APY, and route behavior.
              </p>
              <Link to="/lend" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 border border-[#11110f] bg-[#11110f] px-6 py-3 text-sm font-black text-white transition hover:bg-[#2a2a25]">
                Start earning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="border border-[#11110f]/12 bg-white p-6 shadow-[0_24px_80px_rgba(17,17,15,0.12)] lg:col-span-6 sm:p-8">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-[#11110f]/12 bg-[#f6f4ef]">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black">Stellar Yield Estimator</h3>
                    <p className="text-sm text-[#11110f]/55">12% to 18% APY by duration</p>
                  </div>
                </div>
                <Award className="hidden h-6 w-6 text-[#ff7a1a] sm:block" />
              </div>

              <div className="space-y-7">
                <div>
                  <div className="mb-3 flex items-center justify-between text-sm font-bold">
                    <span>Principal deposit</span>
                    <span className="font-mono">${calcAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="sv-yield-range w-full"
                  />
                </div>

                <div>
                  <span className="mb-3 block text-sm font-bold">Lock duration</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 6, 12].map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setCalcDuration(dur)}
                        className={
                          "min-h-10 border px-2 text-xs font-black transition " +
                          (calcDuration === dur
                            ? "border-[#11110f] bg-[#11110f] text-white"
                            : "border-[#11110f]/12 bg-[#f6f4ef] text-[#11110f] hover:border-[#ff7a1a]")
                        }
                      >
                        {dur === 1 ? "1 Mo" : dur + " Mos"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-px overflow-hidden border border-[#11110f]/10 bg-[#11110f]/10 sm:grid-cols-3">
                  <div className="bg-[#f6f4ef] p-5">
                    <p className="text-xs font-bold text-[#11110f]/50">Returns</p>
                    <p className="mt-2 font-mono text-2xl font-black text-[#078653]">+${yieldResult.interest}</p>
                  </div>
                  <div className="bg-[#f6f4ef] p-5">
                    <p className="text-xs font-bold text-[#11110f]/50">Total</p>
                    <p className="mt-2 font-mono text-2xl font-black">${yieldResult.total}</p>
                  </div>
                  <div className="bg-[#f6f4ef] p-5">
                    <p className="text-xs font-bold text-[#11110f]/50">APY</p>
                    <p className="mt-2 font-mono text-2xl font-black text-[#a24b10]">{yieldResult.apy}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}