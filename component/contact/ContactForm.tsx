"use client";

import { FormEvent, useEffect, useState } from "react";
import { MdExpandMore, MdSend } from "react-icons/md";

interface Option {
  value: string;
  label: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  city?: string;
  pincode?: string;
  state?: string;
  number?: string;
  message?: string;
  businessType?: string;
  locations?: string;
  drugLicense?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    number: "",
    pincode: "",
    city: "",
    state: "",
    businessType: "PCD Pharma Franchise",
    message: "",
    selectedLocations: [] as Option[],
    drugLicense: "",
  });

  const [locations, setLocations] = useState<Option[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  /* ---------------- PINCODE LOOKUP (Form-2) ---------------- */

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetchPinCodeDetails(formData.pincode);
    }
  }, [formData.pincode]);

  const fetchPinCodeDetails = async (zip: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POSTAL_API_URL}/api/postal/service/get?pincode=${zip}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
          },
          cache: "no-store",
        },
      );

      const data = await res.json();

      setFormData((p) => ({
        ...p,
        city: data?.city?.[0]?.value || "",
        state: data?.states?.[0]?.value || "",
      }));

      const mapped =
        data?.location?.map((l: any) => ({
          value: l.value,
          label: l.value,
        })) || [];

      setLocations(mapped);
    } catch (e) {
      console.error(e);
    }
  };

  /* ---------------- CHANGE HANDLER ---------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    let v = value;

    if (name === "pincode") v = value.replace(/\D/g, "").slice(0, 6);

    setFormData((p) => ({ ...p, [name]: v }));

    if (errors[name as keyof FormErrors]) {
      setErrors((p) => ({ ...p, [name]: "" }));
    }
  };

  /* ---------------- VALIDATION (Form-2) ---------------- */

  const validateForm = () => {
    const e: FormErrors = {};

    if (!formData.full_name.trim()) e.full_name = "Name is required";
    else if (formData.full_name.length < 2)
      e.full_name = "Minimum 2 characters";

    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email";

    if (!formData.number.trim()) e.number = "Phone is required";
    else if (!/^\d{10}$/.test(formData.number))
      e.number = "Enter 10 digit number";

    if (!formData.businessType) e.businessType = "Business type is required";

    if (!formData.drugLicense) e.drugLicense = "Select drug licence";

    if (!formData.message.trim()) e.message = "Message is required";

    if (formData.businessType === "PCD Pharma Franchise") {
      if (!/^\d{6}$/.test(formData.pincode))
        e.pincode = "Valid pincode required";

      if (!formData.city) e.city = "City required";
      if (!formData.state) e.state = "State required";

      if (locations.length && !formData.selectedLocations.length) {
        e.locations = "Select at least one location";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- SUBMIT (Form-2) ---------------- */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    const formtype = formData.businessType.toLowerCase().includes("pcd")
      ? "pcd"
      : "thirdparty";

    const address =
      formData.businessType === "PCD Pharma Franchise"
        ? `Pincode: ${formData.pincode}, City: ${formData.city}, State: ${
            formData.state
          }, Locations: ${formData.selectedLocations
            .map((l) => l.value)
            .join(", ")}`
        : `City: ${formData.city}`;

    const payload = {
      name: formData.full_name,
      email: formData.email,
      phone: formData.number,
      type: "general",
      formtype,
      address,
      message: formData.message,
      isLicence: formData.drugLicense,
    };

    try {
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

      setFormData({
        full_name: "",
        email: "",
        number: "",
        pincode: "",
        city: "",
        state: "",
        businessType: "PCD Pharma Franchise",
        message: "",
        selectedLocations: [],
        drugLicense: "",
      });

      setLocations([]);
      setErrors({});
    } catch {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ===================================================== */

  return (
    <div>
      <h2 className="text-heading text-[2rem] font-semibold  leading-[1.1667] align-middle capitalize tracking-[1.5px]  mb-2">
        Send a Message
      </h2>

      <p className="text-textSecondary pb-6">
        Briefly describe your requirements and our specialist will reach out
        within 2 hours.
      </p>

      {submitMessage && (
        <p className="pb-4 text-green-600 font-medium">{submitMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ---------------- name / email ---------------- */}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full name */}
          <div className="relative group">
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
              placeholder=" "
              type="text"
            />
            <label
              className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
            peer-focus:-translate-y-6 peer-focus:scale-[0.85]
            peer-[&:not(:placeholder-shown)]:-translate-y-6
            peer-[&:not(:placeholder-shown)]:scale-[0.85]
            peer-[&:not(:placeholder-shown)]:text-link"
            >
              Full Name
            </label>
            {errors.full_name && (
              <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative group">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
              placeholder=" "
              type="email"
            />
            <label
              className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
            peer-focus:-translate-y-6 peer-focus:scale-[0.85]
            peer-[&:not(:placeholder-shown)]:-translate-y-6
            peer-[&:not(:placeholder-shown)]:scale-[0.85]
            peer-[&:not(:placeholder-shown)]:text-link"
            >
              Email Address
            </label>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* ---------------- phone / businessType ---------------- */}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="relative group">
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
              placeholder=" "
              type="tel"
            />
            <label
              className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
            peer-focus:-translate-y-6 peer-focus:scale-[0.85]
            peer-[&:not(:placeholder-shown)]:-translate-y-6
            peer-[&:not(:placeholder-shown)]:scale-[0.85]
            peer-[&:not(:placeholder-shown)]:text-link"
            >
              Phone Number
            </label>
            {errors.number && (
              <p className="text-sm text-red-500 mt-1">{errors.number}</p>
            )}
          </div>

          {/* Business type (UI = Form-1, logic = Form-2) */}
          <div className="relative group">
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading appearance-none outline-none"
            >
              <option value="PCD Pharma Franchise">PCD Pharma Franchise</option>
              <option value="Third-party manufacturing">
                Third-party Manufacturing
              </option>
            </select>

            <label
              className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
            peer-focus:-translate-y-6 peer-focus:scale-[0.85]
            peer-[&:has(option:checked:not([value='']))]:-translate-y-6
            peer-[&:has(option:checked:not([value='']))]:scale-[0.85]
            peer-[&:not(:placeholder-shown)]:text-link"
            >
              Business Type
            </label>

            <div className="absolute right-0 top-4 pointer-events-none">
              <MdExpandMore className="text-description text-xl" />
            </div>

            {errors.businessType && (
              <p className="text-sm text-red-500 mt-1">{errors.businessType}</p>
            )}
          </div>
        </div>

        {/* ---------------- PCD specific ---------------- */}

        {formData.businessType === "PCD Pharma Franchise" ? (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {/* pincode */}
              <div className="relative group">
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
                  placeholder=" "
                  type="text"
                />
                <label
                  className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
                peer-focus:-translate-y-6 peer-focus:scale-[0.85]
                peer-[&:not(:placeholder-shown)]:-translate-y-6
                peer-[&:not(:placeholder-shown)]:scale-[0.85]
                peer-[&:not(:placeholder-shown)]:text-link"
                >
                  Pin Code
                </label>
                {errors.pincode && (
                  <p className="text-sm text-red-500 mt-1">{errors.pincode}</p>
                )}
              </div>

              {/* state */}
              <div className="relative group">
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
                  placeholder=" "
                  type="text"
                />
                <label
                  className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
                peer-focus:-translate-y-6 peer-focus:scale-[0.85]
                peer-[&:not(:placeholder-shown)]:-translate-y-6
                peer-[&:not(:placeholder-shown)]:scale-[0.85]
                peer-[&:not(:placeholder-shown)]:text-link"
                >
                  State
                </label>
                {errors.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            {/* city / locations */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* city */}
              <div className="relative group">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
                  placeholder=" "
                  type="text"
                />
                <label
                  className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
                peer-focus:-translate-y-6 peer-focus:scale-[0.85]
                peer-[&:not(:placeholder-shown)]:-translate-y-6
                peer-[&:not(:placeholder-shown)]:scale-[0.85]
                peer-[&:not(:placeholder-shown)]:text-link"
                >
                  City
                </label>
                {errors.city && (
                  <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                )}
              </div>

              {/* MULTI LOCATION – UI same line style as Form-1 */}
              {locations.length > 0 && (
                <div className="relative group">
                  <div
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
                  >
                    {formData.selectedLocations.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedLocations.map((l, idx) => (
                          <span
                            key={idx}
                            className="flex items-center bg-textPrimary/10 text-textPrimary/80 text-sm px-2 py-1 rounded"
                          >
                            {l.label}
                            <button
                              type="button"
                              className="ml-1 text-black hover:text-white hover:bg-gray-500   rounded-full w-4 h-4 flex items-center justify-center"
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
                        ))}
                      </div>
                    ) : (
                      <span className="text-description">Select Location </span>
                    )}
                  </div>

                  <label
                    className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
                -translate-y-6 scale-[0.85]"
                  >
                    Locations
                  </label>

                  <div className="absolute right-0 top-4 pointer-events-none">
                    <MdExpandMore className="text-description text-xl" />
                  </div>

                  {dropdownOpen && (
                    <div className="absolute z-40 bg-white border mt-2 rounded-md w-full max-h-44 overflow-auto">
                      {locations.map((loc) => (
                        <div
                          key={loc.value}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            if (
                              !formData.selectedLocations.find(
                                (x) => x.value === loc.value,
                              )
                            ) {
                              setFormData((p) => ({
                                ...p,
                                selectedLocations: [
                                  ...p.selectedLocations,
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
                    <p className="text-sm text-red-500 mt-1">
                      {errors.locations}
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="relative group">
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent outline-none"
              placeholder=" "
              type="text"
            />
            <label
              className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
                peer-focus:-translate-y-6 peer-focus:scale-[0.85]
                peer-[&:not(:placeholder-shown)]:-translate-y-6
                peer-[&:not(:placeholder-shown)]:scale-[0.85]"
            >
              City
            </label>
            {errors.city && (
              <p className="text-sm text-red-500 mt-1">{errors.city}</p>
            )}
          </div>
        )}

        {/* ---------------- Drug licence ---------------- */}

        <div className="flex gap-6 items-center pt-2">
          <span className="text-sm text-description">Have Drug Licence?</span>
          {["Yes", "No", "Applied"].map((o) => (
            <label key={o} className="flex gap-2 items-center">
              <input
                type="radio"
                name="drugLicense"
                value={o}
                checked={formData.drugLicense === o}
                onChange={handleChange}
              />
              <span className="text-sm">{o}</span>
            </label>
          ))}
          {errors.drugLicense && (
            <p className="text-sm text-red-500">{errors.drugLicense}</p>
          )}
        </div>

        {/* ---------------- Message ---------------- */}

        <div className="relative group lg:pb-6">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="peer w-full border-0 border-b border-[#e8e8e8] bg-transparent py-2 focus:ring-0 focus:border-secondary/80 transition-all text-heading placeholder-transparent resize-none outline-none"
            placeholder=" "
            rows={4}
          />
          <label
            className="absolute left-0 top-3 text-description transition-all pointer-events-none origin-left
          peer-focus:-translate-y-6 peer-focus:scale-[0.85]
          peer-[&:not(:placeholder-shown)]:-translate-y-6
          peer-[&:not(:placeholder-shown)]:scale-[0.85]"
          >
            Your Message
          </label>
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">{errors.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-secondary text-white lg:mt-10  font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send Message"}{" "}
          <MdSend className="text-xl" />
        </button>
      </form>
    </div>
  );
}
