import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Star, Flame, Sparkles, Circle, Gift, Wind, Bell, Droplet, Flower2, Cloud, Grid } from 'lucide-react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../store/useStoreData';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import imgHeroBanner from '../assets/hero_banner.png';
import imgMeditation from '../assets/story_meditation.png';
import imgAarti from '../assets/story_aarti.png';

export function HomePage() {
  const container = useRef(null);
  const { products, categories, loading } = useStoreData();
  const [banners, setBanners] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
    fetch(`${url}/general/banners`)
      .then(r => r.json())
      .then(d => { if (d.banners) setBanners(d.banners); })
      .catch(e => console.error(e));
  }, []);

  React.useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);
  useGSAP(() => {
    if (!loading) {
      gsap.from('.animate-section', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }, { scope: container, dependencies: [loading] });

  const featuredProducts = products.slice(0, 5);

  return (
    <div ref={container} className="bg-gray-50 min-h-screen pb-20">
      <Header variant="home" />
      
      {/* Hero Banner Section */}
      <div className="animate-section px-4 py-4 md:py-8">
        {banners.length > 0 ? (
          <div className="relative w-full md:w-[75%] h-48 md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 mx-auto">
            <div 
              className="flex h-full transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="relative w-full h-full shrink-0">
                  <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-6 md:px-16">
                    <h2 className="text-white text-2xl md:text-5xl font-bold mb-4 leading-tight font-serif tracking-wide drop-shadow-lg">
                      {banner.title}
                    </h2>
                    {(banner.link_url || banner.link_url === '') && (
                      <Link to={banner.link_url || "/category/all"} className="bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-maroon text-xs md:text-base font-bold px-8 py-3 md:py-4 rounded-xl w-fit shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                        SHOP NOW
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Slider Dots */}
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-2">
              {banners.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6 md:w-8' : 'bg-white/50 w-1.5 md:w-2 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative w-full md:w-[75%] h-48 md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img src={imgHeroBanner} alt="Hero Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-6 md:px-16">
                <h2 className="text-white text-2xl md:text-5xl font-bold mb-4 leading-tight font-serif tracking-wide drop-shadow-lg">
                  Everything for <br/> Your Divine Rituals
                </h2>
                <Link to="/category/all" className="bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-maroon text-xs md:text-base font-bold px-8 py-3 md:py-4 rounded-xl w-fit shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:max-w-full mx-auto w-full pb-20">
        {/* Categories Grid */}
        <div className="animate-section px-4 md:px-24 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Categories</h3>
            <Link to="/category/all" className="text-xs font-semibold text-brand-orange">View all</Link>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-y-6 gap-x-2">
            {categories.map((cat) => {
              const IconMap = {
                Flame,
                Sparkles,
                Circle,
                Gift,
                Wind,
                Bell,
                Droplet,
                Flower2,
                Cloud,
                Grid
              };
              const Icon = IconMap[cat.icon] || Star;

              return (
                <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-1.5 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange shadow-sm border border-orange-100 overflow-hidden">
                    {cat.image_url ? (
                      <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <Star className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                    )}
                  </div>
                  <span className="text-[10px] md:text-xs font-medium text-gray-600 text-center leading-tight">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

      {/* Trending Products */}
      {products.filter(p => p.is_trending).length > 0 && (
        <div className="animate-section mb-8">
          <div className="flex justify-between items-center mb-4 px-4 md:px-24">
            <h3 className="font-bold text-gray-900">Trending Products</h3>
            <Link to="/category/all" className="text-xs font-semibold text-brand-orange">View all</Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-24 pb-2 md:grid md:grid-cols-4 lg:grid-cols-5 md:overflow-visible">
            {products.filter(p => p.is_trending).slice(0, 5).map(product => (
              <div key={product.id} className="w-[140px] md:w-auto shrink-0 hover:-translate-y-1 transition-transform">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Offers / Festival Banner */}
      <div className="animate-section px-4 mb-12 flex justify-center mt-6">
        <div className="relative w-full md:w-[75%] h-32 md:h-[300px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <img src={imgAarti} alt="Diwali Special" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon/95 via-brand-maroon/80 to-transparent flex flex-col justify-center px-6 md:px-12">
            <div className="bg-brand-gold text-brand-maroon text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-3">Today's Offers</div>
            <h2 className="text-white text-xl md:text-4xl font-bold mb-4 leading-tight font-serif drop-shadow-md">
              Get up to 50% OFF<br/>on Pooja Thalis
            </h2>
            <Link to="/category/all" className="bg-white text-brand-maroon text-[10px] md:text-sm font-bold px-6 py-2.5 md:px-8 md:py-3 rounded-xl w-fit hover:bg-gray-50 hover:scale-105 shadow-lg transition-all">
              SHOP OFFERS
            </Link>
          </div>
        </div>
      </div>

      {/* Festive Collection */}
      {products.filter(p => p.is_festive).length > 0 && (
        <div className="animate-section mb-8 px-4 md:px-24">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Festive Collection</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {products.filter(p => p.is_festive).slice(0, 5).map(product => (
              <div key={product.id} className="hover:-translate-y-1 transition-transform">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offers Section */}
      {products.filter(p => p.is_offer).length > 0 && (
        <div className="animate-section mb-8 px-4 md:px-24">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Special Offers</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {products.filter(p => p.is_offer).slice(0, 5).map(product => (
              <div key={product.id} className="hover:-translate-y-1 transition-transform">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Sellers */}
      {products.filter(p => p.is_bestseller).length > 0 && (
        <div className="animate-section mb-8 px-4 md:px-24">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Best Sellers</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {products.filter(p => p.is_bestseller).slice(0, 5).map(product => (
              <div key={product.id} className="hover:-translate-y-1 transition-transform">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews */}
      <section className="px-4 md:px-24 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Customer Reviews</h3>
          <span className="text-xs font-semibold text-brand-orange cursor-pointer">View all</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3].map((rev) => (
            <div key={rev} className="bg-white border border-gray-100 p-4 md:p-6 rounded-2xl shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-100 overflow-hidden shrink-0 flex items-center justify-center text-brand-orange font-bold text-sm md:text-base">
                PS
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs md:text-sm font-bold text-gray-900">Priya Sharma</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-gray-600 italic">"Excellent quality and packaging. Truly divine experience!"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      </div>

    </div>
  );
}
