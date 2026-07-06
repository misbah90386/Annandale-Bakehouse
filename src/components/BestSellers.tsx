import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface BestSellersProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function BestSellers({ onAddToCart }: BestSellersProps) {
  const bestSellers = MENU_ITEMS.filter((item) => item.isBestSeller);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    large: 4
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bestSellers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bestSellers.length) % bestSellers.length);
  };

  return (
    <section className="py-24 bg-[#E8E1DA] border-b border-[#D2B48C]/20 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#7D8E7A] font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#3D2B1F] tracking-tight">
              Our Famous <span className="text-[#7D8E7A] italic font-normal">Best Sellers</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-sm sm:text-base text-[#4A3A2C] font-light leading-relaxed">
            Locals queue up early in Annandale for these fresh delights. Handcrafted daily, using secret time-tested recipes.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Slider Display Frame */}
          <div className="overflow-hidden py-4 -mx-4 px-4">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / bestSellers.length)}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              style={{ width: `${(bestSellers.length * 100) / 4}%`, minWidth: '100%' }}
            >
              {bestSellers.map((item) => (
                <div 
                  key={item.id} 
                  className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#D2B48C]/20 flex flex-col h-full card-shadow"
                  >
                    {/* Product Image & Tag */}
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#C5A059] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center space-x-1">
                        <Star size={10} className="fill-current animate-pulse" />
                        <span>Best Seller</span>
                      </span>
                      <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#3D2B1F] text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-[#7D8E7A] uppercase tracking-widest block mb-1">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#3D2B1F] line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[#4A3A2C] font-light line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="mt-5 pt-4 border-t border-[#D2B48C]/20 flex items-center justify-between">
                        <span className="font-serif font-bold text-[#3D2B1F]">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="px-4 py-2 bg-[#7D8E7A] hover:bg-[#647561] text-white text-xs font-semibold rounded-full flex items-center space-x-1.5 transition-all duration-300 transform active:scale-95 hover:shadow-md cursor-pointer"
                          id={`add-bestseller-${item.id}`}
                        >
                          <ShoppingCart size={13} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            {/* Dots */}
            <div className="flex space-x-2">
              {Array.from({ length: bestSellers.length }).map((_, i) => (
                <button
                   key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i 
                      ? 'w-6 bg-[#7D8E7A]' 
                      : 'w-2 bg-[#D2B48C]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex space-x-3">
              <button
                onClick={prevSlide}
                className="p-3 bg-white hover:bg-[#7D8E7A] hover:text-white text-[#3D2B1F] rounded-full border border-[#D2B48C]/30 transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Previous best sellers"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 bg-white hover:bg-[#7D8E7A] hover:text-white text-[#3D2B1F] rounded-full border border-[#D2B48C]/30 transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Next best sellers"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
