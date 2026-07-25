"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { useAuth } from "@/lib/context/auth-context"
import { LogIn, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
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
            <RibbonLabel>Welcome Back</RibbonLabel>
            <h1 className="mt-4 font-serif text-3xl font-black text-foreground">
              Sign In To <span className="italic text-primary">Anu Arts</span>
            </h1>

            <form onSubmit={handleSubmit} className="mt-6 text-left space-y-4">
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
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-foreground">Password *</label>
                  <Link href="/forgot-password" className="text-[10px] font-bold text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
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
                <LogIn className="h-4 w-4" /> Sign In
              </button>

              <div className="text-center pt-2 text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-bold text-primary hover:underline">
                  Register here <ArrowRight className="inline h-3 w-3" />
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
