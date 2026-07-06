import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BestSellers from './components/BestSellers';
import WhyChooseUs from './components/WhyChooseUs';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import Reviews from './components/Reviews';
import VisitUs from './components/VisitUs';
import Footer from './components/Footer';
import CartDrawer, { CheckoutDetails } from './components/CartDrawer';
import ReceiptModal from './components/ReceiptModal';
import { CartItem, MenuItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Checkout & Receipt Modal states
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState('');

  // Cart actions
  const handleAddToCart = (product: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Visual feedback: slide open the cart drawer!
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleCheckoutSubmit = (details: CheckoutDetails) => {
    // Generate a random Order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `AB-${randomNum}`;
    
    setCurrentOrderId(generatedId);
    setCheckoutDetails(details);
    setIsCartOpen(false);
    setIsReceiptOpen(true);
  };

  const handleCloseReceipt = () => {
    setIsReceiptOpen(false);
    setCartItems([]); // Clear cart after successful checkout
    setCheckoutDetails(null);
    setCurrentOrderId('');
  };

  // Scroll triggers
  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll-to-top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Track active navigational sections
      const sections = ['home', 'about', 'menu', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 250; // offset for nav heights

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-[#FDFBF7] text-[#2D221E] min-h-screen font-sans selection:bg-[#8F9E8B] selection:text-white overflow-x-hidden antialiased">
      
      {/* Dynamic Header */}
      <Header
        cartCount={totalCartCount}
        onCartOpen={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Segments */}
      <main>
        
        {/* Hero Section */}
        <Hero
          onViewMenuClick={() => handleScrollToSection('menu')}
          onVisitUsClick={() => handleScrollToSection('contact')}
        />

        {/* About Section */}
        <About />

        {/* Best Sellers Section */}
        <BestSellers onAddToCart={handleAddToCart} />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Online Menu Section */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* Gallery Section */}
        <GallerySection />

        {/* Testimonial Section */}
        <Reviews />

        {/* Visit Us + Contact Form Section */}
        <VisitUs />

      </main>

      {/* Footer Section */}
      <Footer
        onScrollToTop={handleScrollToTop}
        showScrollTop={showScrollTop}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutSubmit}
      />

      {/* Thermal Receipt Confirmation Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={handleCloseReceipt}
        cartItems={cartItems}
        checkoutDetails={checkoutDetails}
        orderId={currentOrderId}
      />

    </div>
  );
}
