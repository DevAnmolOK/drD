/** @format */

import ContactForm from "../../component/contact/ContactForm";

import CommonHeroSection from "../../component/common/CommonHeroSection";
import { ContactUsEndPoints } from "../../lib/service/ContactUsPageEndPoints";
import Map from "@/component/contact/map";
import Image from "next/image";

export default async function ContactUSPage() {
  const contactUSPageData = await ContactUsEndPoints.contactUsPage();
  const { officeData, heroSectionData } =
    contactUSPageData.ContactUSPageData || {};
  const map = {
    heading_start: "Visit our",
    heading_bold: "headquarters",
    heading_end: "or reach out to us online",
    embdData:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54773.00740713477!2d76.82159773491381!3d30.90587516593629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff569da45e4bb%3A0xde121e5eea7ece12!2sDr.%20D%20Pharma%20-%20Derma%20Range%20%7C%20Ortho%20Range%20%7C%20Gynae%20Range!5e0!3m2!1sen!2sin!4v1771331898755!5m2!1sen!2sin",
  };
  return (
    <div className="scroll-smooth  transition-colors duration-300 ">
      <CommonHeroSection heroSectionData={heroSectionData} />

      {/* ===================== FORM + MAP ===================== */}
      <section
        className="wrapper mx-auto py-12 sm:py-24 flex flex-col gap-20"
        id="map"
      >
        <div className="flex flex-col-reverse lg:flex-row bg-white shadow-[0_4px_20px_rgba(20,44,82,0.08)] rounded-2xl overflow-hidden border border-[#142C52]/5">
          {/* Left  Map */}
          <div className="lg:w-[40%] bg-white p-10 md:p-14 rounded-xlborder border-[#142C52]/5  transition-colors ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-6">
              {officeData?.map((office: any, index: number) => (
                <div key={index}>
                  <h3 className="text-heading text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  mb-4">
                    {office.officeTitle}
                  </h3>

                  {office?.details?.map((item: any, idx: number) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className=" flex items-center gap-4 mb-6 group"
                      >
                        <div className="min-w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center  group-hover:bg-link/10 transition-colors">
                          {Icon && (
                            <Image
                              src={Icon}
                              alt="icon"
                              height={40}
                              width={40}
                            />
                          )}
                        </div>
                        <p className="text-description text-base leading-relaxed ">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Right  Form*/}
          <div className="lg:w-[60%] p-10 md:p-14 lg:border-l border-b border-[#e8e8e8]">
            <ContactForm />
          </div>
        </div>
        {/* Map Section */}
        <div className=" bg-white mb-[2rem] ">
          {<Map data={contactUSPageData?.mapData} />}
        </div>
      </section>
    </div>
  );
}
