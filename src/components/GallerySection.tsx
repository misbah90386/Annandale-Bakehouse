import { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Bread', 'Pastry', 'Pies', 'Cakes', 'Coffee', 'Breakfast', 'Bakery', 'Café', 'Community'];

  // Filter items
  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-[#E8E1DA] border-b border-[#D2B48C]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#7D8E7A] font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
            Moments in Bakehouse
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#3D2B1F] tracking-tight mb-4">
            Our Handcrafted <span className="text-[#7D8E7A] italic font-normal">Visual Gallery</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A3A2C] font-light leading-relaxed">
            Take a sensory journey through our daily bake. View our crisp flaky croissants, golden crusted sourdough, hot gourmet pies, and active neighborhood café vibes.
          </p>
        </div>

        {/* Gallery Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#7D8E7A] text-white shadow-sm'
                  : 'bg-white text-[#4A3A2C] hover:bg-[#7D8E7A]/10 border border-[#D2B48C]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="relative group aspect-square rounded-3xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer border border-[#D2B48C]/20 bg-white card-shadow"
                onClick={() => setLightboxIndex(index)}
              >
                {/* Photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Overlap Tint Hover Mask */}
                <div className="absolute inset-0 bg-[#3D2B1F]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6" />

                {/* Overlap Text Contents (Hidden by default, showing on hover) */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#7D8E7A] px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="p-1.5 bg-white/10 rounded-full text-white">
                      <ZoomIn size={14} />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-wide">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#F7F3F0]/80 font-light mt-1.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal (Full-Screen Viewer) */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 z-50 cursor-pointer"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 z-40 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 z-40 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Center Image Canvas Frame */}
              <div 
                className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={lightboxIndex}
                  initial={{ scale: 0.95, y: 10, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#3D2B1F] rounded-2xl overflow-hidden border border-white/10 shadow-2xl w-full"
                >
                  <div className="relative h-[55vh] md:h-[65vh] bg-black">
                    <img
                      src={filteredGallery[lightboxIndex].image}
                      alt={filteredGallery[lightboxIndex].title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Photo details bottom bar */}
                  <div className="p-6 bg-[#3D2B1F] text-white border-t border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold tracking-wider text-[#7D8E7A] uppercase block">
                          {filteredGallery[lightboxIndex].category}
                        </span>
                        <h3 className="font-serif text-xl font-bold mt-1">
                          {filteredGallery[lightboxIndex].title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-white/40">
                        {lightboxIndex + 1} / {filteredGallery.length}
                      </span>
                    </div>
                    <p className="mt-3 font-sans text-xs sm:text-sm text-[#F7F3F0]/70 font-light leading-relaxed">
                      {filteredGallery[lightboxIndex].description}
                    </p>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
