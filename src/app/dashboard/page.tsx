"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Layers, Code2, Target, TestTube, Crown, TrendingUp, Brain as BrainIcon, Grid3x3 } from "lucide-react";
import { usePremium } from "@/hooks/use-premium";
import { usePlatform } from "@/hooks/use-platform";

const PLATFORM_CONTENT = {
  ios: [
    {
      href: "/mental-model",
      title: "Concepts & Mental Models",
      description: "Map your Flutter knowledge to iOS patterns. Think in Swift, not Dart.",
      icon: <BrainIcon className="h-6 w-6 text-indigo-500" />,
      isFree: true,
    },
    {
      href: "/components-ui", 
      title: "UI Lab",
      description: "Flutter widgets → SwiftUI components. Build production UIs in days.",
      icon: <Layers className="h-6 w-6 text-indigo-500" />,
      isFree: true,
    },
    {
      href: "/architecture",
      title: "Architecture Hub", 
      description: "MVVM, Coordinators, SPM. The patterns senior iOS engineers use.",
      icon: <Code2 className="h-6 w-6 text-indigo-500" />,
      isFree: false,
    },
    {
      href: "/interview",
      title: "Interview Prep",
      description: "ARC, concurrency, lifecycle. Walk into senior screens with confidence.",
      icon: <Target className="h-6 w-6 text-indigo-500" />,
      isFree: false,
    },
    {
      href: "/feature-dive",
      title: "Feature Deep Dive",
      description: "Build a complete feature from scratch. Real production patterns.",
      icon: <TrendingUp className="h-6 w-6 text-indigo-500" />,
      isFree: false,
    },
    {
      href: "/testing",
      title: "Testing Strategies",
      description: "Unit, integration, UI testing. Test like a senior iOS engineer.",
      icon: <TestTube className="h-6 w-6 text-indigo-500" />,
      isFree: false,
    },
    {
      href: "/widget-map",
      title: "Widget Mapping",
      description: "Complete Flutter → SwiftUI widget reference.",
      icon: <Grid3x3 className="h-6 w-6 text-indigo-500" />,
      isFree: true,
    },
  ],
  android: [
    {
      href: "/android/mental-model",
      title: "Concepts & Mental Models",
      description: "Map your Flutter knowledge to Android patterns. Think in Kotlin, not Dart.",
      icon: <Brain className="h-6 w-6 text-green-500" />,
      isFree: true,
    },
    {
      href: "/android/components-ui",
      title: "UI Lab", 
      description: "Flutter widgets → Compose components. Build production UIs in days.",
      icon: <Layers className="h-6 w-6 text-green-500" />,
      isFree: true,
    },
    {
      href: "/android/architecture",
      title: "Architecture Hub",
      description: "MVVM, Hilt, Gradle. The patterns senior Android engineers use.",
      icon: <Code2 className="h-6 w-6 text-green-500" />,
      isFree: false,
    },
    {
      href: "/android/interview",
      title: "Interview Prep",
      description: "Coroutines, lifecycle, Compose internals. Senior interview prep.",
      icon: <Target className="h-6 w-6 text-green-500" />,
      isFree: false,
    },
    {
      href: "/android/feature-dive",
      title: "Feature Deep Dive",
      description: "Build a complete feature from scratch. Real production patterns.",
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      isFree: false,
    },
    {
      href: "/android/testing",
      title: "Testing Strategies",
      description: "Unit, integration, UI testing. Test like a senior Android engineer.",
      icon: <TestTube className="h-6 w-6 text-green-500" />,
      isFree: false,
    },
    {
      href: "/android/widget-map",
      title: "Widget Mapping",
      description: "Complete Flutter → Compose widget reference.",
      icon: <Grid3x3 className="h-6 w-6 text-green-500" />,
      isFree: true,
    },
  ]
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

function DashboardContent() {
  const { isPro, isLoggedIn } = usePremium();
  const { platform, isIos, isAndroid } = usePlatform();
  
  // Default a iOS si no hay una plataforma clara
  const content = isAndroid ? PLATFORM_CONTENT.android : PLATFORM_CONTENT.ios;
  const platformColor = isAndroid ? "green" : "indigo";
  const platformName = isAndroid ? "Android" : "iOS";

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className={`absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-${platformColor}-500/20 via-background to-background`} />

      <div className="container mx-auto px-4 text-center">
        {isLoggedIn && isPro && (
          <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-500 mb-6">
            <Crown className="h-4 w-4 mr-2" />
            Premium Access Active
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
          Your {platformName} Career <br className="hidden md:block" />
          <span className={`text-${platformColor}-500`}>Learning Hub</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Everything you need to go from Flutter senior to {platformName} senior.
          <br />Master the architecture, crush the interviews, ship production code.
        </p>

        <Suspense fallback={<CardsGridSkeleton />}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.map((item, index) => (
              <Suspense key={item.href} fallback={<CardSkeleton />}>
                <ContentCard
                  {...item}
                  isUnlocked={isPro || item.isFree}
                  index={index}
                  platformColor={platformColor}
                />
              </Suspense>
            ))}
          </div>
        </Suspense>

        {!isPro && (
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-500/10 to-green-500/10 border border-border rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Unlock All Content</h3>
              <p className="text-muted-foreground mb-6">
                Get access to Architecture, Interview Prep, Feature Deep Dives, and Testing Strategies.
              </p>
              <Link href="/pricing">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-green-600 hover:from-indigo-700 hover:to-green-700">
                  Get Premium Access — $19.99
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Skeleton components for better UX during loading
function DashboardSkeleton() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="h-12 w-64 bg-muted animate-pulse mx-auto mb-8 rounded" />
        <div className="h-8 w-96 bg-muted animate-pulse mx-auto mb-12 rounded" />
        <CardsGridSkeleton />
      </div>
    </section>
  );
}

function CardsGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[...Array(6)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-left animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="h-12 w-12 rounded-lg bg-muted flex-shrink-0" />
        <div className="flex-1">
          <div className="h-5 w-3/4 bg-muted rounded mb-2" />
          <div className="h-4 w-full bg-muted rounded" />
        </div>
      </div>
      <div className="h-10 w-full bg-muted rounded" />
    </div>
  );
}

function ContentCard({ href, title, description, icon, isUnlocked, index, platformColor }: { 
  href: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  isUnlocked: boolean;
  index: number;
  platformColor: string;
}) {
  return (
    <div 
      className={`group relative rounded-2xl border ${isUnlocked ? 'border-border hover:border-' + platformColor + '-500/50' : 'border-border/50 opacity-75'} bg-card p-6 text-left shadow-sm hover:shadow-md transition-all duration-300`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`h-12 w-12 rounded-lg bg-${platformColor}-500/10 flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{title}</h3>
            {!isUnlocked && (
              <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full font-bold">
                <Crown className="h-3 w-3 inline mr-1" />
                PRO
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {isUnlocked ? (
        <Link href={href} className="block">
          <Button 
            variant="outline" 
            size="sm" 
            className={`w-full group-hover:bg-${platformColor}-600 group-hover:text-white group-hover:border-${platformColor}-600`}
          >
            Start Learning <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      ) : (
        <div className="text-center">
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground" disabled>
            <Crown className="h-3 w-3 mr-2" />
            Premium Content
          </Button>
        </div>
      )}
    </div>
  );
}

function Brain({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}