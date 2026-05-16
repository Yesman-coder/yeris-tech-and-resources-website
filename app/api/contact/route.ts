import { Resend } from "resend";
import { z } from "zod";

const Body = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string(),
  projectType: z.string(),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, company, budget, projectType, message } = parsed.data;

  await resend.emails.send({
    from: "Yeris Site <hello@yeristech.com>",
    to: process.env.CONTACT_TO_EMAIL ?? "yeristech@gmail.com",
    replyTo: email,
    subject: `New inquiry — ${name}${company ? ` (${company})` : ""}`,
    text: [
      `From: ${name} <${email}>`,
      company && `Company: ${company}`,
      `Budget: ${budget}`,
      `Project: ${projectType}`,
      ``,
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return Response.json({ ok: true });
}
