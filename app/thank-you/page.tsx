import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiMail,
  FiPackage,
  FiPhoneCall,
} from "react-icons/fi";

type Source = "contact" | "product" | "general";

type SearchParams = Promise<{
  source?: string | string[];
}>;

const pageContent: Record<
  Source,
  {
    badge: string;
    title: string;
    description: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  }
> = {
  contact: {
    badge: "Message Received",
    title: "Thanks for reaching out.",
    description:
      "Your message is with the DR D Pharma team. We will review your requirements and get back to you with the right next step.",
    primaryHref: "/contact-us",
    primaryLabel: "Back to Contact",
    secondaryHref: "/",
    secondaryLabel: "Return Home",
  },
  product: {
    badge: "Enquiry Submitted",
    title: "Thanks for your product enquiry.",
    description:
      "We have received your request for product details. Our team will follow up with availability, pricing, and the best way to proceed.",
    primaryHref: "/product",
    primaryLabel: "Explore Products",
    secondaryHref: "/contact-us",
    secondaryLabel: "Talk to Our Team",
  },
  general: {
    badge: "Request Received",
    title: "Thank you for connecting with us.",
    description:
      "Your request has been submitted successfully. A member of our team will respond shortly with the information you need.",
    primaryHref: "/",
    primaryLabel: "Return Home",
    secondaryHref: "/contact-us",
    secondaryLabel: "Contact Us",
  },
};

export const metadata: Metadata = {
  title: "Thank You | DR D Pharma",
  description:
    "Thank you for contacting DR D Pharma. Our team has received your request and will get back to you shortly.",
};

function resolveSource(source?: string | string[]): Source {
  const value = Array.isArray(source) ? source[0] : source;

  if (value === "contact" || value === "product") {
    return value;
  }

  return "general";
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const source = resolveSource(params?.source);
  const content = pageContent[source];

  const nextSteps = [
    "We review your request and match it with the right team member.",
    "We contact you with details, clarifications, or a quotation.",
    "We help you move forward with the next commercial or support step.",
  ];

  return (
    <main className="relative overflow-hidden bg-[#f5efe7]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(238,66,35,0.18), transparent 24%), radial-gradient(circle at 88% 12%, rgba(37,55,70,0.14), transparent 22%), linear-gradient(135deg, rgba(255,255,255,0.92), rgba(245,239,231,0.98))",
        }}
      />
      <div className="absolute -left-12 top-24 h-56 w-56 rounded-full bg-[#ee4223]/10 blur-3xl" />
      <div className="absolute right-0 top-36 h-72 w-72 rounded-full bg-[#253746]/10 blur-3xl" />

      <section className="wrapper relative mx-auto flex min-h-[calc(100vh-10rem)] items-center py-14 md:py-20">
        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(19rem,0.9fr)]">
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#253746] p-8 text-white shadow-[0_28px_80px_rgba(37,55,70,0.2)] md:p-12">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#ee4223]/18 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/8 blur-3xl" />

            <div className="relative flex flex-col gap-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm tracking-[0.18em] uppercase">
                <FiCheckCircle className="text-[#ffb097]" />
                {content.badge}
              </div>

              <div className="max-w-3xl">
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/65">
                  DR D Pharma
                </p>
                <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
                  {content.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
                  {content.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={content.primaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ee4223] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#d43a1e]"
                >
                  {content.primaryLabel}
                  <FiArrowRight />
                </Link>
                <Link
                  href={content.secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/14"
                >
                  <FiHome />
                  {content.secondaryLabel}
                </Link>
              </div>

              <div className="grid gap-4 pt-2 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-sm">
                  <FiClock className="mb-4 text-2xl text-[#ffb097]" />
                  <p className="text-sm uppercase tracking-[0.18em] text-white/55">
                    Response Window
                  </p>
                  <p className="mt-2 text-xl font-medium">Within 2 hours</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-sm">
                  <FiPackage className="mb-4 text-2xl text-[#ffb097]" />
                  <p className="text-sm uppercase tracking-[0.18em] text-white/55">
                    Request Status
                  </p>
                  <p className="mt-2 text-xl font-medium">Queued for review</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/7 p-5 backdrop-blur-sm">
                  <FiPhoneCall className="mb-4 text-2xl text-[#ffb097]" />
                  <p className="text-sm uppercase tracking-[0.18em] text-white/55">
                    Follow-Up
                  </p>
                  <p className="mt-2 text-xl font-medium">Call or email back</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-4xl border border-[#253746]/10 bg-white/88 p-8 shadow-[0_18px_50px_rgba(20,44,82,0.08)] backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.22em] text-[#253746]/55">
                What Happens Next
              </p>
              <div className="mt-6 space-y-5">
                {nextSteps.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#253746] text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-base leading-7 text-[#3d4e5d]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-[#ee4223]/12 bg-[#fff6f1] p-8 shadow-[0_16px_45px_rgba(238,66,35,0.08)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ee4223] text-white">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#ee4223]/75">
                    Need Faster Assistance
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#5d4a43]">
                    If your request is urgent, use the contact page to share
                    more detail and our team can prioritise the callback.
                  </p>
                  <Link
                    href="/contact-us#map"
                    className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#253746]"
                  >
                    Open contact page
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
