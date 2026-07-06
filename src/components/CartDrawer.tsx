import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (details: CheckoutDetails) => void;
}

export interface CheckoutDetails {
  name: string;
  phone: string;
  email: string;
  orderType: 'Dine-In' | 'Takeaway';
  specialNotes: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [orderType, setOrderType] = useState<'Dine-In' | 'Takeaway'>('Takeaway');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gst = subtotal * 0.1; // 10% GST included in price in Australia
  const total = subtotal; // Prices include GST, so total is subtotal

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.name = 'Name is required';
    if (!customerPhone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(customerPhone)) {
      newErrors.phone = 'Please provide a valid phone';
    }
    if (!customerEmail.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      newErrors.email = 'Please provide a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCheckout({
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      orderType,
      specialNotes,
    });
    
    // Clear state
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setSpecialNotes('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FDFBF7] shadow-2xl z-50 flex flex-col h-full border-l border-[#D7C4B7]/25"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#D7C4B7]/20 flex justify-between items-center bg-[#2D221E] text-white">
              <div className="flex items-center space-x-3">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-bold">Your Bakehouse Order</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Scroll List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="p-4 bg-[#F5EFEB] text-[#8F9E8B] rounded-full mb-4">
                    <ShoppingBag size={36} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#2D221E]">Your cart is empty</h4>
                  <p className="text-xs sm:text-sm text-[#4A3E3D] font-light mt-2 max-w-xs leading-relaxed">
                    Select delicious pastries, hot pies, organic sourdough breads, or coffees from our menu to start ordering.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 bg-[#8F9E8B] hover:bg-[#6D7E69] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer"
                  >
                    Browse the Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 pb-4 border-b border-[#D7C4B7]/20">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex space-x-4 bg-white p-3.5 rounded-xl border border-[#D7C4B7]/10 shadow-sm items-center"
                      >
                        {/* Image */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                          referrerPolicy="no-referrer"
                        />

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold font-serif text-[#2D221E] truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-[#8F9E8B] font-medium tracking-wide uppercase">
                            {item.product.category}
                          </span>
                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center space-x-1.5 bg-[#F5EFEB] rounded-md px-1 py-0.5 border border-[#D7C4B7]/20">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-[#2D221E] hover:text-[#8F9E8B] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-xs font-bold font-mono text-[#2D221E] w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-[#2D221E] hover:text-[#8F9E8B] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            {/* Trash action */}
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-all"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Cost */}
                        <div className="text-right shrink-0">
                          <span className="font-serif font-bold text-xs sm:text-sm text-[#2D221E]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <span className="block text-[10px] text-[#4A3E3D]/50 font-light font-mono">
                            ${item.product.price.toFixed(2)} ea
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Options */}
                  <div className="space-y-4 pt-2">
                    <label className="block text-xs font-semibold text-[#4A3E3D] uppercase tracking-wider mb-2">
                      Dining Choice
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderType('Takeaway')}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider font-sans border transition-all cursor-pointer ${
                          orderType === 'Takeaway'
                            ? 'bg-[#8F9E8B] text-white border-transparent'
                            : 'bg-white text-[#4A3E3D] border-[#D7C4B7]/40 hover:bg-[#F5EFEB]'
                        }`}
                      >
                        Takeaway
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('Dine-In')}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider font-sans border transition-all cursor-pointer ${
                          orderType === 'Dine-In'
                            ? 'bg-[#8F9E8B] text-white border-transparent'
                            : 'bg-white text-[#4A3E3D] border-[#D7C4B7]/40 hover:bg-[#F5EFEB]'
                        }`}
                      >
                        Dine-In
                      </button>
                    </div>
                  </div>

                  {/* Customer Information Checkout Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-6 border-t border-[#D7C4B7]/20">
                    <h4 className="font-serif text-sm font-bold text-[#2D221E]">Preorder Details</h4>
                    
                    {/* Customer Name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D221E] focus:outline-none focus:ring-2 focus:ring-[#8F9E8B] placeholder-[#4A3E3D]/40 ${
                          errors.name ? 'border-red-400 focus:ring-red-200' : 'border-[#D7C4B7]/40'
                        }`}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.name}</span>}
                    </div>

                    {/* Customer Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={customerPhone}
                          onChange={(e) => {
                            setCustomerPhone(e.target.value);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                          }}
                          className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D221E] focus:outline-none focus:ring-2 focus:ring-[#8F9E8B] placeholder-[#4A3E3D]/40 ${
                            errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-[#D7C4B7]/40'
                          }`}
                        />
                        {errors.phone && <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.phone}</span>}
                      </div>

                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={customerEmail}
                          onChange={(e) => {
                            setCustomerEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                          }}
                          className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-[#2D221E] focus:outline-none focus:ring-2 focus:ring-[#8F9E8B] placeholder-[#4A3E3D]/40 ${
                            errors.email ? 'border-red-400 focus:ring-red-200' : 'border-[#D7C4B7]/40'
                          }`}
                        />
                        {errors.email && <span className="text-[10px] text-red-500 font-medium mt-1 block">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div>
                      <textarea
                        placeholder="Special requests? (e.g. Oat milk, Extra hot coffee, warm up my beef pie...)"
                        rows={2}
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D7C4B7]/40 rounded-xl text-xs sm:text-sm text-[#2D221E] focus:outline-none focus:ring-2 focus:ring-[#8F9E8B] placeholder-[#4A3E3D]/40 resize-none"
                      />
                    </div>

                    {/* Cost Calculations */}
                    <div className="pt-4 border-t border-[#D7C4B7]/20 space-y-2">
                      <div className="flex justify-between text-xs text-[#4A3E3D]/80">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-[#4A3E3D]/50 italic">
                        <span>Includes GST (10%)</span>
                        <span>${gst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-serif font-bold text-[#2D221E] pt-2 border-t border-[#D7C4B7]/10">
                        <span>Total Price (AUD)</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      type="submit"
                      className="w-full py-4 mt-4 bg-[#8F9E8B] hover:bg-[#6D7E69] text-white text-xs font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Complete Preorder</span>
                      <ArrowRight size={13} />
                    </button>
                  </form>
                </>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
