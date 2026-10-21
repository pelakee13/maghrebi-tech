# Contract: Contact Form Submission

Interface: Server Action `submitContact(prevState, formData)` in `actions/contact.ts`, invoked by the
`ContactForm` client component via `useActionState`. No public REST endpoint exists.

## Input (FormData)
| Field | Required | Rule |
|-------|----------|------|
| `name` | yes | 2-80 chars after trim |
| `email` | yes | valid email, <= 254 |
| `message` | yes | 10-2000 chars after trim |
| `locale` | yes | `fa` or `en` |
| `website` | hidden | honeypot, MUST be empty |
| `startedAt` | hidden | epoch ms at render; elapsed < 3 s -> rejected |
| `cf-turnstile-response` | when configured | verified server-side with Cloudflare |

## Output (state returned to the form)
```ts
type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; code: 'validation'; fields: Partial<Record<'name'|'email'|'message', ErrorKey>>; values: { name: string; email: string; message: string } }
  | { status: 'error'; code: 'spam' | 'rate_limited' | 'delivery_failed' };
```
`ErrorKey` values map to localized strings in `messages/<locale>.json` under `form.errors.*`; the
server never returns raw English text. On any error, `values` are returned so input is preserved.

## Behaviour
1. Parse and validate with the shared zod schema; failure -> `validation`.
2. Honeypot filled or too-fast submission -> `spam` (silent-looking generic message, no hint of the rule).
3. Rate limit 5 submissions/hour/IP (in-memory) -> `rate_limited`.
4. Verify Turnstile token if keys exist -> `spam` on failure.
5. Call `notifier.notify(message)`. **v1 `LogNotifier`** writes one anonymised log line (timestamp, locale, outcome, message length) and never logs name, email or body; it always succeeds. A future `EmailNotifier` (Resend/SMTP) implements the same interface; its failure -> `delivery_failed` and the UI shows the direct-contact details (`amin.mb21@gmail.com`, Telegram `@aminmaghrebi`).
6. Success -> `success` with a localized confirmation; the form resets.
7. Never log message bodies or emails; log only an anonymised outcome code.

## Environment
v1 requires only `SITE_URL`; `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are optional. Email variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) are reserved for the later `EmailNotifier` and unused now.
