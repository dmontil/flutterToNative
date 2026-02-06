import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Layers, Zap } from "lucide-react";
import { FAQSection } from "@/components/ui/faq-section";

export default function AndroidHome() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/20 via-background to-background" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Launch Offer: $19.99 (was $49.99)
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            From Senior Flutter <br className="hidden md:block" />
            to <span className="text-green-500">Senior Android Native</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop translating widgets line-by-line. Master <strong>Kotlin</strong>, <strong>Jetpack Compose</strong>,
            and the Android runtime to ship production-grade native apps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/pricing#android">
              <Button size="lg" className="h-12 px-8 text-base group">
                Get Android Access — $19.99
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why this playbook?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Android is a different runtime, a different toolkit, and a different set of constraints. This path
              is built for senior Flutter engineers who need real production-level Android knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-green-500" />}
              title="Mental Model Mapping"
              description="Widgets to Composables, State to Flow, and the Android lifecycle truth."
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6 text-green-500" />}
              title="Architecture That Scales"
              description="Clean Architecture, Hilt DI, repository boundaries, and feature modularization."
            />
            <FeatureCard
              icon={<Code2 className="h-6 w-6 text-green-500" />}
              title="Interview-Ready"
              description="Compose, coroutines, memory, rendering, and the tough senior Android questions."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Built for Android Reality</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The Kotlin mapping made the transition fast. I shipped a Compose screen in days."
              author="Priya S."
              role="Senior Flutter Dev → Android Eng"
            />
            <TestimonialCard
              quote="Finally a guide that doesn't treat me like a junior. It goes straight to architecture."
              author="Miguel A."
              role="Tech Lead Mobile"
            />
            <TestimonialCard
              quote="Interview prep was brutal and exactly what I needed for a senior Android screen."
              author="Nina R."
              role="Mobile Engineer"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Your Roadmap to Native Android</h2>

            <div className="space-y-8">
              <RoadmapItem
                step="01"
                title="The Shift"
                description="Rendering, lifecycle, and threading differences in Android."
              />
              <RoadmapItem
                step="02"
                title="Compose & Views"
                description="Modern Compose plus how legacy Views still matter."
              />
              <RoadmapItem
                step="03"
                title="Coroutines & Flow"
                description="Structured concurrency, cancellation, and reactive streams."
              />
              <RoadmapItem
                step="04"
                title="Production App"
                description="Feature modules, offline-first, and data sync patterns."
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
