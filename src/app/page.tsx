import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Smartphone, Layers, Zap, ShieldCheck, TrendingUp, Briefcase, Target } from "lucide-react";
import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Early Access: $19.99 — Join 500+ engineers who already made the switch
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Senior Flutter? <br className="hidden md:block" />
            Move to <span className="text-indigo-500">Native</span> Without Starting Over
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            A practical bridge from Flutter to production-grade Kotlin & Swift. Lifecycle, architecture, concurrency,
            interviews.
          </p>

          <div className="max-w-2xl mx-auto mb-8 grid gap-2 text-sm text-muted-foreground text-left">
            <div>• Translate Flutter mental models to real native architecture</div>
            <div>• Avoid common migration mistakes</div>
            <div>• Learn what actually matters in senior interviews</div>
            <div>• Real code comparisons (Flutter ↔ Compose ↔ SwiftUI)</div>
          </div>

          <div className="mb-10">
            <TrackedCtaLink
              href="/pricing#bundle"
              className="bg-indigo-600 hover:bg-indigo-700"
              eventName="select_promotion"
              eventParams={{
                promotion_name: "hero_lifetime_offer",
                creative_name: "hero_primary_cta",
                location_id: "home_hero",
              }}
            >
              Get Lifetime Access - $19.99
            </TrackedCtaLink>
            <p className="mt-3 text-sm text-muted-foreground">
              For experienced Flutter engineers. <br className="hidden sm:block" />
              Not a beginner Kotlin course.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <TrackCard
              href="/ios"
              title="iOS Career Track"
              description="Go from Flutter to senior iOS engineer. SwiftUI, UIKit, and the architecture that gets you hired."
              accent="indigo"
              icon={<Cpu className="h-6 w-6 text-indigo-500" />}
            />
            <TrackCard
              href="/android"
              title="Android Career Track"
              description="Go from Flutter to senior Android engineer. Kotlin, Compose, and production-grade architecture."
              accent="green"
              icon={<Smartphone className="h-6 w-6 text-green-500" />}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">This isn't another tutorial. It's a career move.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You already think like a senior engineer. You just need the native vocabulary and the confidence to prove it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ValueCard
              icon={<TrendingUp className="h-5 w-5 text-indigo-500" />}
              title="Open New Doors"
              description="Native roles at top companies are in high demand. Your Flutter skills translate directly — you just need the bridge to prove it."
            />
            <ValueCard
              icon={<Briefcase className="h-5 w-5 text-green-500" />}
              title="Walk In as a Senior"
              description="No junior ramp-up. The architecture patterns, system design, and interview answers that prove you belong at the top."
            />
            <ValueCard
              icon={<Target className="h-5 w-5 text-purple-500" />}
              title="Interview in Days, Not Months"
              description="Real senior-level questions with answers that sound like 5 years of native experience. Because your Flutter years count."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Invest in your next title, not another course</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              One payment. Lifetime access. The ROI of a single salary bump pays for this 500x over.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
            <PricingTeaser
              title="iOS Career Track"
              price="$19.99"
              compare="$49.99"
              description="Everything you need to land a senior iOS role. Architecture, interviews, and production patterns."
              badge="Save 60%"
              href="/pricing#ios"
              accent="indigo"
            />
            <PricingTeaser
              title="Android Career Track"
              price="$19.99"
              compare="$49.99"
              description="Everything you need to land a senior Android role. Kotlin, Compose, and real-world architecture."
              badge="Save 60%"
              href="/pricing#android"
              accent="green"
            />
          </div>
          <div className="max-w-3xl mx-auto mt-6">
            <PricingTeaser
              title="Full Stack Native — iOS + Android"
              price="$29.99"
              compare="$99.99"
              description="Double your market value. Become the engineer who can ship on any platform."
              badge="Best Value"
              href="/pricing#bundle"
              accent="indigo"
            />
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            30-Day Money-Back Guarantee — No questions asked
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">They made the switch. Now they earn more.</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">Real engineers who used this playbook to transition — and never looked back.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TestimonialCard
              quote="Landed a senior iOS role in 6 weeks. The architecture section alone made me sound like I'd been doing native for years."
              author="Alex M."
              role="Senior Flutter → iOS Engineer @ Fintech"
            />
            <TestimonialCard
              quote="I was terrified of starting over. This playbook made me realize I wasn't starting over — I was leveling up."
              author="Priya S."
              role="Flutter Lead → Android Staff Eng"
            />
            <TestimonialCard
              quote="Passed the senior iOS screen at a FAANG on my first try. The interview section is absurdly good."
              author="David R."
              role="Ex-Flutter → iOS Eng @ Big Tech"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Your next career chapter starts here</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Every week you wait is a week of native salary you're leaving on the table. Pick your track and start today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <a href="/ios">Start iOS Career Track <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/android">Start Android Career Track <ArrowRight className="ml-2 h-4 w-4" /></a>
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
