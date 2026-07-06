import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-[#F7F3F0] border-b border-[#D2B48C]/20 relative overflow-hidden">
      
      {/* Decorative Accents */}
      <div className="absolute top-10 right-10 text-[#7D8E7A]/5 select-none pointer-events-none">
        <Quote size={200} className="transform rotate-180" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-[#7D8E7A] font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
            What Our Locals Say
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#3D2B1F] tracking-tight">
            Loved by the <span className="text-[#7D8E7A] italic font-normal">Community</span>
          </h2>
        </div>

        {/* Testimonial Active Card Viewer */}
        <div className="relative min-h-[320px] sm:min-h-[260px] flex items-center justify-center bg-[#E8E1DA]/40 rounded-3xl p-8 sm:p-12 border border-[#D2B48C]/20 shadow-sm card-shadow">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex space-x-1 mb-6">
                {Array.from({ length: TESTIMONIALS[currentIndex].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-[#C5A059] fill-[#C5A059]" />
                ))}
              </div>

              {/* Review Comment */}
              <blockquote className="font-serif text-base sm:text-lg md:text-xl text-[#3D2B1F] italic leading-relaxed max-w-2xl font-medium">
                "{TESTIMONIALS[currentIndex].comment}"
              </blockquote>

              {/* Author Info */}
              <div className="mt-8 flex items-center space-x-4">
                <img
                  src={TESTIMONIALS[currentIndex].avatar}
                  alt={TESTIMONIALS[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#7D8E7A]/40 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <cite className="not-italic font-serif text-sm sm:text-base font-bold text-[#3D2B1F] block">
                    {TESTIMONIALS[currentIndex].name}
                  </cite>
                  <span className="text-xs text-[#7D8E7A] font-medium font-sans tracking-wide block">
                    {TESTIMONIALS[currentIndex].role}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Side Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 p-2 text-[#4A3A2C] hover:text-[#7D8E7A] hover:bg-white rounded-full transition-all active:scale-95 cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 p-2 text-[#4A3A2C] hover:text-[#7D8E7A] hover:bg-white rounded-full transition-all active:scale-95 cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index 
                  ? 'w-6 bg-[#7D8E7A]' 
                  : 'w-2.5 bg-[#D2B48C]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
