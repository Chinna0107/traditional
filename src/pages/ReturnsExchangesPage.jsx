import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { RefreshCcw, AlertCircle, CheckCircle2, PhoneCall } from 'lucide-react';

export function ReturnsExchangesPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      <Header title="Returns & Exchanges" />
      
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange to-brand-maroon"></div>
          
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif font-bold text-brand-maroon mb-4"
            >
              Easy Returns & Exchanges
            </motion.h1>
            <p className="text-gray-500">Your satisfaction with our sacred offerings is our priority.</p>
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-4">
              <div className="mt-1">
                <RefreshCcw className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">7-Day Return Policy</h3>
                <p className="text-gray-600 leading-relaxed">If you receive a defective or damaged product, you can request a return or exchange within 7 days of delivery. Please ensure the item is unused and in its original packaging.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-4">
              <div className="mt-1">
                <AlertCircle className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Non-Returnable Items</h3>
                <p className="text-gray-600 leading-relaxed">For hygiene and spiritual reasons, certain items such as perishable pooja samagri (flowers, leaves), opened incense, and custom-made idols cannot be returned unless damaged upon arrival.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4">
              <div className="mt-1">
                <CheckCircle2 className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Refund Process</h3>
                <p className="text-gray-600 leading-relaxed">Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. Approved refunds are processed back to the original payment method within 5-7 business days.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex gap-4">
              <div className="mt-1">
                <PhoneCall className="text-brand-orange w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">How to Initiate</h3>
                <p className="text-gray-600 leading-relaxed">To start a return or exchange, please contact our support team at <strong>mokshamandir542@gmail.com</strong> or call us at <strong>+91 90326 75205</strong> with your order number and photos of the item.</p>
              </div>
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
