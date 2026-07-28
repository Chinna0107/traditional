import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What is Mokshamandir?",
    answer: "Mokshamandir is your ultimate destination for authentic and premium pooja samagri. We source high-quality spiritual items from original locations across India to enhance your devotional experience."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order directly from the 'My Orders' section in your account dashboard."
  },
  {
    question: "Are your products authentic?",
    answer: "Yes, we guarantee 100% authenticity. We source directly from revered artisans and specific geographical locations known for their pure materials, like sandalwood from Mysore or brassware from Moradabad."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within India. We are working on expanding our services to international locations soon."
  },
  {
    question: "What should I do if I receive a damaged item?",
    answer: "Please contact our customer support within 7 days of delivery with photos of the damaged item and your order number. We will initiate a return or exchange immediately."
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled before they are dispatched. Once shipped, the standard return policy will apply. You can cancel your order from the 'My Orders' page or by contacting support."
  }
];

export function FAQsPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      <Header title="FAQs" />
      
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
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
              Frequently Asked Questions
            </motion.h1>
            <p className="text-gray-500">Find quick answers to your questions below.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border border-orange-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between bg-white hover:bg-orange-50/50 transition-colors focus:outline-none"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-brand-orange transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 bg-white"
                    >
                      <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-50 mt-2">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link to="/contact" className="inline-block px-6 py-2 bg-brand-orange text-white rounded-full font-medium hover:bg-brand-maroon transition-colors shadow-sm">
              Contact Support
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
