export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  tags?: string[]; // e.g., ['Vegan', 'Gluten-Free', 'Vegetarian']
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamically map Lucide icons
}

export interface BusinessHours {
  day: string;
  hours: string;
  isClosed?: boolean;
}
