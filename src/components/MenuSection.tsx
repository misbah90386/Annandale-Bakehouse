import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Info, Star, Leaf, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string | null>(null);

  // Filtered and searched items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Search match
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary filter match
      const matchesDietary =
        !dietaryFilter ||
        (item.tags &&
          item.tags.some((tag) =>
            tag.toLowerCase().includes(dietaryFilter.toLowerCase())
          ));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const dietaryTags = [
    { label: 'All Diets', value: null, icon: Sparkles },
    { label: 'Vegan', value: 'Vegan', icon: Leaf },
    { label: 'Vegetarian', value: 'Vegetarian', icon: Leaf },
    { label: 'Gluten-Free', value: 'Gluten-Free', icon: Info },
  ];

  return (
    <section id="menu" className="py-24 bg-[#F7F3F0] border-b border-[#D2B48C]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#7D8E7A] font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
            Baked Fresh Daily
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#3D2B1F] tracking-tight mb-4">
            Explore Our <span className="text-[#7D8E7A] italic font-normal">Artisan Menu</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A3A2C] font-light leading-relaxed">
            Order delicious handcrafted breads, flaky pastries, gourmet hot pies, breakfast bites, and organic barista coffee for pick-up or dine-in.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-[#E8E1DA]/50 border border-[#D2B48C]/30 rounded-3xl p-6 mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Instant Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4A3A2C]/50">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sourdough, croissants, beef pie..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#D2B48C]/40 rounded-xl font-sans text-sm text-[#3D2B1F] placeholder-[#4A3A2C]/50 focus:outline-none focus:ring-2 focus:ring-[#7D8E7A] focus:border-transparent shadow-inner transition-all"
                id="menu-search-input"
              />
            </div>

            {/* Diet Filters (Sub-filters) */}
            <div className="flex flex-wrap gap-2.5 justify-center">
              {dietaryTags.map((tag) => {
                const isSelected = dietaryFilter === tag.value;
                return (
                  <button
                    key={tag.label}
                    onClick={() => setDietaryFilter(tag.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-sans flex items-center space-x-1 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#7D8E7A] text-white shadow-sm'
                        : 'bg-white text-[#4A3A2C] hover:bg-[#7D8E7A]/10 border border-[#D2B48C]/20'
                    }`}
                  >
                    <tag.icon size={12} className={isSelected ? 'text-white' : 'text-[#7D8E7A]'} />
                    <span>{tag.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Main Category Tabs */}
          <div className="mt-8 pt-6 border-t border-[#D2B48C]/30 flex overflow-x-auto no-scrollbar scroll-smooth gap-2 pb-2">
            {MENU_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#7D8E7A] text-white shadow-sm'
                      : 'bg-transparent text-[#4A3A2C] hover:bg-[#E8E1DA] hover:text-[#3D2B1F]'
                  }`}
                  id={`cat-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 px-1">
          <span className="font-sans text-xs sm:text-sm text-[#4A3A2C]/70 font-light">
            Showing {filteredItems.length} delicious {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
          {(searchQuery || dietaryFilter || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter(null);
                setSelectedCategory('All');
              }}
              className="text-xs text-[#7D8E7A] hover:text-[#647561] underline font-medium cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Menu Grid - Animated */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-[#D2B48C]/20 flex flex-col h-full group card-shadow"
              >
                
                {/* Food Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dietary Badge Icons on image */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
                    {item.isBestSeller && (
                      <span className="bg-[#C5A059] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-sm">
                        <Star size={8} className="fill-current" />
                        <span>Best Seller</span>
                      </span>
                    )}
                    {item.tags && item.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-[#7D8E7A] text-white text-[9px] font-semibold uppercase px-2 py-0.5 rounded-md shadow-sm w-fit"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Premium Price Tag */}
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#3D2B1F] text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Card Info Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-[#7D8E7A] uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#3D2B1F] line-clamp-1 group-hover:text-[#7D8E7A] transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#4A3A2C] font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="mt-6 pt-4 border-t border-[#D2B48C]/20 flex items-center justify-between">
                    <span className="font-serif font-bold text-lg text-[#3D2B1F]">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-5 py-2.5 bg-[#7D8E7A] hover:bg-[#647561] text-white text-xs font-semibold tracking-wider uppercase rounded-full flex items-center space-x-2 transition-all duration-300 transform active:scale-95 hover:shadow-md cursor-pointer"
                      id={`add-menu-${item.id}`}
                    >
                      <ShoppingCart size={13} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#E8E1DA]/30 rounded-3xl border border-dashed border-[#D2B48C]/50 max-w-lg mx-auto">
            <div className="text-[#7D8E7A] mx-auto w-12 h-12 flex items-center justify-center bg-[#7D8E7A]/10 rounded-full mb-4">
              <Search size={22} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#3D2B1F] mb-1">No items found</h3>
            <p className="text-sm text-[#4A3A2C] font-light px-6 leading-relaxed">
              We couldn't find any menu items matching your search or filters. Try checking spelling or clearing filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter(null);
                setSelectedCategory('All');
              }}
              className="mt-6 px-6 py-2.5 bg-[#7D8E7A] hover:bg-[#647561] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
