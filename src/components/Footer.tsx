import React, { useState } from 'react';
import { Mail, Facebook, Instagram, Twitter, ArrowUp, Send, Heart, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onScrollToTop: () => void;
  showScrollTop: boolean;
}

export default function Footer({ onScrollToTop, showScrollTop }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setErrorMsg('Please enter an email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setErrorMsg('');
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#3D2B1F] text-[#F7F3F0] pt-20 pb-8 relative font-sans border-t border-[#D2B48C]/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Col (4 columns) */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                Annandale Bakehouse
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#7D8E7A] font-semibold mt-1 block">
                Artisan Bakery & Café
              </span>
              <p className="mt-4 text-xs sm:text-sm text-[#F7F3F0]/70 font-light leading-relaxed max-w-sm">
                Serving freshly baked 36-hour sourdough breads, flaky double-baked croissants, hot gourmet meat pies, and organic barista specialty coffee in the heart of Annandale.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#7D8E7A] text-white rounded-lg transition-colors hover:shadow-sm"
                aria-label="Visit our Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#7D8E7A] text-white rounded-lg transition-colors hover:shadow-sm"
                aria-label="Visit our Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#7D8E7A] text-white rounded-lg transition-colors hover:shadow-sm"
                aria-label="Visit our Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Col (3 columns) */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-xs sm:text-sm text-[#F7F3F0]/70 hover:text-[#7D8E7A] transition-colors font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col (5 columns) */}
          <div className="md:col-span-5">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-3">
              Join the Bakehouse Circle
            </h4>
            <p className="text-xs sm:text-sm text-[#F7F3F0]/70 font-light leading-relaxed mb-6">
              Subscribe to get notified about our weekly special pastry bakes, seasonal pies, and free community recipe guides!
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative flex">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-white/40">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-24 py-3 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#7D8E7A]"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#7D8E7A] hover:bg-[#647561] text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase rounded-full flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Send size={11} />
                  <span>Subscribe</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-green-400 font-medium"
                  >
                    🎉 Success! Welcome to the Bakehouse Circle.
                  </motion.p>
                )}
                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-400 font-medium"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#F7F3F0]/50 font-light gap-4">
          <div className="flex flex-wrap items-center justify-center space-x-4 md:space-x-6">
            <span>© 2026 Annandale Bakehouse. All Rights Reserved.</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
          
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart size={10} className="text-red-400 fill-red-400 animate-pulse" />
            <span>in Annandale, NSW</span>
          </div>
        </div>

      </div>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onScrollToTop}
            className="fixed bottom-6 right-6 p-3.5 bg-[#7D8E7A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 hover:-translate-y-1 active:scale-95 cursor-pointer border border-[#7D8E7A]/10"
            aria-label="Scroll to top of page"
            id="scroll-to-top-btn"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </footer>
  );
}
