import { useEffect, useState } from 'react';
import { X, Printer, Clock, Coffee, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { CheckoutDetails } from './CartDrawer';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  checkoutDetails: CheckoutDetails | null;
  orderId: string;
}

export default function ReceiptModal({
  isOpen,
  onClose,
  cartItems,
  checkoutDetails,
  orderId,
}: ReceiptModalProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gst = subtotal * 0.1;

  if (!isOpen || !checkoutDetails) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop Mask */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2D221E] z-40"
        />

        {/* Receipt Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="bg-[#FDFBF7] rounded-3xl w-full max-w-md shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh] border border-[#D7C4B7]/40"
        >
          {/* Top Banner Alert */}
          <div className="bg-[#8F9E8B] text-white p-4 text-center flex items-center justify-center space-x-2 font-sans text-xs font-semibold tracking-wider uppercase">
            <Sparkles size={14} className="animate-spin-slow text-[#D4AF37]" />
            <span>Order Placed Successfully!</span>
          </div>

          {/* Body Scroll */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
            
            {/* Live Collection Clock */}
            <div className="bg-[#F5EFEB] p-5 rounded-2xl border border-[#D7C4B7]/30 text-center flex flex-col items-center">
              <Clock size={28} className="text-[#8F9E8B] animate-pulse mb-2" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4A3E3D]/70 font-sans">
                Estimated Collection Clock
              </span>
              <span className="font-mono text-3xl font-bold text-[#2D221E] mt-1">
                {formatTime(timeLeft)}
              </span>
              <p className="text-[11px] text-[#4A3E3D] font-light mt-2 max-w-xs leading-normal">
                Please head to 39 Booth St counter in <span className="font-semibold text-[#8F9E8B]">15 minutes</span>. Your hot goods and barista brew will be waiting!
              </p>
            </div>

            {/* Vintage Thermal Paper Receipt */}
            <div className="bg-white border border-[#D7C4B7]/20 p-5 shadow-sm rounded-xl relative overflow-hidden font-mono text-xs text-[#2D221E] leading-normal">
              
              {/* Receipt jag top edge */}
              <div className="absolute top-0 left-0 right-0 h-1 flex justify-between">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-2.5 h-1 bg-[#FDFBF7] rounded-b-full shrink-0" />
                ))}
              </div>

              {/* Header */}
              <div className="text-center pt-3 pb-4 border-b border-dashed border-[#2D221E]/20 space-y-1">
                <span className="font-serif text-base font-bold tracking-tight uppercase block text-[#2D221E]">
                  ANNANDALE BAKEHOUSE
                </span>
                <span className="text-[9px] block text-[#4A3E3D]/80">39 BOOTH ST, ANNANDALE, NSW</span>
                <span className="text-[9px] block text-[#4A3E3D]/80">PH: +61 2 9555 1234</span>
                <span className="text-[9px] block text-[#4A3E3D]/80">ABN: 48 109 239 845</span>
              </div>

              {/* Order Metadata */}
              <div className="py-4 border-b border-dashed border-[#2D221E]/20 space-y-1">
                <div className="flex justify-between">
                  <span>ORDER ID:</span>
                  <span className="font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>DATE:</span>
                  <span>{new Date().toLocaleDateString('en-AU')}</span>
                </div>
                <div className="flex justify-between">
                  <span>TIME:</span>
                  <span>{new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between text-[#8F9E8B] font-bold">
                  <span>DINING TYPE:</span>
                  <span>{checkoutDetails.orderType.toUpperCase()}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="py-4 border-b border-dashed border-[#2D221E]/20 space-y-1">
                <div className="flex justify-between">
                  <span>NAME:</span>
                  <span className="font-bold truncate max-w-[200px]">{checkoutDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>PHONE:</span>
                  <span>{checkoutDetails.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>EMAIL:</span>
                  <span className="truncate max-w-[200px]">{checkoutDetails.email}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="py-4 border-b border-dashed border-[#2D221E]/20 space-y-3">
                <div className="flex justify-between font-bold text-[10px] text-[#4A3E3D]/70">
                  <span>ITEM</span>
                  <span>TOTAL</span>
                </div>
                {cartItems.map((item) => (
                  <div key={item.product.id} className="space-y-0.5">
                    <div className="flex justify-between">
                      <span className="max-w-[260px] truncate">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <span className="block text-[9px] text-[#4A3E3D]/60 pl-4">
                      (${item.product.price.toFixed(2)} ea)
                    </span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {checkoutDetails.specialNotes.trim() && (
                <div className="py-4 border-b border-dashed border-[#2D221E]/20 space-y-1">
                  <span className="font-bold block">SPECIAL INSTRUCTIONS:</span>
                  <p className="text-[10px] text-[#4A3E3D] italic bg-[#F5EFEB]/50 p-2 rounded-lg leading-normal">
                    "{checkoutDetails.specialNotes}"
                  </p>
                </div>
              )}

              {/* Subtotals & Taxes */}
              <div className="pt-4 space-y-1.5">
                <div className="flex justify-between">
                  <span>SUBTOTAL:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#4A3E3D]/60 text-[10px]">
                  <span>INCLUDES GST (10%):</span>
                  <span>${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-dashed border-[#2D221E]/30 text-[#2D221E]">
                  <span>TOTAL AMOUNT:</span>
                  <span>${subtotal.toFixed(2)} AUD</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-6 pb-2 space-y-1">
                <span className="block font-bold">THANK YOU FOR SUPPORTING LOCAL!</span>
                <span className="block text-[9px] text-[#4A3E3D]/70">WE WILL HAVE EVERYTHING READY SOON.</span>
                <div className="flex justify-center items-center space-x-1 text-[9px] text-[#8F9E8B] font-semibold pt-1">
                  <Coffee size={10} />
                  <span>CRAFTED WITH LOVE</span>
                </div>
              </div>

            </div>

          </div>

          {/* Action buttons footer */}
          <div className="p-6 bg-[#F5EFEB] border-t border-[#D7C4B7]/20 flex space-x-4">
            <button
              onClick={() => {
                window.print();
              }}
              className="flex-1 py-3 bg-white border border-[#D7C4B7] hover:bg-gray-50 text-[#2D221E] text-xs font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <Printer size={13} />
              <span>Print Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#8F9E8B] hover:bg-[#6D7E69] text-white text-xs font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
            >
              <Clock size={13} />
              <span>Back to Site</span>
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
