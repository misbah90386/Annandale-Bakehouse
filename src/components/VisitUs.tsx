import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle, ArrowRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_HOURS } from '../data';

export default function VisitUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = 'Please provide a valid phone number';
    }
    if (!formData.message.trim()) errors.message = 'Please write a message';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1800);
  };

  // Curated Instagram Photos
  const instaPhotos = [
    { id: 'inst-1', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=250', link: 'https://www.instagram.com' },
    { id: 'inst-2', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=250', link: 'https://www.instagram.com' },
    { id: 'inst-3', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=250', link: 'https://www.instagram.com' },
    { id: 'inst-4', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=250', link: 'https://www.instagram.com' },
    { id: 'inst-5', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=250', link: 'https://www.instagram.com' },
    { id: 'inst-6', image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=250', link: 'https://www.instagram.com' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#E8E1DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#7D8E7A] font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
            Come Visit Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#3D2B1F] tracking-tight mb-4">
            Find Our <span className="text-[#7D8E7A] italic font-normal">Annandale Bakery</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A3A2C] font-light leading-relaxed">
            Drop by for freshly baked bread, premium barista coffee, and friendly community vibes in Sydney’s historic Inner West. We’d love to welcome you!
          </p>
        </div>

        {/* Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Left Block: Address & Hours (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white p-8 md:p-10 rounded-3xl border border-[#D2B48C]/20 shadow-sm card-shadow">
            
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#3D2B1F] mb-6">
                Annandale Bakehouse
              </h3>
              
              <div className="space-y-6 font-sans">
                
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#7D8E7A]/10 text-[#7D8E7A] rounded-xl shrink-0 mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7D8E7A]">
                      Our Address
                    </h4>
                    <p className="text-sm sm:text-base text-[#3D2B1F] mt-1 font-light leading-relaxed">
                      39 Booth Street, Annandale,<br />
                      NSW 2038, Australia
                    </p>
                    <a
                      href="https://maps.google.com/?q=39+Booth+Street,+Annandale,+NSW+2038"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#7D8E7A] hover:text-[#647561] font-medium underline mt-2 inline-flex items-center space-x-1"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ArrowRight size={10} />
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#7D8E7A]/10 text-[#7D8E7A] rounded-xl shrink-0 mt-0.5">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7D8E7A]">
                      Call Our Bakery
                    </h4>
                    <p className="text-sm sm:text-base text-[#3D2B1F] mt-1 font-medium">
                      +61 2 9555 1234
                    </p>
                    <p className="text-[11px] text-[#4A3A2C]/70 font-light mt-0.5">
                      For special event catering and whole cake orders.
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#7D8E7A]/10 text-[#7D8E7A] rounded-xl shrink-0 mt-0.5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7D8E7A]">
                      Email Enquiries
                    </h4>
                    <p className="text-sm sm:text-base text-[#3D2B1F] mt-1 font-light">
                      hello@annandalebakehouse.com.au
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Business Hours */}
            <div className="pt-6 border-t border-[#D2B48C]/30">
              <div className="flex items-center space-x-3 text-[#3D2B1F] mb-4">
                <Clock size={18} className="text-[#7D8E7A]" />
                <h4 className="font-serif text-lg font-bold">Business Hours</h4>
              </div>
              <div className="space-y-2.5">
                {BUSINESS_HOURS.map((slot) => (
                  <div key={slot.day} className="flex justify-between items-center text-xs sm:text-sm font-sans">
                    <span className="text-[#4A3A2C] font-light">{slot.day}</span>
                    <span className="text-[#3D2B1F] font-medium">{slot.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Block: Embedded Google Maps (7 Cols) */}
          <div className="lg:col-span-7 h-96 lg:h-auto min-h-[400px] rounded-3xl overflow-hidden border border-[#D2B48C]/20 shadow-sm relative group bg-white card-shadow">
            <iframe
              title="Annandale Bakehouse Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.4452174301543!2d151.16879897645155!3d-33.87817027322303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12af9a9fcfbfb9%3A0xc66579344cb89d98!2s39%20Booth%20St%2C%20Annandale%20NSW%202038!5e0!3m2!1sen!2sau!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full filter contrast-[1.03] grayscale-[5%]"
            />
            {/* Visual HUD overlay */}
            <div className="absolute bottom-4 left-4 bg-[#3D2B1F]/90 text-white backdrop-blur-md p-4 rounded-2xl text-xs flex items-center space-x-3 border border-white/10 shadow-lg">
              <div className="p-2 bg-[#7D8E7A] rounded-xl text-white">
                <Compass className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <span className="block font-semibold">39 Booth Street</span>
                <span className="text-white/70 block mt-0.5">Inner West, Sydney</span>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form & Instagram Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-[#D2B48C]/20 shadow-sm card-shadow">
            <h3 className="font-serif text-2xl font-bold text-[#3D2B1F] mb-2">
              Send Us a Message
            </h3>
            <p className="font-sans text-sm text-[#4A3A2C] font-light mb-8">
              Got a query about our ingredients, special orders, or just want to leave feedback? Drop us a note!
            </p>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#4A3A2C] uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 bg-[#E8E1DA]/20 border rounded-xl font-sans text-sm text-[#3D2B1F] placeholder-[#4A3A2C]/40 focus:outline-none focus:ring-2 focus:ring-[#7D8E7A] transition-all ${
                          formErrors.name ? 'border-red-400 focus:ring-red-300' : 'border-[#D2B48C]/40'
                        }`}
                      />
                      {formErrors.name && (
                        <span className="text-xs text-red-500 font-medium mt-1 block">{formErrors.name}</span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#4A3A2C] uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. john@example.com"
                        className={`w-full px-4 py-3 bg-[#E8E1DA]/20 border rounded-xl font-sans text-sm text-[#3D2B1F] placeholder-[#4A3A2C]/40 focus:outline-none focus:ring-2 focus:ring-[#7D8E7A] transition-all ${
                          formErrors.email ? 'border-red-400 focus:ring-red-300' : 'border-[#D2B48C]/40'
                        }`}
                      />
                      {formErrors.email && (
                        <span className="text-xs text-red-500 font-medium mt-1 block">{formErrors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#4A3A2C] uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +61 412 345 678"
                      className={`w-full px-4 py-3 bg-[#E8E1DA]/20 border rounded-xl font-sans text-sm text-[#3D2B1F] placeholder-[#4A3A2C]/40 focus:outline-none focus:ring-2 focus:ring-[#7D8E7A] transition-all ${
                        formErrors.phone ? 'border-red-400 focus:ring-red-300' : 'border-[#D2B48C]/40'
                      }`}
                    />
                    {formErrors.phone && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#4A3A2C] uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you? Describe special requests or catering requirements..."
                      className={`w-full px-4 py-3 bg-[#E8E1DA]/20 border rounded-xl font-sans text-sm text-[#3D2B1F] placeholder-[#4A3A2C]/40 focus:outline-none focus:ring-2 focus:ring-[#7D8E7A] transition-all ${
                        formErrors.message ? 'border-red-400 focus:ring-red-300' : 'border-[#D2B48C]/40'
                      }`}
                    />
                    {formErrors.message && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">{formErrors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#7D8E7A] hover:bg-[#647561] text-white text-xs font-semibold tracking-wider uppercase rounded-full flex items-center justify-center space-x-2 transition-all duration-300 shadow-md active:scale-95 disabled:opacity-55 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-prompt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="p-4 bg-green-50 text-green-500 rounded-full mb-6">
                    <CheckCircle size={44} className="animate-bounce" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#3D2B1F] mb-2">
                    Thank You!
                  </h4>
                  <p className="text-sm text-[#4A3A2C] font-light leading-relaxed max-w-md">
                    Your message has been delivered successfully. Our baking administration or head barista will review your enquiry and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 px-6 py-2.5 bg-[#7D8E7A] hover:bg-[#647561] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-md"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Instagram Link (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl border border-[#D2B48C]/20 shadow-sm flex flex-col justify-between h-full card-shadow animate-fade-in">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Instagram className="text-[#C5A059]" size={22} />
                <h3 className="font-serif text-xl font-bold text-[#3D2B1F]">
                  Follow Our Instagram
                </h3>
              </div>
              <span className="font-sans text-xs text-[#7D8E7A] font-medium tracking-wide block mb-6">
                @annandale_bakehouse
              </span>
              <p className="font-sans text-sm text-[#4A3A2C] font-light leading-relaxed mb-8">
                Get behind-the-scenes glances at our sourdough scoring, freshly sliced tarts, and local canine regulars! We post fresh feeds every morning.
              </p>

              {/* Instagram Photo Grid */}
              <div className="grid grid-cols-3 gap-3">
                {instaPhotos.map((photo) => (
                  <a
                    key={photo.id}
                    href={photo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group aspect-square rounded-xl overflow-hidden block border border-gray-100 bg-gray-100"
                  >
                    <img
                      src={photo.image}
                      alt="Annandale Bakehouse Instagram snapshot"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#3D2B1F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Instagram className="text-white w-5 h-5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-4 bg-transparent hover:bg-[#E8E1DA] text-[#3D2B1F] text-xs font-semibold tracking-wider uppercase border border-[#D2B48C]/50 rounded-full flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <Instagram size={14} />
              <span>Visit Instagram Feed</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
