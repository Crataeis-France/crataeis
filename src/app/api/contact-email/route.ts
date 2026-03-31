import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

type ContactPayload = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const resendApiKey = process.env.RESEND_API;
    const contactEmail = process.env.CONTACT_EMAIL;
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    if (!resendApiKey || !contactEmail || !resend) {
      return Response.json(
        { error: "Missing server email configuration." },
        { status: 500 },
      );
    }

    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const service = body.service?.trim();
    const message = body.message?.trim();

    if (!name || !email || !service || !message) {
      return Response.json(
        { error: "name, email, service, and message are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }
    const { error } = await resend.emails.send({
      from: "Crataeis Contact <no-reply@crataeis.com>",
      to: [contactEmail],
      replyTo: email,
      subject: `Crataeis Contact Inquiry from ${name}`,
      react: EmailTemplate({ name, email, service, message }),
    });
    if (error) {
      return Response.json(
        { error: error.message ?? "Email provider rejected the request." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("contact-email route failed", err);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }
}
