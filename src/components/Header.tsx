import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Header({ cartCount, onCartOpen, activeSection, setActiveSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href.substring(1));
    }
  };

  return (
    <>
      {/* Top Banner Accent */}
      <div className="bg-[#3D2B1F] text-[#E8E1DA] text-xs py-2 px-4 flex justify-between items-center z-50 relative font-sans">
        <div className="flex items-center space-x-4 mx-auto md:mx-0">
          <span className="flex items-center space-x-1">
            <MapPin size={13} className="text-[#C5A059]" />
            <span>39 Booth Street, Annandale, NSW</span>
          </span>
          <span className="hidden md:flex items-center space-x-1">
            <Phone size={13} className="text-[#C5A059]" />
            <span>+61 2 9555 1234</span>
          </span>
        </div>
        <div className="hidden md:block text-[#C5A059] font-medium font-serif italic">
          Freshly baked daily since 2012
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 w-full z-40 transition-all duration-300 font-sans ${
          isScrolled
            ? 'bg-[#F7F3F0]/95 backdrop-blur-md shadow-md py-3 border-b border-[#D2B48C]/20'
            : 'bg-[#F7F3F0]/90 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="flex flex-col select-none"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#3D2B1F] tracking-tight leading-none">
                Annandale<span className="text-[#7D8E7A]">.</span>
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#7D8E7A] font-semibold mt-0.5">
                Bakehouse
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                      isActive 
                        ? 'text-[#7D8E7A]' 
                        : 'text-[#4A3A2C] hover:text-[#7D8E7A]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7D8E7A]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Order Button - Quick Scroll */}
              <button
                onClick={() => handleLinkClick('#menu')}
                className="hidden lg:inline-flex items-center px-6 py-2 text-xs font-semibold tracking-wider text-white uppercase bg-[#7D8E7A] hover:bg-[#647561] rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Order Online
              </button>

              {/* Cart Trigger Button */}
              <button
                onClick={onCartOpen}
                className="relative p-2.5 text-[#3D2B1F] hover:text-[#7D8E7A] transition-colors bg-[#E8E1DA] rounded-full hover:shadow-sm"
                aria-label="Open shopping cart"
                id="cart-trigger-btn"
              >
                <ShoppingBag size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F7F3F0]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#3D2B1F] hover:text-[#7D8E7A] transition-colors rounded-lg hover:bg-[#E8E1DA]"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden bg-[#F7F3F0] border-t border-[#D2B48C]/20 overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className={`block px-4 py-2.5 text-base font-medium rounded-md transition-all ${
                        isActive
                          ? 'bg-[#7D8E7A]/10 text-[#7D8E7A] font-semibold'
                          : 'text-[#4A3A2C] hover:bg-[#E8E1DA] hover:text-[#7D8E7A]'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
                <div className="pt-4 px-4 border-t border-[#D2B48C]/20 flex flex-col space-y-3">
                  <button
                    onClick={() => handleLinkClick('#menu')}
                    className="w-full text-center py-3 bg-[#7D8E7A] hover:bg-[#647561] text-white font-semibold rounded-full shadow-md transition-all text-sm uppercase tracking-wider"
                  >
                    Order Online Now
                  </button>
                  <div className="flex justify-center items-center space-x-4 text-xs text-[#4A3A2C]">
                    <span className="flex items-center space-x-1">
                      <MapPin size={12} className="text-[#C5A059]" />
                      <span>Booth St, Annandale</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Phone size={12} className="text-[#C5A059]" />
                      <span>+61 2 9555 1234</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
