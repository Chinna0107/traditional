import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export function ShippingPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      <Header title="Shipping Policy" />
      
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange to-brand-maroon"></div>
          
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif font-bold text-brand-maroon mb-4"
            >
              Shipping Information
            </motion.h1>
            <p className="text-gray-500">We aim to deliver your spiritual essentials safely and swiftly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Truck className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Delivery Charges</h3>
                <p className="text-gray-600 leading-relaxed">We offer standard delivery charges based on your location and order weight. Free shipping may apply to orders exceeding a certain amount.</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Clock className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Estimated Time</h3>
                <p className="text-gray-600 leading-relaxed">Orders are typically dispatched within 1-2 business days. Delivery normally takes 3-7 business days across India depending on your pin code.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <MapPin className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Tracking Your Order</h3>
                <p className="text-gray-600 leading-relaxed">Once your order is dispatched, you will receive an email and SMS with a tracking link to monitor your shipment's journey.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Safe Packaging</h3>
                <p className="text-gray-600 leading-relaxed">All our divine products, especially fragile items like brassware and idols, are packed with the utmost care to ensure they reach you in pristine condition.</p>
              </div>
            </motion.div>
          </div>

          <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
            <h4 className="font-bold text-brand-maroon mb-2">Important Note</h4>
            <p className="text-gray-600 text-sm">Delivery timelines may be affected during public holidays, extreme weather conditions, or unforeseen logistical challenges. We appreciate your patience during such times.</p>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
