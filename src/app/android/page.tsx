"use client";

import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, TrendingUp, Briefcase, ShieldCheck, BookOpen } from "lucide-react";
import { FAQSection } from "@/components/ui/faq-section";
import { usePremium } from "@/hooks/use-premium";

export default function AndroidHome() {
  const { isPro, isLoggedIn } = usePremium();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/20 via-background to-background" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Early Access: $19.99 — Engineers are landing Android roles in weeks
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Your Next Title: <br className="hidden md:block" />
            <span className="text-green-500">Senior Android Engineer</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            You already have the engineering brain. You just need the <strong>Kotlin vocabulary</strong>, the <strong>Compose patterns</strong>, and the <strong>interview confidence</strong> to walk into any Android role as a senior — not start over as a junior.
          </p>

          <div className="max-w-xl mx-auto mb-8 grid gap-2 text-sm text-muted-foreground">
            <div>✔ Land senior Android roles with your Flutter experience as leverage</div>
            <div>✔ Pass senior Android interviews on the first try</div>
            <div>✔ Ship production Compose in days, not months</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isLoggedIn && isPro ? (
              <Link href="/android/mental-model">
                <Button size="lg" className="h-12 px-8 text-base bg-green-600 hover:bg-green-700">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/pricing#android">
                <Button size="lg" className="h-12 px-8 text-base group">
                  Start My Android Career Track — $19.99
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">This isn't a Kotlin tutorial. It's a career accelerator.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You already think like a senior. We give you the Android-specific knowledge to prove it — in interviews, in architecture reviews, and in production code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6 text-green-500" />}
              title="Open Senior-Level Doors"
              description="Native Android roles at top companies are in high demand. Your Flutter years count — you just need the bridge to prove it."
            />
            <FeatureCard
              icon={<Briefcase className="h-6 w-6 text-green-500" />}
              title="Walk In as a Senior"
              description="Hilt DI, Gradle modules, repository patterns — the architecture decisions that separate seniors from juniors."
            />
            <FeatureCard
              icon={<Code2 className="h-6 w-6 text-green-500" />}
              title="Crush the Interview"
              description="Coroutines, Compose internals, lifecycle — the exact questions senior Android interviewers ask, with answers that prove depth."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-3 text-center">They made the switch. Now they earn more.</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Real engineers who used this playbook to land senior Android roles.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Landed a senior Android role in 5 weeks. The Compose architecture section made the difference in every interview."
              author="Priya S."
              role="Flutter Lead → Android Staff Eng"
            />
            <TestimonialCard
              quote="At 32, I thought I'd be starting over. Instead I walked into a senior Android role and felt like I belonged from day one."
              author="Miguel A."
              role="Flutter Dev → Senior Android @ Scale-up"
            />
            <TestimonialCard
              quote="The interview section is unfair. I knew answers to questions the other candidates couldn't touch."
              author="Nina R."
              role="Ex-Flutter → Android Eng @ Big Tech"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">From Flutter Senior to Android Senior in 4 Steps</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Not a 6-month bootcamp. A focused career transition designed for engineers who already know how to build.</p>

            <div className="space-y-8">
              <RoadmapItem
                step="01"
                title="Rewire Your Mental Model"
                description="Map every Flutter concept to its Android equivalent. You'll stop thinking in Dart and start thinking in Kotlin — in hours."
              />
              <RoadmapItem
                step="02"
                title="Master the Architecture That Gets You Hired"
                description="Hilt, Gradle modules, repository patterns — the architecture senior Android interviewers expect you to know cold."
              />
              <RoadmapItem
                step="03"
                title="Build Like You've Been Here for Years"
                description="Ship a production-grade Compose app with offline support, Flow-based state, and the code quality that earns trust."
              />
              <RoadmapItem
                step="04"
                title="Crush the Interview"
                description="Coroutines, lifecycle, Compose internals — walk into any senior Android screen with total confidence."
              />
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-lg">
            FlutterToNative.pro
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 Native Education. Built for Engineers.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function RoadmapItem({ step, title, description }: { step: string, title: string, description: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center text-green-500 font-bold bg-green-500/5 group-hover:bg-green-500/10 transition-colors">
        {step}
      </div>
      <div className="pt-2">
        <h3 className="text-lg font-bold mb-1 group-hover:text-green-500 transition-colors">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="p-6 rounded-2xl bg-secondary/20 border border-border">
      <div className="flex flex-col h-full justify-between">
        <p className="text-lg italic text-muted-foreground mb-6">"{quote}"</p>
        <div>
          <p className="font-bold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
