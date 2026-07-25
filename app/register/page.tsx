"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useAuth } from "@/lib/context/auth-context"
import { UserPlus, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      login(email, "user")
      router.push("/profile")
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm text-center">
            <RibbonLabel>Join Our Creative Club</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="mt-6 text-left space-y-4">
              <div>
                <label className="text-[11px] font-bold text-foreground">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-foreground">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="artist@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-foreground">Create Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity mt-4"
              >
                <UserPlus className="h-4 w-4" /> Register Account
              </button>

              <div className="text-center pt-2 text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-primary hover:underline">
                  Sign in here <ArrowRight className="inline h-3 w-3" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
