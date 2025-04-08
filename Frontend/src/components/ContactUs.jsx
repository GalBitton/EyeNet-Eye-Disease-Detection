import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // Add your Web3Forms access key
    formData.append("access_key", "e9356d90-4aa8-4e2c-a5cb-2a491f285a04");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            Send us a message{" "}
            <span className="ml-2">
              <FaEnvelope className="text-primary text-2xl" />
            </span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Feel free to reach out through the contact form or find our contact
            information below. Your feedback, questions, and suggestions are
            important to us as we strive to improve our service.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <FaEnvelope className="text-primary text-lg mr-3" />
              <span>CataractProject3@gmail.com</span>
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <FaPhoneAlt className="text-primary text-lg mr-3" />
              <span>+(0) 123-456-7890</span>
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <FaMapMarkerAlt className="text-primary text-lg mr-3" />
              <span>
                Post office Box 78
                <br />
                2161002 Karmiel, Israel
              </span>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 mt-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md border-0 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 mt-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md border-0 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Write your message
              </label>
              <textarea
                name="message"
                id="message"
                rows="6"
                placeholder="Enter your message"
                required
                className="w-full px-4 py-2 mt-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md border-0 focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="primary-btn flex items-center justify-center gap-2"
            >
              Submit Now
            </button>
          </form>
          {result && (
            <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              {result}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;