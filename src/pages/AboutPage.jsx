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
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange to-brand-maroon"></div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-5xl font-serif font-bold text-brand-maroon mb-8"
          >
            Our Journey to the Divine
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-10"
          >
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-orange-50 shadow-xl relative">
              <div className="absolute inset-0 border border-brand-orange/20 rounded-full z-10"></div>
              <img src={imgMeditation} alt="Meditation" className="w-full h-full object-cover mix-blend-multiply scale-110 hover:scale-100 transition-transform duration-700" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg text-left"
          >
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-brand-orange first-letter:mr-1 first-letter:float-left">
              Welcome to <strong className="text-brand-maroon">Mokshamandir</strong>, your ultimate destination for authentic and premium pooja samagri. Our journey began with a simple vision: to make divine and pure spiritual items accessible to every household.
            </p>
            <p>
              We understand that spirituality is a deeply personal experience. That's why we meticulously source our products from the most revered artisans and original locations across India. Whether it's the pure sandalwood from Mysore, authentic Rudraksha from the Himalayas, or beautifully crafted brass diyas from Moradabad, we ensure that every item you receive carries the true essence of devotion.
            </p>
            <p>
              At Mokshamandir, we are not just selling products; we are preserving traditions. Our dedicated team works tirelessly to curate items that respect our ancient Vedic roots while meeting the quality expectations of the modern devotee.
            </p>
            
            <div className="pt-8 pb-4">
              <div className="w-16 h-1 bg-brand-orange/30 mx-auto rounded-full mb-6"></div>
              <p className="font-serif italic text-xl md:text-2xl text-brand-maroon text-center">
                "Experience the divine, embrace the tradition."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
