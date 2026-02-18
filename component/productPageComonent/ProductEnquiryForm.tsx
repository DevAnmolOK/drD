"use client";
import React, { useState, FormEvent, useEffect } from "react";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoBusinessOutline,
  IoCartOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { TbBuildingEstate } from "react-icons/tb";
import { BsSignpost } from "react-icons/bs";
import { RiSignpostLine } from "react-icons/ri";

interface ProductEnquiryFormProp {
  onClose: () => void;
  pid: string;
  pName: string;
  pDetail: string;
  qty: string;
  price: number;
}

interface FormData {
  pid: string;
  price: number;
  qty: string;
  pName: string;
  pDetail: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  pincode: string;
  state: string;
  manufacturer: string;
  quantity: string;
  message?: string;
}

export default function ProductEnquiryForm({
  onClose,
  pid,
  pName,
  pDetail,
  qty,
  price,
}: ProductEnquiryFormProp) {
  const [formData, setFormData] = useState<FormData>({
    pid,
    price,
    qty,
    pName,
    pDetail,
    full_name: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    state: "",
    manufacturer: "PCD Pharma Franchise",
    quantity: qty,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    } catch (error) {
      console.error("Faild to fetch Address", error);
      return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "pincode") {
      newValue = value.replace(/\D/g, "").slice(0, 6);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone number
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      // strict 10-digit validation
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.quantity) {
      newErrors.quantity = "Please enter quantity";
    } else if (Number(formData.quantity) < Number(qty)) {
      newErrors.quantity = `Minimum order quantity is ${qty}`;
    }

    if (formData.manufacturer === "PCD Pharma Franchise") {
      if (!formData.pincode.trim()) {
        newErrors.pincode = "Pincode is required";
      }
      if (!formData.state.trim()) {
        newErrors.state = "State is required";
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }
    } else if (formData.manufacturer === "Third-party Manufacturing") {
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formtype = formData.manufacturer.toLowerCase().includes("pcd")
      ? "pcd"
      : "thirdparty";

    const productDetails = `Name: ${pName}, ID: ${pid}, Price: ₹${price}, MOQ: ${qty}, Enquiry Qty: ${formData.quantity}, Detail: ${pDetail}`;

    const messageWithProducts = `Hello, I would like to enquire about this particular product: ${productDetails} | Additional Message: ${formData.message}`;

    const address =
      formData.manufacturer === "PCD Pharma Franchise"
        ? `Pincode: ${formData.pincode}, City: ${formData.city}, State: ${formData.state}`
        : `City: ${formData.city}`;

    const payload = {
      name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      type: "product",
      formtype,
      address: address,
      message: messageWithProducts,
    };

    setIsSubmitting(true);

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

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      await response.json();

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);

      setFormData({
        pid,
        price,
        qty,
        pName,
        pDetail,
        full_name: "",
        email: "",
        phone: "",
        city: "",
        pincode: "",
        state: "",
        manufacturer: "PCD pharma franchise",
        quantity: qty,
        message: "",
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert(`Failed to submit enquiry. Please try again later.${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6 success-message">
          <div className="flex items-center">
            {"Thank you for contacting us! We will get back to you shortly."}
          </div>
        </div>
      </div>
    );
  }

  const inputFields = [
    {
      type: "text",
      name: "full_name" as keyof FormData,
      placeholder: "Enter your full name",
      icon: <IoPersonOutline className="w-5 h-5 text-textPrimary/80" />,
    },
    {
      type: "email",
      name: "email" as keyof FormData,
      placeholder: "Enter your email address",
      icon: <IoMailOutline className="w-5 h-5 text-textPrimary/80" />,
    },
    {
      type: "tel",
      name: "phone" as keyof FormData,
      placeholder: "Enter your phone number",
      icon: <IoCallOutline className="w-5 h-5 text-textPrimary/80" />,
    },
    {
      type: "text",
      name: "city" as keyof FormData,
      placeholder: "Enter your city",
      icon: <IoLocationOutline className="w-5 h-5 text-textPrimary/80" />,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map(({ type, name, placeholder, icon }) => (
          <div key={name} className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {icon}
              </div>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full pl-10 pr-4 py-3 text-black border rounded-lg placeholder:text-gray-500 focus:ring-2 focus:ring-primary1 focus:border-none transition-all duration-400 ${
                  errors[name]
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-primary1"
                }`}
              />
            </div>
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <IoBusinessOutline className="w-5 h-5 text-textPrimary/80" />
          </div>
          <select
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            className="w-full pl-10 pr-4 text-black py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary1 focus:border-none transition-all duration-200 hover:border-gray-400 appearance-none bg-white"
          >
            <option value="PCD Pharma Franchise">Franchise Opportunity</option>
            <option value="Third-party manufacturing">
              Third-party Manufacturing
            </option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-textPrimary/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {formData.manufacturer === "PCD Pharma Franchise" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pincode */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <RiSignpostLine className="w-5 h-5 text-textPrimary/80" />
                </div>
                <input
                  type="number"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pin Code"
                  className={`w-full pl-10 pr-4 py-3 text-black border rounded-lg placeholder:text-gray-500 focus:ring-2 focus:ring-primary1 focus:border-none transition-all duration-200 ${
                    errors.pincode
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-primary1"
                  }`}
                />
              </div>
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
            {/* state */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <TbBuildingEstate className="w-5 h-5 text-textPrimary/80" />
                </div>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={`w-full pl-10 pr-4 py-3 text-black border rounded-lg placeholder:text-gray-500 focus:ring-2 focus:ring-primary1 focus:border-none transition-all duration-200 ${
                    errors.pincode
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-primary1"
                  }`}
                />
              </div>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="space-y-2">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <IoCartOutline className="w-5 h-5 text-textPrimary/80" />
          </div>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            min={qty}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-primary1 focus:border-none transition-transform duration-200 ${
              errors.quantity
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder={`Minimum quantity: ${qty}`}
          />
        </div>
        {errors.quantity && (
          <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
        )}
        <p className="text-xs text-black">
          Minimum order quantity is {qty} units
        </p>
      </div>
      <div className="relative">
        <FiMessageSquare className="absolute left-3 top-4 transform -translate-y-1/2 text-textPrimary/80" />
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className={`w-full pl-10 pr-4  text-black border rounded-lg placeholder:text-gray-500 focus:ring-2 focus:ring-primary1 focus:border-none transition-all duration-200 ${
            errors.message
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-primary1"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="submit-button w-full bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          <>
            <IoCheckmarkCircle className="w-5 h-5" />
            Place Enquiry
          </>
        )}
      </button>

      {/* <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our terms and conditions. We'll
        contact you within 24 hours.
      </p> */}
    </form>
  );
}
