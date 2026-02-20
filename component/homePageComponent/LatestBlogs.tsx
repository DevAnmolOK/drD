import Image from "next/image";
import TagBadge from "../ui/TagBadge";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function LatestBlogs({ homeBlogs }: any) {
  const { header, blogs } = homeBlogs.data || {};
  // const data = {
  //   header: {
  //     tag: "OUR BLOGS",
  //     titleTag:"Latest",
  //     title: " News & Blogs",
  //     button: {
  //       label: "All Blogs",
  //       href: "/blogs",
  //     },
  //   },

  //   blogs: [
  //     {
  //       image: "/images/pcd01.png",
  //       title:
  //         "Top 4 Medical PCD Products with High Demand in the Indian Pharma Market",
  //       href: "/blog/top-4-medical-pcd-products",
  //     },
  //     {
  //       image: "/images/pcd02.png",
  //       title:
  //         "Most Profitable Medical PCD Products for Pharma Franchise Business",
  //       href: "/blog/profitable-medical-pcd-products",
  //     },
  //   ],
  // };

  return (
    <section className="bg-white py-16">
      <div className="wrapper mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <TagBadge text={header.tag} className="mb-3" />
            <h2 className="md:text-3xl lg:text-[48px] font-normal  text-[#253746]">
              {header.title.line1}
              <span className="font-semibold"> {header.title.line2}</span>
            </h2>
          </div>

          <Button href={header.button.href}>{header.button.label}</Button>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.slice()?.map((blog: any, i: number) => (
            <BlogCard key={i} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Blog Card */
function BlogCard({
  image,
  title,
  href,
}: {
  image: string;
  title: string;
  href: string;
}) {
  return (
    <div className="relative rounded-[15px] overflow-hidden group">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={600}
        height={380}
        className="w-full h-[280px] md:h-[380px] object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent)]" />
      <div className="absolute bottom-5 left-5 right-16 text-white text-lg md:text-[24px] font-medium  lient-camp-2 leading-snug">
        {title}
      </div>
      <Link
        href={href}
        className="absolute bottom-5 right-5 w-10 h-10 bg-[#E53E3E] rounded-full flex items-center justify-center text-white text-lg group-hover:scale-110 transition"
      >
        <FaArrowRight size={12} />
      </Link>
    </div>
  );
}
