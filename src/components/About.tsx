import { Heart, Landmark, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#F7F3F0] border-b border-[#D2B48C]/20 relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#E8E1DA] rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#7D8E7A]/5 rounded-full filter blur-3xl opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image Collage (Grid of beautiful photography) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-12 gap-4 relative">
              
              {/* Image 1: Main Baker smiling */}
              <div className="col-span-8 rounded-2xl overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
                  alt="Our smiling bakers crafting pastries"
                  className="w-full h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Image 2: Sourdough loaf close-up (Floating) */}
              <div className="col-span-6 -mt-20 ml-auto mr-[-10px] rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition-transform duration-500 border-4 border-white z-10 relative">
                <img
                  src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=500"
                  alt="Fresh organic artisan sourdough"
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Image 3: Cozy coffee counter */}
              <div className="col-span-6 mt-4 rounded-2xl overflow-hidden shadow-md transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=500"
                  alt="Cozy café counter inside Annandale Bakehouse"
                  className="w-full h-44 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gold/Cream decorative seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-24 h-24 rounded-full bg-[#C5A059] border-4 border-[#F7F3F0] shadow-xl z-20 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="text-center text-white p-1">
                  <span className="block text-[8px] uppercase tracking-widest font-sans font-bold">Est.</span>
                  <span className="block text-lg font-serif font-black leading-none">2012</span>
                  <span className="block text-[8px] uppercase tracking-widest font-sans">Annandale</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Bakery Story & Details */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            
            {/* Tagline */}
            <span className="text-[#7D8E7A] font-semibold text-xs tracking-[0.2em] uppercase block mb-3 font-sans">
              Our Story
            </span>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#3D2B1F] tracking-tight leading-tight mb-6">
              Baking with Heart, <span className="text-[#7D8E7A] italic font-normal">in the Hub of Annandale</span>
            </h2>

            {/* Description */}
            <div className="font-sans text-[#4A3A2C] space-y-5 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Annandale Bakehouse is a neighborhood bakery and café dedicated to serving fresh artisan bread, handcrafted pastries, gourmet pies, delicious cakes, and premium coffee. Every product is prepared daily using quality ingredients, traditional baking techniques, and a passion for exceptional flavor.
              </p>
              <p>
                Founded on the belief that a bakery should be the heartbeat of its suburb, our flour is sourced from sustainable Australian stone mills, and our recipes have been lovingly perfected over generations. Whether you are grabbing your morning sourdough, sipping a flat white, or sitting down for a cozy brunch with friends, you are part of our family.
              </p>
            </div>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#D2B48C]/30">
              
              {/* Pillar 1 */}
              <div className="flex flex-col space-y-2">
                <div className="text-[#7D8E7A] flex items-center space-x-1">
                  <Heart size={18} className="fill-[#7D8E7A]/15" />
                  <span className="font-serif text-sm font-bold text-[#3D2B1F]">Community</span>
                </div>
                <p className="text-xs text-[#4A3A2C]/80 leading-normal font-light">
                  A warm gathering hub for locals, families, and friends since day one.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col space-y-2">
                <div className="text-[#7D8E7A] flex items-center space-x-1">
                  <Award size={18} />
                  <span className="font-serif text-sm font-bold text-[#3D2B1F]">Handcrafted</span>
                </div>
                <p className="text-xs text-[#4A3A2C]/80 leading-normal font-light">
                  No automated machines. Every loaf is hand-shaped and scored with precision.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col space-y-2">
                <div className="text-[#7D8E7A] flex items-center space-x-1">
                  <Landmark size={18} />
                  <span className="font-serif text-sm font-bold text-[#3D2B1F]">Local Sourced</span>
                </div>
                <p className="text-xs text-[#4A3A2C]/80 leading-normal font-light">
                  Partnering with local Australian organic millers and milk farmers.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
