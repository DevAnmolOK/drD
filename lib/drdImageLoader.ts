import type { ImageLoaderProps } from "next/image";
import { publicMediaUrl } from "./publicMediaUrl";

/** Hostnames where we skip `/_next/image` for `/storage/*` so the optimizer does not hairpin-fetch the public URL from this VPS. */
function collectSameSiteHostnames(): Set<string> {
  const hosts = new Set<string>();
  for (const raw of [
    process.env.NEXT_PUBLIC_API_URL_IMAGE,
    process.env.NEXT_PUBLIC_API_URL,
  ]) {
    if (!raw?.trim()) continue;
    try {
      hosts.add(new URL(raw).hostname);
    } catch {
      /* ignore */
    }
  }
  hosts.add("drdpharma.in");
  hosts.add("www.drdpharma.in");
  return hosts;
}

const SAME_SITE_HOSTS = collectSameSiteHostnames();

/**
 * Laravel `/storage/*` on our own domain: return the real URL so the browser loads it.
 * The image optimizer runs a server-side fetch to `url=`; fetching this machine's public
 * hostname from Node often fails (hairpin), which breaks `<img src="/_next/image?...">`.
 */
function shouldBypassOptimizer(absoluteUrl: string): boolean {
  try {
    const u = new URL(absoluteUrl);
    if (!SAME_SITE_HOSTS.has(u.hostname)) return false;
    return (
      u.pathname.startsWith("/storage/") ||
      u.pathname.startsWith("/vendor/") ||
      u.pathname.startsWith("/themes/")
    );
  } catch {
    return false;
  }
}

/** Mobile app / product dashboard CDN (NEXT_PUBLIC_PRODUCT_URL). Optimizer fetch from this VPS often fails. */
function collectProductDashboardHostnames(): Set<string> {
  const hosts = new Set<string>();
  hosts.add("app.drdpharma.in");
  const raw = process.env.NEXT_PUBLIC_PRODUCT_URL?.trim();
  if (raw) {
    try {
      hosts.add(new URL(raw).hostname);
    } catch {
      /* ignore */
    }
  }
  return hosts;
}

const PRODUCT_DASHBOARD_HOSTS = collectProductDashboardHostnames();

function shouldBypassProductDashboardUrl(absoluteUrl: string): boolean {
  try {
    const u = new URL(absoluteUrl);
    return PRODUCT_DASHBOARD_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

export default function drdImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const normalized = publicMediaUrl(src);

  // `public/*.svg` — optimizer pipeline is unreliable for SVG; use static path as `src`.
  if (normalized.startsWith("/")) {
    const pathOnly = normalized.split("?")[0] ?? "";
    if (/\.svg$/i.test(pathOnly)) {
      return normalized;
    }
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    if (shouldBypassOptimizer(normalized)) {
      return normalized;
    }
    if (shouldBypassProductDashboardUrl(normalized)) {
      return normalized;
    }
  }

  const q = quality ?? 75;
  return `/_next/image?url=${encodeURIComponent(normalized)}&w=${width}&q=${q}`;
}
