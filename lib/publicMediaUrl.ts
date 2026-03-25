/**
 * SSR uses loopback API URLs; Laravel may still emit 127.0.0.1 in strings.
 * Browsers cannot load those — rewrite to the public site origin.
 */
export function publicMediaUrl(src: string | undefined | null): string {
  if (src == null || src === "") return "";
  if (typeof src !== "string") return "";
  const origin = (
    process.env.NEXT_PUBLIC_API_URL_IMAGE || "https://drdpharma.in"
  ).replace(/\/$/, "");
  let s = src;
  s = s.replace(/https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/gi, origin);
  s = s.replace(/^\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?=\/)/g, origin);
  return s;
}
