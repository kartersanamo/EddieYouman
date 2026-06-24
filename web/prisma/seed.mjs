import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const site = { slotDurationMinutes: 240 };

const DEFAULT_RULES = [
  { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", enabled: true },
  { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", enabled: true },
  { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", enabled: true },
  { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", enabled: true },
  { dayOfWeek: 5, startTime: "09:00", endTime: "17:00", enabled: true },
  { dayOfWeek: 6, startTime: "09:00", endTime: "17:00", enabled: false },
  { dayOfWeek: 0, startTime: "09:00", endTime: "17:00", enabled: false },
];

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Construction site cleanup in progress",
    category: "Construction Cleaning Services",
    sortOrder: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    alt: "Commercial building construction site",
    category: "Construction Cleaning Services",
    sortOrder: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-cd2a8a4d5c8e?w=800&q=80",
    alt: "Heavy equipment on construction site",
    category: "Premium Equipment Solutions",
    sortOrder: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    alt: "Post-construction interior cleanup",
    category: "Construction Cleaning Services",
    sortOrder: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    alt: "Commercial property exterior",
    category: "Government & State Agency Clean Up",
    sortOrder: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1598013276336-c9d3c5c0c8e8?w=800&q=80",
    alt: "Disaster cleanup and debris removal",
    category: "Emergency Disaster Cleanup",
    sortOrder: 5,
  },
];

function parseAdminEmails() {
  const raw =
    process.env.ADMIN_EMAILS?.trim() || process.env.ADMIN_EMAIL?.trim() || "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function seedGallery() {
  const count = await db.galleryImage.count();
  if (count > 0) {
    console.log("Gallery already seeded — skipping.");
    return;
  }

  for (const img of GALLERY_IMAGES) {
    await db.galleryImage.create({ data: img });
  }
  console.log(`Seeded ${GALLERY_IMAGES.length} gallery images.`);
}

async function backfillCustomers() {
  const bookings = await db.booking.findMany({
    orderBy: { createdAt: "asc" },
  });

  for (const booking of bookings) {
    const email = booking.customerEmail.trim().toLowerCase();
    await db.customer.upsert({
      where: { email },
      create: {
        email,
        name: booking.customerName,
        phone: booking.customerPhone,
        address: booking.address,
        source: "booking",
      },
      update: {
        name: booking.customerName,
        phone: booking.customerPhone,
        address: booking.address,
      },
    });
  }

  if (bookings.length > 0) {
    console.log(`Backfilled ${bookings.length} customers from bookings.`);
  }
}

async function seedDefaultTemplates() {
  const count = await db.emailTemplate.count();
  if (count > 0) return;

  await db.emailTemplate.create({
    data: {
      name: "Appointment reminder",
      subject: "Reminder: your cleanup appointment on {{date}}",
      bodyHtml:
        "<p>Hi {{name}},</p><p>This is a friendly reminder about your upcoming cleanup appointment on <strong>{{date}}</strong> at <strong>{{time}}</strong>.</p><p>We look forward to seeing you at {{address}}.</p><p>— Eddie Youman Services</p>",
    },
  });

  console.log("Seeded default email template.");
}

async function main() {
  await db.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", slotDurationMinutes: site.slotDurationMinutes },
    update: {},
  });

  for (const rule of DEFAULT_RULES) {
    await db.availabilityRule.upsert({
      where: { dayOfWeek: rule.dayOfWeek },
      create: rule,
      update: {},
    });
  }

  const emails = parseAdminEmails();
  const password = process.env.ADMIN_PASSWORD;

  if (emails.length > 0 && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    for (const email of emails) {
      const name = email.split("@")[0] ?? "Admin";
      await db.adminUser.upsert({
        where: { email },
        create: {
          email,
          name,
          passwordHash,
          mustChangePassword: true,
        },
        update: {},
      });
      console.log(`Admin user seeded: ${email}`);
    }
  } else {
    console.warn(
      "ADMIN_EMAILS (or ADMIN_EMAIL) and ADMIN_PASSWORD not set — skipping admin seed."
    );
  }

  await seedGallery();
  await backfillCustomers();
  await seedDefaultTemplates();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
