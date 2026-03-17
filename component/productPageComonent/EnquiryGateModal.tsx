"use client";
import { useState } from "react";

interface EnquiryGateModalProps {
  onSuccess: () => void;
  slug: string;
}

const EnquiryGateModal = ({ onSuccess, slug }: EnquiryGateModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // -------------------
  // Handle Input Change
  // -------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------
  // Validation
  // -------------------
  const validate = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    return newErrors;
  };

  // -------------------
  // Submit Handler
  // -------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    const message = `${formData.name} Visit this Secific Page ${slug} . Message  : ${formData.message}`;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: "general",
      formtype: "pcd",
      message: message,
    };

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      //  Replace with your real API
      const res = await fetch(
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

      if (!res.ok) throw new Error();

      setSubmitMessage("Thank you! We will contact you shortly.");

      //  Save in localStorage
      localStorage.setItem(
        "siteEnquiry",
        JSON.stringify({
          status: "success",
          time: Date.now(),
        }),
      );

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl relative">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Product Enquiry
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-secondary text-white py-3 rounded-lg disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryGateModal;
