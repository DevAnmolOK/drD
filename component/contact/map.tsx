interface MapProps {
  data?: any;
}
export default function Map({ data }: MapProps) {
  // console.log("Contact Us Data", mapEmbedCode);
  return (
    <>
      <div className="container mx-auto px-4 md:px-8 ">
        <div className="text-center mb-12">
          <p className="text-heading text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  mb-16">
            {data?.heading_start}
            <span className=" font-bold "> {data?.heading_bold}</span>
            {data?.heading_end}
          </p>
        </div>

        <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
          {/* You would integrate a real map here */}
          <div className="w-full  h-full  flex items-center justify-center">
            <iframe
              loading="lazy"
              src={data?.embdData}
              title="#3361, Serian Wala Mohalla, Mehna Chowk, Bathinda – 151001, Punjab, India"
              aria-label="#3361, Serian Wala Mohalla, Mehna Chowk, Bathinda – 151001, Punjab, India"
              width={"100%"}
              height={"500"}
              style={{
                border: 0,

                margin: 0,

                padding: 0,

                // filter:
                //   "brightness(100%) contrast(100%) saturate(0%) blur(0px) hue-rotate(0deg)",
              }}
            ></iframe>
            ;
          </div>
        </div>
      </div>
    </>
  );
}
