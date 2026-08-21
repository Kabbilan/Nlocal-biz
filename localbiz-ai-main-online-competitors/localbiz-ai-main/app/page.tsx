import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles,
  ScanLine,
  Store,
  Lightbulb,
  Megaphone,
  CalendarClock,
  ChartColumn,
  ArrowRight,
  Check,
  CloudRain,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: ScanLine,
    title: 'Analyze any product',
    body: 'Snap a photo and AI identifies the product, its features, and the right price for your area.',
  },
  {
    icon: Store,
    title: 'Watch your competition',
    body: 'See what online sellers charge, including delivery costs, so you never lose a sale on price.',
  },
  {
    icon: Lightbulb,
    title: 'Clear next steps',
    body: 'Plain-English recommendations tell you exactly what to do today to sell more.',
  },
  {
    icon: Megaphone,
    title: 'Marketing done for you',
    body: 'Instant Instagram captions, WhatsApp messages, and posters — ready to share.',
  },
  {
    icon: CalendarClock,
    title: 'Plan smart campaigns',
    body: 'A simple day-by-day plan that times your offers with weather and demand.',
  },
  {
    icon: ChartColumn,
    title: 'See what works',
    body: 'Track views, enquiries, and sales in easy charts — no spreadsheets needed.',
  },
]

const steps = [
  {
    step: '1',
    title: 'Add your product',
    body: 'Upload a photo and enter your cost, price, and stock. Takes under a minute.',
  },
  {
    step: '2',
    title: 'Get AI insights',
    body: 'LocalBiz AI checks demand, weather, and competitor prices to find your best move.',
  },
  {
    step: '3',
    title: 'Sell more',
    body: 'Apply the recommended price and launch ready-made marketing in a few taps.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">LocalBiz AI</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
              Sign in
            </Button>
            <Button size="lg" nativeButton={false} render={<Link href="/dashboard" />}>
              Open dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-in-up">
            <Badge variant="default">
              <Sparkles />
              Built for local shop owners
            </Badge>
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Price smarter. Sell more. No tech skills needed.
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              LocalBiz AI is your pocket business advisor. Snap a photo of any product and get the
              right price, competitor insights, and ready-to-share marketing — in plain language.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-11 px-5 text-[0.95rem]" nativeButton={false} render={<Link href="/dashboard" />}>
                Try the live demo
                <ArrowRight />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-5 text-[0.95rem]"
                nativeButton={false}
                render={<Link href="/analyze" />}
              >
                Analyze a product
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {['No credit card', 'Works on any phone', 'Set up in minutes'].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="size-4 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-in-up [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
              <Image
                src="/hero-shopkeeper.png"
                alt="A local shop owner using LocalBiz AI on a smartphone at their store counter"
                width={720}
                height={720}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
            {/* Floating insight card */}
            <div className="absolute -bottom-5 -left-3 w-60 rounded-2xl border border-border bg-card p-4 shadow-lg sm:-left-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CloudRain className="size-4 text-primary" />
                Rain expected in 2 days
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Raincoat demand is <span className="font-medium text-success">HIGH</span>. Suggested
                price ₹649.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to run a smarter shop
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Six simple tools that do the hard thinking for you — so you can focus on your
              customers.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
              Up and running in three simple steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary font-display text-base font-bold text-primary-foreground">
                  {s.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-12 md:py-20">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
              Start selling smarter today — it&apos;s free to try
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
              Explore the full LocalBiz AI dashboard with sample data. No sign-up required.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 h-11 px-6 text-[0.95rem]"
              nativeButton={false}
              render={<Link href="/dashboard" />}
            >
              Open the dashboard
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="font-medium text-foreground">LocalBiz AI</span>
          </div>
          <p>Built for small shops. A hackathon demo.</p>
        </div>
      </footer>
    </div>
  )
}
