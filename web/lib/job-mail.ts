import {
  getContactRecipients,
  getMailFromAddress,
  getMailgunClient,
} from "@/lib/mailgun";
import { formatCents } from "@/lib/money";
import { getSiteUrl } from "@/lib/stripe";
import { site } from "@/lib/site-config";
import type { Booking } from "@prisma/client";

async function sendMail(options: {
  to: string[];
  subject: string;
  text: string;
  html: string;
}) {
  const mailgun = getMailgunClient();
  const from = getMailFromAddress();
  const domain = process.env.MAILGUN_DOMAIN;

  if (!mailgun || !from || !domain) {
    throw new Error("MAILGUN_NOT_CONFIGURED");
  }

  await mailgun.messages.create(domain, {
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

function jobUrl(token: string): string {
  return `${getSiteUrl()}/jobs/${token}`;
}

export async function sendJobCompletedEmail(booking: Booking): Promise<void> {
  if (!booking.publicToken || booking.amountChargedCents == null) {
    throw new Error("Job is not ready for customer email.");
  }

  const url = jobUrl(booking.publicToken);
  const amount = formatCents(booking.amountChargedCents);
  const payUrl = `${url}#pay`;

  await sendMail({
    to: [booking.customerEmail],
    subject: `Your service is complete — ${site.shortName}`,
    text: `Hi ${booking.customerName},

Your construction clean up is complete! View photos and pay your invoice (${amount}):

${url}

Pay now: ${payUrl}

— ${site.name}`,
    html: `
<p>Hi ${booking.customerName},</p>
<p>Your construction clean up is <strong>complete</strong>! View your job summary, before/after photos, and invoice at the link below.</p>
<p style="margin:24px 0;">
  <a href="${payUrl}" style="display:inline-block;background:#e67e22;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;">Pay ${amount}</a>
</p>
<p><a href="${url}">View your job summary &amp; photos</a></p>
<p>— ${site.name}</p>`,
  });
}

export async function sendInvoiceEmail(
  booking: Booking,
  invoiceHtml: string
): Promise<void> {
  await sendMail({
    to: [booking.customerEmail],
    subject: `Invoice ${booking.invoiceNumber} — ${site.shortName}`,
    text: `Hi ${booking.customerName},

Thank you for your payment! Your invoice ${booking.invoiceNumber} is attached below.

${booking.publicToken ? jobUrl(booking.publicToken) : ""}

— ${site.name}`,
    html: `
<p>Hi ${booking.customerName},</p>
<p>Thank you for your payment! Here is your invoice <strong>${booking.invoiceNumber}</strong>.</p>
${booking.publicToken ? `<p><a href="${jobUrl(booking.publicToken)}">View job summary</a></p>` : ""}
<hr />
${invoiceHtml}`,
  });

  const admins = getContactRecipients();
  if (admins.length > 0) {
    await sendMail({
      to: admins,
      subject: `Payment received — ${booking.customerName} (${formatCents(booking.amountChargedCents ?? 0)})`,
      text: `Payment received for booking ${booking.id}. Invoice ${booking.invoiceNumber}.`,
      html: `<p>Payment received for <strong>${booking.customerName}</strong>.</p><p>Invoice ${booking.invoiceNumber}</p>`,
    });
  }
}
