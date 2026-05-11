export const runtime = "nodejs";

// TODO(sparamer): wire this endpoint to a real destination (Resend, Slack
// webhook, CRM). Until then, the submission is acknowledged but only a
// redacted log line is emitted — the raw email/answers are not persisted.

function redactEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "[redacted]";
  const head = user.slice(0, 2);
  return `${head}***@${domain}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (typeof body?.email !== "string" || !body.email.includes("@")) {
      return Response.json({ ok: false, error: "invalid email" }, { status: 400 });
    }
    console.log(
      "[diagnostic submission]",
      JSON.stringify({
        email: redactEmail(body.email),
        recommendation: body.recommendation?.service ?? null,
        ts: body.ts ?? Date.now(),
      }),
    );
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "bad request" }, { status: 400 });
  }
}
