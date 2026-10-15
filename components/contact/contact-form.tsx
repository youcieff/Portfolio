"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "subject" | "message", string>>;

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setErrors({});
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 422 && result.fields) setErrors(result.fields as FieldErrors);
        throw new Error(result.message ?? "The message could not be sent. Please try again.");
      }
      form.reset();
      setStatus({
        kind: "success",
        text: "Thanks! Your message has been sent. I’ll get back to you soon.",
      });
    } catch (error) {
      setStatus({
        kind: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again or email me directly.",
      });
    } finally {
      setPending(false);
    }
  }

  const error = (name: keyof FieldErrors) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
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
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {error("name")}
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
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {error("email")}
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
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {error("phone")}
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">
            Subject <span className="muted">(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            maxLength={140}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {error("subject")}
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="contact-message">Message *</label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={3000}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {error("message")}
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
          <p className="form-status" data-kind={status.kind} role="status" aria-live="polite">
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
