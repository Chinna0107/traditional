import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import imgMeditation from '../assets/story_meditation.png';

export function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      <Header title="About Us" />
      
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange to-brand-maroon" />

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-10"
          >
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-orange-50 shadow-xl relative">
              <div className="absolute inset-0 border border-brand-orange/20 rounded-full z-10" />
              <img src={imgMeditation} alt="Meditation" className="w-full h-full object-cover mix-blend-multiply scale-110 hover:scale-100 transition-transform duration-700" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-maroon">Welcome to Mokshamandir</h1>
            <h2 className="text-lg md:text-xl font-serif font-semibold text-brand-orange">Where Devotion Meets Authenticity</h2>

            <p>At <strong className="text-brand-maroon">Mokshamandir</strong>, we believe that something chosen for worship should never feel ordinary.</p>

            <p>Every idol placed in your mandir, every Rudraksha you wear, every diya you light, and every offering you make carries meaning far beyond the product itself. It becomes part of your prayers, your traditions, your home, and your connection with the divine.</p>

            <p>That belief is at the heart of <strong className="text-brand-maroon">Mokshamandir</strong>.</p>

            <p>We carefully curate authentic, premium spiritual and pooja essentials inspired by India's timeless traditions, with close attention to <strong>origin, craftsmanship, purity, and quality</strong>.</p>

            <p>From Rudraksha and traditional malas to beautifully crafted idols, brass diyas, pooja essentials, and meaningful spiritual treasures, every piece is selected with one purpose:</p>

            <p className="text-brand-maroon font-semibold text-lg md:text-xl font-serif">To bring something truly worthy of your sacred space into your home.</p>

            <p>We believe devotional items deserve more than mass-market treatment. That's why we seek products rooted in traditional craftsmanship and carefully select pieces that reflect the beauty, heritage, and significance of the traditions they represent.</p>

            <p>Because when you choose something for your mandir, for someone you love, or for your own spiritual journey, you're not simply buying an object.</p>

            <p className="font-semibold text-brand-maroon">You're choosing something that can become part of your family's prayers, memories, and traditions for years to come.</p>

            <div className="pt-8 pb-4">
              <div className="w-16 h-1 bg-brand-orange/30 mx-auto rounded-full mb-6" />
              <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-maroon text-center mb-3">More Than a Store. A Connection to Tradition.</h2>
              <p className="font-serif italic text-xl md:text-2xl text-brand-orange text-center">
                Mokshamandir — Sacred. Authentic. Timeless.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
