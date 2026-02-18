import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl uppercase tracking-wider text-center mb-4">
            Get in Touch
          </h1>
          <p className="text-center text-neutral-600 text-lg">
            Have a question? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl uppercase tracking-wider mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin size={24} className="text-neutral-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-1">Visit Us</h3>
                    <p className="text-neutral-600">
                      123 Fashion Street<br />
                      New York, NY 10013<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone size={24} className="text-neutral-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-1">Call Us</h3>
                    <p className="text-neutral-600">
                      +1 (555) 123-4567<br />
                      Mon-Fri: 9AM - 6PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail size={24} className="text-neutral-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-1">Email Us</h3>
                    <p className="text-neutral-600">
                      info@graduatebrand.com<br />
                      support@graduatebrand.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock size={24} className="text-neutral-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="mb-1">Store Hours</h3>
                    <p className="text-neutral-600">
                      Monday - Friday: 10AM - 8PM<br />
                      Saturday: 10AM - 6PM<br />
                      Sunday: 12PM - 5PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="pt-8 border-t border-neutral-200">
              <h3 className="text-xl uppercase tracking-wider mb-4">
                Customer Support
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-neutral-600 hover:text-black transition-colors"
                >
                  Track Your Order
                </a>
                <a
                  href="#"
                  className="block text-neutral-600 hover:text-black transition-colors"
                >
                  Returns & Exchanges
                </a>
                <a
                  href="#"
                  className="block text-neutral-600 hover:text-black transition-colors"
                >
                  Shipping Information
                </a>
                <a
                  href="#"
                  className="block text-neutral-600 hover:text-black transition-colors"
                >
                  Size Guide
                </a>
                <a
                  href="#"
                  className="block text-neutral-600 hover:text-black transition-colors"
                >
                  FAQs
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-50 p-8 border border-neutral-200">
              <h2 className="text-2xl uppercase tracking-wider mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black bg-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black bg-white"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-black bg-white resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2 w-full bg-black text-white py-4 hover:bg-neutral-800 transition-colors"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl uppercase tracking-wider mb-8 text-center">
            Our Location
          </h2>
          <div className="aspect-video bg-neutral-200 rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1644262070000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl uppercase tracking-wider mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="text-lg mb-2">How long does shipping take?</h3>
              <p className="text-neutral-600">
                Standard shipping typically takes 3-5 business days within the US. 
                Express shipping options are available at checkout for faster delivery.
              </p>
            </div>
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="text-lg mb-2">What is your return policy?</h3>
              <p className="text-neutral-600">
                We offer a 30-day return policy for all unworn items with original tags. 
                Returns are free and easy - just use the prepaid label included in your package.
              </p>
            </div>
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="text-lg mb-2">Do you ship internationally?</h3>
              <p className="text-neutral-600">
                Yes! We ship to over 50 countries worldwide. International shipping times 
                vary by location but typically take 7-14 business days.
              </p>
            </div>
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="text-lg mb-2">How do I track my order?</h3>
              <p className="text-neutral-600">
                Once your order ships, you'll receive a tracking number via email. 
                You can also track your order by logging into your account on our website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
