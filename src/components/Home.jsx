import React from 'react';
import { Truck, Gift, Heart, MessageCircle } from 'lucide-react';
// Note: We use a simulated user object as localStorage is not persistent 
// across all environments. In a real app, you would fetch the user from context/auth.
const simulatedUser = { name: "Aashish" };

// Tailwind Configuration (simulated, assuming classes are available)
// Primary Accent: #C483F0 (Lilac/Purple)
// Primary Text: #1e293b (Dark Blue/Charcoal)
// Background: #f8f7ff (Light Lavender/Off-White)

export default function Home() {
  const user = simulatedUser;

  const services = [
    { 
      icon: <Truck size={48} className="text-shreemcraft-primary" />,
      title: "Fast Global Shipping",
      desc: "Get your handmade goods delivered quickly and reliably to any location worldwide.",
      bg: "bg-purple-100"
    },
    {
      icon: <Gift size={48} className="text-shreemcraft-primary" />,
      title: "Customized Gifting",
      desc: "Personalize your products with custom engravings and luxurious gift wrapping options.",
      bg: "bg-purple-100"
    },
    {
      icon: <Heart size={48} className="text-shreemcraft-primary" />,
      title: "Handmade Quality",
      desc: "Each item is carefully crafted by skilled artisans, ensuring unique and lasting quality.",
      bg: "bg-purple-100"
    },
  ];

  const popularProducts = [
    { id: 1, meta: { likes: 147, comments: 352 }, price: "$54.00" },
    { id: 2, meta: { likes: 210, comments: 45 }, price: "$79.99" },
    { id: 3, meta: { likes: 98, comments: 112 }, price: "$45.00" },
    { id: 4, meta: { likes: 305, comments: 501 }, price: "$120.50" },
  ];

  // Utility button style for consistency
  const PrimaryButton = ({ children, className = "" }) => (
    <button 
      className={`bg-shreemcraft-primary hover:bg-shreemcraft-dark text-white font-medium py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl tracking-wider ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-shreemcraft-bg text-shreemcraft-text font-inter">
      
      {/* --- Custom Utility Styles for Shreemcraft Theme --- */}
      <style>
        {`
        .bg-shreemcraft-bg { background-color: #f8f7ff; }
        .text-shreemcraft-primary { color: #C483F0; }
        .bg-shreemcraft-primary { background-color: #C483F0; }
        .hover\\:bg-shreemcraft-dark:hover { background-color: #52465D; }
        .text-shreemcraft-text { color: #1e293b; }
        
        .hero-bg {
            background-image: linear-gradient(rgba(30, 41, 59, 0.4), rgba(30, 41, 59, 0.6)), 
                            url('https://placehold.co/1200x500/805ad5/ffffff?text=Elegance+in+Craft');
            background-size: cover;
            background-position: center;
        }

        /* Responsive Contact Circle */
        .contact-circle {
            min-height: 500px;
            width: 90%;
            max-width: 500px;
            padding: 40px;
        }

        @media (min-width: 768px) {
            .contact-circle {
                width: 500px;
            }
        }
        `}
      </style>

      {/* Hero Section */}
      <section className="hero-bg h-[60vh] md:h-[75vh] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight drop-shadow-lg">
            Curated Handmade Goods
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 drop-shadow-md">
            Find unique crafts that transform your space.
          </p>
          <PrimaryButton className="text-sm">
            EXPLORE COLLECTIONS
          </PrimaryButton>
          
          {/* Welcome Message (Login Only Content) */}
          <div className="mt-8">
            <div className="bg-white/90 px-6 py-3 rounded-full inline-block shadow-xl">
              <p className="text-shreemcraft-text text-base font-semibold">
                Welcome back, {user?.name || 'Guest'} 👋
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (What We Do) */}
      <section className="py-20 px-4 md:px-8 text-center bg-white">
        <p className="text-xs tracking-widest text-shreemcraft-primary font-bold mb-2">
          WHAT WE OFFER
        </p>
        <h3 className="text-3xl md:text-4xl font-bold mb-16 text-shreemcraft-text">
          Designed with Passion, Crafted with Care
        </h3>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="rounded-2xl p-8 shadow-lg transition duration-300 hover:shadow-2xl bg-gray-50">
              <div className="mb-4">{service.icon}</div>
              <h4 className="text-xl font-semibold mb-3 text-shreemcraft-text">
                {service.title}
              </h4>
              <p className="text-sm text-gray-600 mb-6">
                {service.desc}
              </p>
              <button className="text-shreemcraft-primary text-sm font-medium border border-shreemcraft-primary rounded-full px-4 py-2 hover:bg-shreemcraft-primary hover:text-white transition duration-300">
                DISCOVER
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Gift Ideas Section (Featured Banner) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-shreemcraft-primary/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          
          {/* Content */}
          <div className="md:w-1/2 text-left">
            <p className="text-xs tracking-widest text-shreemcraft-primary font-bold mb-2">
              EXCLUSIVE FOR YOU
            </p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-shreemcraft-text">
              Gifts That Spark Joy and Last
            </h3>
            <p className="text-base text-gray-700 mb-8">
              Explore our range of unique, high-quality handcrafted items perfect for any occasion. From customized jewelry to elegant home decor, give a gift that truly stands out.
            </p>
            <PrimaryButton>
              SHOP GIFTS →
            </PrimaryButton>
          </div>

          {/* Image Placeholder */}
          <div className="md:w-1/2 flex justify-center">
            <div className="text-9xl text-shreemcraft-primary opacity-60">
              🏺
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 px-4 md:px-8 text-center bg-shreemcraft-bg">
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-shreemcraft-text">
          See What's Popular
        </h3>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
              
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-100 flex items-center justify-center text-7xl text-shreemcraft-primary/50">
                ✨
              </div>
              
              <div className="p-4 flex flex-col items-start">
                <p className="text-sm font-semibold mb-2 text-shreemcraft-text">Product Name {product.id}</p>
                <div className="flex justify-between items-center w-full">
                    <p className="text-lg font-bold text-shreemcraft-text">{product.price}</p>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                        <span className="flex items-center gap-1"><Heart size={14}/> {product.meta.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={14}/> {product.meta.comments}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PrimaryButton className="mt-12 text-sm">
            VIEW ALL PRODUCTS
        </PrimaryButton>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 flex justify-center bg-white">
        <div className="contact-circle bg-shreemcraft-primary/20 rounded-full flex flex-col justify-center items-center text-center p-10 md:p-16 shadow-2xl">
          <h3 className="text-3xl font-bold mb-4 text-shreemcraft-text">
            Need Expert Advice?
          </h3>
          <p className="text-sm text-gray-700 mb-8 max-w-sm">
            Our dedicated support team is happy to assist you with custom orders, gifting, or any product queries. Let's create something beautiful together.
          </p>
          <PrimaryButton className="text-sm">
            LET'S TALK
          </PrimaryButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-shreemcraft-text text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8 mb-8">
            {/* Column 1: Logo & Subscribe */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold tracking-widest text-shreemcraft-primary">
                SHREEMCRAFT
              </h4>
              <p className="text-sm text-gray-400">
                Handcrafted goods designed to inspire joy.
              </p>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="p-3 border border-gray-600 bg-gray-800 text-sm rounded-lg focus:ring-shreemcraft-primary focus:border-shreemcraft-primary transition"
              />
              <button className="bg-shreemcraft-primary text-white p-3 text-sm font-medium rounded-lg hover:bg-shreemcraft-dark transition">
                SUBSCRIBE
              </button>
            </div>
            
            {/* Columns 2-4: Links */}
            <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <p className="font-semibold mb-2">Quick Links</p>
                <a href="#collections" className="text-gray-400 hover:text-shreemcraft-primary transition">Collections</a>
                <a href="#about" className="text-gray-400 hover:text-shreemcraft-primary transition">About Us</a>
                <a href="#contact" className="text-gray-400 hover:text-shreemcraft-primary transition">Contact Us</a>
                <a href="/faq" className="text-gray-400 hover:text-shreemcraft-primary transition">FAQ</a>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold mb-2">Support</p>
                <a href="/shipping" className="text-gray-400 hover:text-shreemcraft-primary transition">Shipping & Returns</a>
                <a href="/policy" className="text-gray-400 hover:text-shreemcraft-primary transition">Store Policy</a>
                <a href="/privacy" className="text-gray-400 hover:text-shreemcraft-primary transition">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-shreemcraft-primary transition">Terms & Conditions</a>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold mb-2">Connect</p>
                <p className="text-gray-400">+65 345 678 903</p>
                <p className="text-gray-400">support@shreemcraft.com</p>
                <p className="text-gray-400">123 Crafting Lane, HQ</p>
              </div>
            </div>
          </div>
          
          {/* Logout Button */}
          <div className="text-center pt-4">
            <button 
              onClick={() => {
                // In a real app, this would clear authentication state and redirect
                // For this environment, we just log a message.
                console.log("User logged out");
                window.location.href = "/login";
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-8 text-sm font-medium rounded-full transition"
            >
              Logout
            </button>
            <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} Shreemcraft. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}