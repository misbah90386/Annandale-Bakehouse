import { Star, Flame, Coffee, UtensilsCrossed } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onViewMenuClick: () => void;
  onVisitUsClick: () => void;
}

export default function Hero({ onViewMenuClick, onVisitUsClick }: HeroProps) {
  return (
    <div id="home" className="relative min-h-[90vh] flex items-center justify-center bg-[#F7F3F0] py-12 md:py-20 overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#E8E1DA] rounded-full filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7D8E7A]/10 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            
            {/* Top Badges */}
            <div className="flex flex-wrap gap-3">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/80 border border-[#D2B48C]/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm text-[#3D2B1F]"
              >
                <span className="text-[#C5A059] text-xs">★</span> 
                <span>4.4 Customer Rating</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/80 border border-[#D2B48C]/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#3D2B1F] shadow-sm"
              >
                Freshly Baked Daily
              </motion.div>
            </div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#3D2B1F] tracking-tight leading-[1.05]"
              id="hero-headline"
            >
              Freshly Baked <br />
              <span className="text-[#7D8E7A] italic font-normal">Every Morning</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="font-sans text-sm sm:text-base text-[#4A3A2C] max-w-lg leading-relaxed font-light"
              id="hero-subheading"
            >
              Handcrafted sourdough, flaky pastries, and premium artisan coffee made with passion in the heart of Annandale. Experience the neighborhood's favorite morning ritual.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={onViewMenuClick}
                className="px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase bg-[#7D8E7A] hover:bg-[#647561] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                id="hero-btn-menu"
              >
                View Menu
              </button>
              <button
                onClick={onVisitUsClick}
                className="px-8 py-3.5 text-sm font-semibold tracking-wider text-[#7D8E7A] uppercase bg-transparent border-2 border-[#7D8E7A] hover:bg-[#7D8E7A]/5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                id="hero-btn-visit"
              >
                Visit Us
              </button>
            </motion.div>

          </div>

          {/* Right Side: Curved Image & Floating Review */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[500px]"
            >
              {/* Outer Glow / shadow decoration */}
              <div className="absolute inset-0 bg-[#E8E1DA]/30 hero-image-curve blur-xl -z-10" />

              {/* Curved Image */}
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
                alt="Flaky croissants, sourdough loaves, and premium bakes"
                className="w-full h-[400px] md:h-[500px] object-cover shadow-2xl hero-image-curve border-2 border-[#D2B48C]/10"
                referrerPolicy="no-referrer"
              />

              {/* Floating Customer Love Card */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white p-5 sm:p-6 rounded-3xl shadow-xl border border-gray-100 max-w-[240px] text-left card-shadow"
              >
                <p className="text-[9px] uppercase tracking-widest text-[#7D8E7A] mb-1.5 font-bold font-sans">
                  Customer Love
                </p>
                <p className="text-xs italic font-serif text-[#3D2B1F] leading-relaxed">
                  "The best croissants in Annandale and excellent coffee. Friendly staff, fresh pastries."
                </p>
                <div className="flex gap-1 mt-2 text-[#C5A059] text-[10px]">
                  ★ ★ ★ ★ ★
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Trust Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-[#D2B48C]/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#7D8E7A]/10 rounded-xl text-[#7D8E7A]">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#3D2B1F]">4.4 Rating</p>
              <p className="text-[10px] text-[#4A3A2C]/60">Inner West Favorite</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#C5A059]/10 rounded-xl text-[#C5A059]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#3D2B1F]">Freshly Baked</p>
              <p className="text-[10px] text-[#4A3A2C]/60">From 3:00 AM Daily</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#7D8E7A]/10 rounded-xl text-[#7D8E7A]">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#3D2B1F]">Artisan Coffee</p>
              <p className="text-[10px] text-[#4A3A2C]/60">Organic Roast Blend</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#C5A059]/10 rounded-xl text-[#C5A059]">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#3D2B1F]">Cozy Dining</p>
              <p className="text-[10px] text-[#4A3A2C]/60">Dine-In & Takeaway</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
