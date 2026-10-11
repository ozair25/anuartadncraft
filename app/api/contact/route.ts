import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/security/rate-limit"
import { ContactFormSchema } from "@/lib/security/schemas"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  // 1. Rate limiting (10 contact submissions per minute per IP)
  const rateLimit = checkRateLimit(req, "contact", 10, 60)
  const rateLimitHeaders = {
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(rateLimit.reset),
  }

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many messages sent. Please wait a moment before sending another note." },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          "Retry-After": String(rateLimit.retryAfterSeconds || 60),
        },
      }
    )
  }

  // 2. Validate Content-Type
  const contentType = req.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid Content-Type" },
      { status: 415, headers: rateLimitHeaders }
    )
  }

  try {
    const rawBody = await req.json().catch(() => null)
    if (!rawBody) {
      return NextResponse.json(
        { error: "Invalid form submission" },
        { status: 400, headers: rateLimitHeaders }
      )
    }

    // 3. Schema validation with honeypot
    const result = ContactFormSchema.safeParse(rawBody)
    if (!result.success) {
      // If honeypot caught a bot, silently return success without processing
      if (rawBody.website) {
        return NextResponse.json(
          { success: true, message: "Thank you for contacting us." },
          { headers: rateLimitHeaders }
        )
      }

      const issue = result.error.issues[0]?.message || "Please fill in all required fields accurately."
      return NextResponse.json(
        { error: issue },
        { status: 400, headers: rateLimitHeaders }
      )
    }

    const { name, phone, email, subject, message } = result.data

    // 4. Sanitize inputs
    const sanitized = {
      name: name.replace(/[<>]/g, "").trim(),
      phone: phone.replace(/[^0-9+\s\-()]/g, "").trim(),
      email: email ? email.replace(/[<>]/g, "").trim() : "",
      subject: (subject || "General Inquiry").replace(/[<>]/g, "").trim(),
      message: message.replace(/[<>]/g, "").trim(),
      receivedAt: new Date().toISOString(),
    }

    console.log(`[Contact Form] Inquiry received from ${sanitized.name} regarding "${sanitized.subject}"`)

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will get back to you shortly!",
      },
      { headers: rateLimitHeaders }
    )
  } catch (error) {
    console.error(
      "[Contact Form API Error]:",
      error instanceof Error ? error.message : "Internal error"
    )
    return NextResponse.json(
      { error: "Unable to send message at this time. Please try again or reach out on WhatsApp." },
      { status: 500, headers: rateLimitHeaders }
    )
  }
}
