"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RibbonLabel } from "@/components/ribbon-label"
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm text-center">
            <RibbonLabel>Password Recovery</RibbonLabel>
            <h1 className="mt-4 font-serif text-2xl font-black text-foreground">
              Forgot Password
            </h1>

            {sent ? (
              <div className="mt-6 space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                <h3 className="font-serif text-lg font-bold">Reset Link Sent!</h3>
                <p className="text-xs text-muted-foreground">
                  We sent password reset instructions to <span className="font-bold text-foreground">{email}</span>.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 text-left space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-foreground">Enter Your Account Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="artist@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity"
                >
                  <Mail className="h-4 w-4" /> Send Reset Link
                </button>

                <div className="text-center pt-2">
                  <Link href="/login" className="text-xs font-bold text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="inline h-3 w-3" /> Back to Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
