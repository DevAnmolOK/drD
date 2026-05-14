export function getAbsoluteUrl(path: string) {
  const base = process.env.META_URL?.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
