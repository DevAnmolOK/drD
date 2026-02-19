"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiSend,
  FiBriefcase,
  FiMapPin,
  FiCheck,
} from "react-icons/fi";
import { TbBuildingEstate } from "react-icons/tb";
import { BsSignpost } from "react-icons/bs";

interface EnquiryFormProps {
  heading: string;
  selectedProducts?: any[];
  setSelectedProducts?: React.Dispatch<React.SetStateAction<any[]>>;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  city: string;
  pincode: string;
  state: string;
  message: string;
  selectedLocations: { value: string; label: string }[];
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  city?: string;
  pincode?: string;
  state?: string;
  message?: string;
  locations?: string;
}

const EnquiryForm = ({
  heading,
  selectedProducts,
  setSelectedProducts,
}: EnquiryFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    businessType: "pcd",
    city: "",
    pincode: "",
    state: "",
    message: "",
    selectedLocations: [],
  });
  // console.log("SelectedProduct on Enquirey form:", selectedProducts);
  const [locations, setLocations] = useState<
    { value: string; label: string }[]
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetchPinCodeDetails(formData.pincode);
    }
  }, [formData.pincode]);

  const fetchPinCodeDetails = async (zip: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POSTAL_API_URL}/api/postal/service/get?pincode=${zip}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
          },
          cache: "no-store",
        },
      );
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        city: data?.city?.[0]?.value || data?.message,
        state: data?.states?.[0]?.value || data?.message,
      }));

      const mapped =
        data?.location?.map((loc: any) => ({
          value: loc.value,
          label: loc.value,
        })) || [];
      setLocations(mapped);

      console.log("Pincode Details:", data);
    } catch (error) {
      console.error("Faild to fetch Address", error);
      return null;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "pincode") {
      newValue = value.replace(/\D/g, "").slice(0, 6);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can contain only letters and spaces";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      // strict 10-digit validation
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = "Business type is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (formData.businessType === "PCD Pharma Franchise") {
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      // if (locations.length > 0 && formData.selectedLocations.length === 0) {
      //   newErrors.locations = "Please select at least one location";
      // }
    } else if (formData.businessType === "Third-party Manufacturing") {
      if (!formData.city.trim()) newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formtype = formData.businessType.toLowerCase().includes("pcd")
      ? "pcd"
      : "thirdparty";

    const productDetails = (selectedProducts ?? [])
      .map(
        (p, index) =>
          `${index + 1}. Name: ${p.name},, Price: ₹${
            Number(p?.price?.["$numberDecimal"]) || 0
          }, Min Order Qty: ${p.minOrderQty}, Enquiry Qty: ${
            p.quantityForEnquiry
          }`,
      )
      .join(" | ");

    const messageWithProducts = productDetails
      ? ` products: ${productDetails} | Additional Message: ${formData.message}`
      : formData.message;

    // const address =
    //   formData.businessType === "pcd"
    //     ? `Pincode: ${formData.pincode}, City: ${formData.city}, State: ${formData.state}`
    //     : `City: ${formData.city}`;

    const address =
      formData.businessType === "PCD Pharma Franchise"
        ? `Pincode: ${formData.pincode}, City: ${formData.city}, State: ${
            formData.state
          }, Locations: ${formData.selectedLocations
            .map((l) => l.value)
            .join(", ")}`
        : `City: ${formData.city}`;

    console.log("Address:", address);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: "product",
      formtype: formtype,
      address: address,
      message: messageWithProducts,
    };
    // console.log("Payload:", payload);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/enquiry/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-secret-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        // console.error(response);

        throw new Error(`HTTP error! Status: ${response}`);
      }

      await response.json();
      setIsSubmitted(true);

      //  clear selected products from localStorage
      localStorage.removeItem("selectedProducts");

      //reset parent state so Floating Enquiry updates
      if (setSelectedProducts) setSelectedProducts([]);

      setTimeout(() => setIsSubmitted(false), 3000);

      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "pcd",
        city: "",
        pincode: "",
        state: "",
        message: "",
        selectedLocations: [],
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Failed to submit enquiry. Please try again later.");
    }
  };

  const inputClasses =
    "w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 placeholder:text-subitle focus:border-none focus:ring-2 focus:ring-textPrimary focus:border-transparent transition-all duration-200";

  return (
    <div className="bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden  ">
      <div className="px-6 pt-6 pb-4   bg-gradient-to-r from-[#253746]  to-[#162836] text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <FiMessageSquare className="mr-3" />
          {heading}
        </h2>
        <p className="mt-2 text-white">
          Get detailed information about our products
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6 success-message">
            <div className="flex items-center">
              {"Thank you for contacting us! We will get back to you shortly."}
            </div>
          </div>
        ) : (
          <>
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Business Type */}
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-3.5 text-gray-400" />
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="pcd">Franchise Opportunity</option>
                <option value="thirdparty">Third-party Manufacturing</option>
              </select>
              {errors.businessType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.businessType}
                </p>
              )}
            </div>

            {formData.businessType === "pcd" ? (
              <>
                <div className=" grid grid-cols-2 gap-2">
                  {/* Pincode */}
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="number"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Pin Code"
                      onKeyDown={(e) => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault();
                        }
                      }}
                      onWheel={(e) => {
                        e.currentTarget.blur();
                      }}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>

                  {/* state */}
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" grid grid-cols-2 gap-2">
                  {/* City */}
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* Multi Location */}
                  {locations.length > 0 && (
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                      <div
                        className={`flex flex-wrap gap-2  py-3 pl-10 pr-2  rounded-xl border border-gray-200 cursor-pointer focus-within:ring-2 focus-within:ring-primary1/40 focus-within:border-primary1 ${
                          errors.locations
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => setDropdownOpen((prev) => !prev)}
                      >
                        {formData.selectedLocations.length > 0 ? (
                          formData.selectedLocations.map((loc, idx) => (
                            <span
                              key={idx}
                              className="flex items-center bg-primary2/10 text-primary2/80 text-sm px-2 py-1 rounded"
                            >
                              {loc.label}
                              <button
                                type="button"
                                className="ml-1 text-black hover:text-white hover:bg-gray-500   rounded-full w-4 h-4 flex items-center justify-center "
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormData((prev) => ({
                                    ...prev,
                                    selectedLocations:
                                      prev.selectedLocations.filter(
                                        (_, i) => i !== idx,
                                      ),
                                  }));
                                }}
                              >
                                &times;
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-base">
                            Select Location
                          </span>
                        )}
                      </div>

                      {/* Dropdown List */}
                      {dropdownOpen && (
                        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                          {locations.map((loc, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 hover:bg-primary1/20 cursor-pointer text-gray1 text-sm"
                              onClick={() => {
                                if (
                                  !formData.selectedLocations.find(
                                    (selected) => selected.value === loc.value,
                                  )
                                ) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    selectedLocations: [
                                      ...prev.selectedLocations,
                                      loc,
                                    ],
                                  }));
                                }
                              }}
                            >
                              {loc.label}
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.locations && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.locations}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* City */}
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="State"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </>
            )}

            {/* Message */}
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={inputClasses + " resize-none"}
                placeholder="Your Message"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="submit-button w-full bg-secondary text-white py-3 px-6 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FiSend className="mr-2" />
              Send Enquiry
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default EnquiryForm;
