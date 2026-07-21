"use client";
import Link from "next/link";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface MobileContactCTAProps {
  phoneNumber?: string;
}

export default function MobileContactCTA({ phoneNumber }: MobileContactCTAProps) {
  const router = useRouter();
  const rawPhone = phoneNumber?.trim() || "+919041246545";
  const numericPhone = rawPhone.replace(/[^\d+]/g, "");
  const phoneHref = `tel:${numericPhone}`;
  const whatsappMessage = `Hello! I'd like to know more about your PCD Pharma Franchise. Please share your product catalog and pricing`;

  const whatsappHref = `https://wa.me/${numericPhone.replace(
    /^\+/,
    "",
  )}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-4 lg:right-4 z-50 mx-auto flex lg:flex-col w-full lg:w-fit lg:item-end items-center  lg:justify-end justify-between gap-2 rounded-full bg-white/95 lg:bg-transparent px-2 py-2 shadow-2xl lg:shadow-none ring-1 lg:ring-0 ring-slate-200  backdrop-blur-sm ">
      <Link
        href="/contact-us"
        onClick={() => {
          setTimeout(() => router.refresh(), 50);
        }}
        className="md:hidden flex min-w-24 flex-1 items-center justify-center gap-2 rounded-full bg-secondary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
      >
        <FiMail className="h-4 w-4" />
        <span>Contact</span>
      </Link>

      <Link
        href={phoneHref}
        className="flex min-w-24 flex-1 items-center justify-center gap-2 rounded-full bg-bgSecondarytwo px-3 py-2 lg:py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-emerald-700"
      >
        <FiPhoneCall className="h-4 w-4 lg:h-18 lg:w-18 lg:p-2" />
        <span className="lg:hidden">Call</span>
      </Link>

      <Link
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="flex min-w-24 flex-1 flex-nowrap items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-2 lg:py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#1ebe5b]"
      >
        <FaWhatsapp className="h-4 w-4 lg:h-18 lg:w-18 lg:p-2" />
        <span className="lg:hidden">WhatsApp</span>
      </Link>
    </div>
  );
}
