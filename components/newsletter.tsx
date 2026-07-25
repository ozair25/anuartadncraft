"use client"

export function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 md:px-6 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop"
            alt="Illustrated artist mascot"
            className="hidden h-24 w-24 rounded-full border-2 border-cream/40 object-cover shadow-md sm:block"
            referrerPolicy="no-referrer"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-serif text-2xl font-black md:text-3xl">
              Stay Inspired With Anu Arts
            </h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Get updates on new arrivals, offers &amp; creative tips.
            </p>
          </div>
        </div>

        <form
          className="flex w-full max-w-md items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-md border-0 bg-primary-foreground px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ink/30"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-md bg-ink px-6 text-xs font-bold uppercase tracking-wide text-cream transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
