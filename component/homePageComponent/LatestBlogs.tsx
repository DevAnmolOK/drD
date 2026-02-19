import Image from "next/image";
import TagBadge from "../ui/TagBadge";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";



export default function LatestBlogs() {
  const data = {
    header: {
      tag: "OUR BLOGS",
      titleTag:"Latest",
      title: " News & Blogs",
      button: {
        label: "All Blogs",
        href: "/blogs",
      },
    },

    blogs: [
      {
        image: "/images/pcd01.png",
        title:
          "Top 4 Medical PCD Products with High Demand in the Indian Pharma Market",
        href: "/blog/top-4-medical-pcd-products",
      },
      {
        image: "/images/pcd02.png",
        title:
          "Most Profitable Medical PCD Products for Pharma Franchise Business",
        href: "/blog/profitable-medical-pcd-products",
      },
    ],
  };

  return (
    <section className="bg-white py-16">
      <div className="wrapper mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <TagBadge text={data.header.tag} className="mb-3" />
            <h2 className="md:text-3xl lg:text-[48px] font-normal  text-[#253746]">
              {data.header.titleTag}
              <span className="font-semibold">  {data.header.title}</span>
            </h2>
          </div>

          <Button href={data.header.button.href}>
            {data.header.button.label}
          </Button>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {data.blogs.map((blog, i) => (
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
    <div className="relative rounded-2xl overflow-hidden group">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={600}
        height={380}
        className="w-full h-[260px] md:h-[320px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-5 left-5 right-16 text-white text-lg md:text-[24px] font-medium  lient-camp-2 leading-snug">
        {title}
      </div>
      <Link
        href={href}
        className="absolute bottom-5 right-5 w-10 h-10 bg-[#E53E3E] rounded-full flex items-center justify-center text-white text-lg group-hover:scale-110 transition"
      >
      <FaArrowRight size={12}/>
      </Link>
    </div>
  );
}
