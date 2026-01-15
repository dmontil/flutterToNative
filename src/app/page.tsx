import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { LeadMagnet } from "@/components/ui/lead-magnet";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Layers, Zap, BookOpen, Smartphone, Cpu } from "lucide-react";
import { FAQSection } from "@/components/ui/faq-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-background to-background" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            The Missing Manual for Flutter Engineers
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            From Senior Flutter <br className="hidden md:block" />
            to <span className="text-indigo-500">Senior iOS Native</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop translating code line-by-line. Master the <strong>Apple ecosystem</strong>, understand <strong>UIKit & SwiftUI</strong> architecture, and crush your next iOS interview.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#early-access">
              <Button size="lg" className="h-12 px-8 text-base group">
                Join Beta & Waitlist
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LeadMagnet />

      {/* Feature Grid / Value Props */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why this playbook?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most iOS tutorials treat you like a junior dev. We respect your experience and focus on the actual high-leverage transition from Flutter to Native.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-indigo-500" />}
              title="Mental Model Mapping"
              description="Direct comparisons: Widgets to Views, Cubit to ViewModels, and Isolates to Structured Concurrency."
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6 text-indigo-500" />}
              title="Professional Architecture"
              description="Learn how Clean Architecture applies to iOS. Dependency Injection, Coordinators, and Modularization."
            />
            <FeatureCard
              icon={<Code2 className="h-6 w-6 text-indigo-500" />}
              title="Interview Gold"
              description="Component lifecycle, memory management (ARC), and the tough questions senior interviewers ask."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Loved by Senior Engineers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Finally, a guide that respects my experience. Didn't waste time explaining variables, went straight to memory management & architecture."
              author="Alex M."
              role="Senior Flutter Dev @ TechCorp"
            />
            <TestimonialCard
              quote="The mental model mapping made everything click. I ported our main app feature to SwiftUI in a weekend after reading this."
              author="Sarah K."
              role="Lead Mobile Engineer"
            />
            <TestimonialCard
              quote="Worth every penny. The interview questions section helped me pass the iOS Native screen at a FAANG company."
              author="David R."
              role="Ex-Flutter, now iOS Eng"
            />
          </div>
        </div>
      </section>

      {/* Roadmap Teaser */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Your Roadmap to Native Swift</h2>

            <div className="space-y-8">
              <RoadmapItem
                step="01"
                title="The Shift"
                description="Understanding the fundamental differences in rendering and lifecycle."
              />
              <RoadmapItem
                step="02"
                title="SwiftUI & UIKit"
                description="Why you still need UIKit and how to mix them effectively."
              />
              <RoadmapItem
                step="03"
                title="State Management"
                description="Moving from BLoC/Cubit to ObservableObject and @State."
              />
              <RoadmapItem
                step="04"
                title="Production App"
                description="Building a real Expense Tracker with offline support and complex navigation."
              />
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Footer */}
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
    </div >
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
      <div className="flex-shrink-0 w-12 h-12 rounded-full border border-indigo-500/30 flex items-center justify-center text-indigo-500 font-bold bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors">
        {step}
      </div>
      <div className="pt-2">
        <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-500 transition-colors">{title}</h3>
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
