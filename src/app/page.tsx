import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Smartphone, Layers, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            Launch Offer: $19.99 (was $49.99)
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Become Native <br className="hidden md:block" />
            Without Starting Over
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            The premium playbooks built for senior Flutter engineers. Deep architecture, real-world tradeoffs,
            and interview-grade knowledge for iOS and Android.
          </p>

          <div className="max-w-2xl mx-auto mb-10 grid gap-2 text-sm text-muted-foreground">
            <div>✔ Senior architecture patterns you can apply immediately</div>
            <div>✔ Flutter → Native mental models (fast ramp)</div>
            <div>✔ Interview-ready answers and system design playbooks</div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <TrackCard
              href="/ios"
              title="iOS Playbook"
              description="SwiftUI, UIKit, ARC, and senior iOS architecture. Built for production engineers."
              accent="indigo"
              icon={<Cpu className="h-6 w-6 text-indigo-500" />}
            />
            <TrackCard
              href="/android"
              title="Android Playbook"
              description="Kotlin, Compose, coroutines, and Android architecture. Built for senior-level impact."
              accent="green"
              icon={<Smartphone className="h-6 w-6 text-green-500" />}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ValueCard
              icon={<Zap className="h-5 w-5 text-indigo-500" />}
              title="Mental Model Mapping"
              description="Go from Flutter to native by mapping core concepts, not rewriting everything."
            />
            <ValueCard
              icon={<Layers className="h-5 w-5 text-green-500" />}
              title="Architecture You Can Ship"
              description="Clean Architecture, modularization, data flow, and scaling checklists."
            />
            <ValueCard
              icon={<ArrowRight className="h-5 w-5 text-purple-500" />}
              title="Interview-Ready"
              description="Senior-level questions and answers that sound like real experience."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
            <PricingTeaser
              title="iOS Playbook"
              price="$19.99"
              compare="$49.99"
              description="SwiftUI + UIKit + ARC + Senior Architecture"
              badge="Save 60%"
              href="/pricing#ios"
              accent="indigo"
            />
            <PricingTeaser
              title="Android Playbook"
              price="$19.99"
              compare="$49.99"
              description="Kotlin + Compose + Coroutines + Senior Architecture"
              badge="Save 60%"
              href="/pricing#android"
              accent="green"
            />
          </div>
          <div className="max-w-3xl mx-auto mt-6">
            <PricingTeaser
              title="Bundle: iOS + Android"
              price="$29.99"
              compare="$99.99"
              description="Get both tracks. Best value for cross‑platform senior engineers."
              badge="Save 70%"
              href="/pricing#bundle"
              accent="indigo"
            />
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            30‑Day Money‑Back Guarantee
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Engineers love the clarity</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TestimonialCard
              quote="Finally, content that skips the basics and goes straight to architecture decisions."
              author="Alex M."
              role="Senior Flutter Dev"
            />
            <TestimonialCard
              quote="The Kotlin/Compose mapping was the missing piece for my Android transition."
              author="Priya S."
              role="Mobile Lead"
            />
            <TestimonialCard
              quote="The interview prep feels like a real senior engineer wrote it."
              author="David R."
              role="iOS Engineer"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pick your native track</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Start with the platform you want to master. Add the other later if you want the full bundle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <a href="/ios">Go to iOS Playbook</a>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/android">Go to Android Playbook</a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg">FlutterToNative.pro</div>
          <div className="text-xs text-muted-foreground">
            © 2026 Native Education. Built for engineers.
          </div>
        </div>
      </footer>
    </div >
  );
}

const ACCENTS = {
  indigo: {
    border: "border-indigo-500/20",
    iconBg: "bg-indigo-500/10",
    button: "bg-indigo-600 hover:bg-indigo-700",
  },
  green: {
    border: "border-green-500/20",
    iconBg: "bg-green-500/10",
    button: "bg-green-600 hover:bg-green-700",
  },
};

function TrackCard({ href, title, description, accent, icon }: { href: string, title: string, description: string, accent: "indigo" | "green", icon: React.ReactNode }) {
  const styles = ACCENTS[accent];
  return (
    <a
      href={href}
      className={`group rounded-2xl border ${styles.border} bg-card p-8 text-left shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`h-10 w-10 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button className={styles.button}>
        Enter {title} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </a>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingTeaser({ title, price, compare, description, href, accent, badge }: { title: string, price: string, compare: string, description: string, href: string, accent: "indigo" | "green", badge?: string }) {
  const styles = ACCENTS[accent];
  return (
    <a href={href} className={`rounded-2xl border ${styles.border} bg-card p-8 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
          <span className="text-xs uppercase tracking-wider text-muted-foreground">One‑time</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-sm text-muted-foreground line-through">{compare}</span>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button className={styles.button}>
        View Pricing <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </a>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <p className="text-muted-foreground italic mb-6">"{quote}"</p>
      <div>
        <div className="font-bold">{author}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  );
}
