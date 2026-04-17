export function getAbsoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_CLIENT_URL?.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
