import React, { useState } from "react";
import { STRINGS } from "../../constants/strings";

const ContactUs = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData(e.target);
    formData.append("access_key", "YOUR-WEB3FORMS-ACCESS-KEY"); // 🔥 להחליף!

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      e.target.reset();
    } else {
      setResult("Something went wrong");
    }
  };

  return (
    <section className="container py-14">
      <h1 className="text-3xl font-semibold text-center mb-10">Contact Us</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <input name="name" type="text" placeholder="Your Name" required className="form-input" />
        <input name="email" type="email" placeholder="Your Email" required className="form-input" />
        <textarea name="message" rows="6" placeholder="Your Message" required className="form-textarea"></textarea>
        <button type="submit" className="primary-btn w-full">Send Message</button>
        {result && <p className="text-center text-gray-600 dark:text-gray-300 mt-4">{result}</p>}
      </form>
    </section>
  );
};

export default ContactUs;
