import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    if (!formData.agree) {
      setStatusMessage({
        type: "error",
        text: "Please agree to the terms and privacy policy.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your enquiry.");
      }

      setStatusMessage({
        type: "success",
        text: result.message || "Your enquiry has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-3xl px-0 py-8 mx-auto">
      <h1 className="mb-12 text-[70px] font-bold tracking-tight text-yellow-400">
        Get in Touch
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="h-15 w-full rounded-xl border-2 border-red-600 bg-transparent px-8 text-[20px] text-white outline-none placeholder:text-gray-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="h-15 w-full rounded-xl border-2 border-red-600 bg-transparent px-8 text-[20px] text-white outline-none placeholder:text-gray-400"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="h-15 w-full rounded-xl border-2 border-red-600 bg-transparent px-8 text-[20px] text-white outline-none placeholder:text-gray-400"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject Line"
          value={formData.subject}
          onChange={handleChange}
          className="h-15 w-full rounded-xl border-2 border-red-600 bg-transparent px-8 text-[20px] text-white outline-none placeholder:text-gray-400"
        />

        <textarea
          placeholder="Drop Your Message..."
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="h-50 w-full resize-none rounded-xl border-2 border-red-600 bg-transparent px-8 py-7 text-[20px] text-white outline-none placeholder:text-gray-400"
        />

        <label className="flex items-center gap-5 text-[20px] text-gray-400">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="h-5 w-5 accent-red-600"
          />

          <span>
            I’ve read and agree with <u>terms</u> & <u>privacy policy</u>.
          </span>
        </label>

        {statusMessage.text ? (
          <p
            className={`text-[18px] ${
              statusMessage.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {statusMessage.text}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-15 w-full items-center justify-center gap-3 rounded-md bg-red-600 text-[25px] font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-800"
        >
          {isSubmitting ? "Sending..." : "Send Message"} <span>➤</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
