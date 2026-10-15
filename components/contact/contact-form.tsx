"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CircleCheck, LoaderCircle } from "lucide-react";
import { site } from "@/data/site";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{
    kind: "success" | "error";
    text: string;
    fallbackHref?: string;
  } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const value = (field: string) => String(data[field] ?? "").trim();
    const mailSubject = value("subject") || `Portfolio message from ${value("name")}`;
    const gmailBody = [
      "Hello Youssef,",
      "",
      "I’m reaching out through your portfolio.",
      "",
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone")}`,
      "",
      "Message:",
      value("message"),
    ].join("\n");
    const gmailComposeUrl = new URL("https://mail.google.com/mail/");
    gmailComposeUrl.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: site.email,
      su: mailSubject,
      body: gmailBody,
    }).toString();

    for (const [fieldName, minimum, message] of [
      ["name", 2, "Please enter your name."],
      ["phone", 7, "Please enter a valid phone number."],
      ["message", 5, "Please add a little more detail."],
    ] as const) {
      const field = form.elements.namedItem(fieldName);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.setCustomValidity(value(fieldName).length < minimum ? message : "");
      }
    }
    if (!form.reportValidity()) return;
    setPending(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12_000);
    try {
      const payload = new URLSearchParams();
      payload.set("name", value("name"));
      payload.set("email", value("email"));
      payload.set("phone", value("phone"));
      payload.set("subject", value("subject"));
      payload.set("_replyto", value("email"));
      payload.set("_subject", mailSubject);
      payload.set("_url", window.location.href);
      payload.set("message", value("message"));
      payload.set("_honey", value("_honey"));

      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      const succeeded =
        typeof result === "object" && result !== null && "success" in result &&
        (result.success === true || result.success === "true");

      if (!response.ok || !succeeded) {
        window.location.assign(gmailComposeUrl.toString());
        return;
      }
      form.reset();
      setStatus({
        kind: "success",
        text: "Thanks! Your message has been sent. I’ll get back to you soon.",
      });
    } catch {
      window.location.assign(gmailComposeUrl.toString());
    } finally {
      window.clearTimeout(timeoutId);
      setPending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">Send a message</span>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Your name *</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Your email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-phone">Phone number *</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={32}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">
            Subject <span className="muted">(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            maxLength={140}
          />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="contact-message">Message *</label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={3000}
            required
          />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="contact-company">Leave this field empty</label>
          <input id="contact-company" name="_honey" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <div className="form-bottom">
        <button className="button button-primary" type="submit" disabled={pending}>
          {pending ? (
            <>
              <LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
        {status && (
          <div className="form-status" role="status" aria-live="polite">
            <span className="form-status-icon"><CircleCheck size={21} aria-hidden="true" /></span>
            <span className="form-status-copy">
              <strong>Message sent</strong>
              <span>Thanks for reaching out. I’ll be in touch soon.</span>
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
