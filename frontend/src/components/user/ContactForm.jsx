import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the terms and privacy policy.");
      return;
    }

    console.log("Form Submitted:", formData);

    // TODO: Send data to your backend/API

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      agree: false,
    });
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
          placeholder="+959 123 445 789"
          value={formData.email}
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
            value={formData.agree}
            onChange={handleChange}
            className="h-5 w-5 accent-red-600"
          />

          <span>
            I’ve read and agree with <u>terms</u> & <u>privacy policy</u>.
          </span>
        </label>

        <button
          type="submit"
          className="flex h-15 w- items-center justify-center gap-3 rounded-md bg-red-600 text-[25px] font-bold text-white transition hover:bg-red-500"
        >
          Send Message <span>➤</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
