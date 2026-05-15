export const runtime = "nodejs";

const ZOHO_WEBFORM_ACTION_URL =
  process.env.ZOHO_WEBFORM_ACTION_URL ?? "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_WEBFORM_ACTION_TYPE =
  process.env.ZOHO_WEBFORM_ACTION_TYPE ?? "TGVhZHM=";

function getZohoConfig() {
  const xnQsjsdp = process.env.ZOHO_WEBFORM_XNQSJSDP;
  const xmIwtLD = process.env.ZOHO_WEBFORM_XMIWTLD;
  const returnURL = process.env.ZOHO_WEBFORM_RETURN_URL ?? "null";

  if (!xnQsjsdp || !xmIwtLD) {
    return null;
  }

  return { xnQsjsdp, xmIwtLD, returnURL };
}

function redactEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "[redacted]";
  const head = user.slice(0, 2);
  return `${head}***@${domain}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const zohoConfig = getZohoConfig();
    if (!zohoConfig) {
      console.error("[diagnostic submission] Zoho webform is not configured");
      return Response.json({ ok: false, error: "missing zoho config" }, { status: 500 });
    }

    if (typeof body?.companyName !== "string" || body.companyName.trim().length === 0) {
      return Response.json({ ok: false, error: "invalid company name" }, { status: 400 });
    }
    if (typeof body?.email !== "string" || !body.email.includes("@")) {
      return Response.json({ ok: false, error: "invalid email" }, { status: 400 });
    }

    const goal = body?.answers?.goal;
    const urgency = body?.answers?.urgency;
    const stack = body?.answers?.stack;

    if (
      !["vender", "centralizar", "escalar", "lancar"].includes(goal) ||
      !["urgente", "trimestre", "estrategico"].includes(urgency) ||
      !["zoho", "discord", "varios", "zero"].includes(stack)
    ) {
      return Response.json({ ok: false, error: "invalid answers" }, { status: 400 });
    }

    const payload = new URLSearchParams({
      xnQsjsdp: zohoConfig.xnQsjsdp,
      zc_gad: "",
      xmIwtLD: zohoConfig.xmIwtLD,
      actionType: ZOHO_WEBFORM_ACTION_TYPE,
      returnURL: zohoConfig.returnURL,
      LEADCF2: goal,
      LEADCF3: urgency,
      LEADCF4: stack,
      Email: body.email,
      "Last Name": body.companyName.trim(),
      aG9uZXlwb3Q: "",
    });

    const zohoRes = await fetch(ZOHO_WEBFORM_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    if (!zohoRes.ok) {
      console.error("[diagnostic submission] Zoho rejected the webform", zohoRes.status);
      return Response.json({ ok: false, error: "zoho submit failed" }, { status: 502 });
    }

    console.log(
      "[diagnostic submission]",
      JSON.stringify({
        companyName: body.companyName.trim(),
        email: redactEmail(body.email),
        goal,
        urgency,
        stack,
        ts: body.ts ?? Date.now(),
      }),
    );
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "bad request" }, { status: 400 });
  }
}
