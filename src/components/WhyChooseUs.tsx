import * as LucideIcons from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';
import { motion } from 'motion/react';

// Dynamic Lucide icon mapper
function IconRenderer({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <LucideIcons.HelpCircle size={size} className={className} />;
  return <IconComponent size={size} className={className} />;
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F7F3F0] border-b border-[#D2B48C]/20 relative overflow-hidden">
      
      {/* Decorative blurry backgrounds */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#7D8E7A]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#7D8E7A] font-semibold text-xs tracking-[0.2em] uppercase block mb-3">
            Our Quality Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold text-[#3D2B1F] tracking-tight mb-4">
            Why Choose <span className="text-[#7D8E7A] italic font-normal">Annandale Bakehouse</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#4A3A2C] font-light leading-relaxed">
            We hold ourselves to the highest standards of artisan crafting, hospitality, and sustainability. Here is what makes our community bakehouse stand out.
          </p>
        </div>

        {/* 4x2 Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 bg-white hover:bg-[#E8E1DA]/50 rounded-3xl border border-[#D2B48C]/20 shadow-sm transition-all duration-300 flex flex-col items-start card-shadow"
            >
              {/* Feature Icon */}
              <div className="p-3 bg-[#7D8E7A]/10 hover:bg-[#7D8E7A]/20 text-[#7D8E7A] rounded-xl mb-5 transition-colors">
                <IconRenderer name={item.iconName} size={22} />
              </div>

              {/* Feature Text */}
              <h3 className="font-serif text-lg font-bold text-[#3D2B1F] mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#4A3A2C] leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
