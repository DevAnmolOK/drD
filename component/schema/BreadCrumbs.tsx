"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbProps = {
  styles?: string;
  color?: string;
  customBread?: boolean;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  styles,
  color,
  customBread = false,
}) => {
  const pathname = usePathname();

  const excludedSegments = [
    "product-forms",
    "product-category",
    "product-concern",
    "product-speciality",
  ];

  const pathSegments = pathname
    .split("/")
    .filter(
      (seg) => Boolean(seg) && !excludedSegments.includes(seg.toLowerCase()),
    );

  const formatSegment = (seg: string) =>
    seg.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const router = useRouter();

  return (
    <div className={styles ? styles : ""}>
      <ol
        className={` ${color} flex text-base leading-[140%] font-medium align-middle text-white text-center text-wrap`}
      >
        <li>
          <Link
            href="/"
            className="hover:underline sm:mr-0 mr-2"
            onClick={() => {
              setTimeout(() => router.refresh(), 50);
            }}
          >
            Home
          </Link>
        </li>
        {customBread && (
          <>
            <li>
              <Link
                href="/category/our-blog"
                className="hover:underline sm:mr-0 mr-2"
                onClick={() => {
                  setTimeout(() => router.refresh(), 50);
                }}
              >
                /category
              </Link>
            </li>
            <li>
              <Link
                href="/category/our-blog"
                className="hover:underline sm:mr-0 mr-2"
                onClick={() => {
                  setTimeout(() => router.refresh(), 50);
                }}
              >
                /our-blog
              </Link>
            </li>
          </>
        )}

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex  space-x-2">
              <span className="mx-0.5">{"/"}</span>
              {isLast ? (
                <Link
                  href={pathname}
                  className="capitalize hover:underline"
                  onClick={() => {
                    setTimeout(() => router.refresh(), 50);
                  }}
                >
                  {formatSegment(segment)}
                </Link>
              ) : (
                <Link
                  href={href}
                  className="hover:underline capitalize"
                  onClick={() => {
                    setTimeout(() => router.refresh(), 50);
                  }}
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
