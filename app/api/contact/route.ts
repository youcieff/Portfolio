import { NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/data/site";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name is too long."),
  email: z.email("Please enter a valid email address.").max(160, "Email is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(32, "Phone number is too long."),
  subject: z.string().trim().max(140, "Subject is too long.").optional().default(""),
  message: z
    .string()
    .trim()
    .min(5, "Please add a little more detail.")
    .max(3000, "Message is too long."),
  _honey: z.string().optional().default(""),
});

const attempts = new Map<string, { count: number; start: number }>();
const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 600_000);
const maxAttempts = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.start > windowMs) {
    attempts.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > maxAttempts;
}

function getFormPageUrl(referer: string | null) {
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.protocol === "http:" || url.protocol === "https:") return url.href;
    } catch {
      // Use the canonical site URL when the request has no valid page referrer.
    }
  }
  return `${site.website}/#contact`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit a valid form." }, { status: 400 });
  }
  if (typeof body === "object" && body !== null && "_honey" in body && body._honey) {
    return NextResponse.json({ ok: true });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields = Object.fromEntries(
      parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
    );
    return NextResponse.json(
      { message: "Please check the highlighted fields.", fields },
      { status: 422 },
    );
  }

  const data = parsed.data;
  if (data._honey) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip))
    return NextResponse.json(
      { message: "Too many messages. Please wait a little and try again." },
      { status: 429 },
    );

  const recipient = process.env.FORMSUBMIT_EMAIL?.trim() || site.email;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        _replyto: data.email,
        _subject: data.subject || `Portfolio message from ${data.name}`,
        _url: getFormPageUrl(request.headers.get("referer")),
        message: data.message,
        _honey: "",
      }),
      signal: AbortSignal.timeout(12_000),
    });
    const result: unknown = await response.json().catch(() => null);
    const providerMessage =
      typeof result === "object" && result !== null && "message" in result &&
      typeof result.message === "string"
        ? result.message
        : "";
    const providerSucceeded =
      typeof result === "object" &&
      result !== null &&
      "success" in result &&
      (result.success === "true" || result.success === true);
    const providerRejected = !response.ok || !providerSucceeded;

    if (providerRejected) {
      if (/confirm|activat|verif/i.test(providerMessage))
        return NextResponse.json(
          {
            message:
              "The contact email needs to be confirmed with FormSubmit before it can receive messages. Check its inbox for the activation email.",
          },
          { status: 503 },
        );
      console.error("FormSubmit rejected a contact message.", {
        status: response.status,
        message: providerMessage.slice(0, 180),
      });
      return NextResponse.json(
        {
          message:
            "Your message could not be sent right now. Please email me directly.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "Contact delivery request failed.",
      error instanceof Error ? error.name : "Unknown error",
    );
    return NextResponse.json(
      {
        message: "Your message could not be sent right now. Please try again or email me directly.",
      },
      { status: 502 },
    );
  }
}
