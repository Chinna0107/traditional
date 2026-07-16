import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Menu, Search, Heart, ShoppingCart, ArrowLeft, Share2,
  User, LogIn, Package, MapPin, LayoutDashboard, LogOut,
  Settings, Shield, ChevronDown, X
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';

function AvatarDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U';

  const items = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'My Orders', path: '/my-orders' },
    { icon: MapPin, label: 'My Addresses', path: '/my-addresses' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Settings, label: 'Account Settings', path: '/account-settings' },
    ...(user?.role === 'admin' ? [{ icon: Shield, label: 'Admin Panel', path: '/admin' }] : []),
  ];

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 group">
        <div className="w-8 h-8 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center shadow-sm ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all">
          {initials}
        </div>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform hidden md:block ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[100]">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
            <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
          </div>

          {items.map(({ icon: Icon, label, path }) => (
            <button key={path} onClick={() => { navigate(path); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors text-left">
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}

          <div className="border-t border-gray-100 mt-1">
            <button onClick={() => { onLogout(); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopFullHeader({ cartCount, wishlistCount, token, user, handleLogout }) {
  return (
    <>
      <div className="h-[76px] hidden md:block" />
      <header className="fixed top-0 left-0 z-50 w-full bg-white px-4 py-3 shadow-sm border-b border-gray-100 hidden md:block">
        <div className="w-full mx-auto flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2">
            <img src="/image.png" alt="Logo" className="h-10 object-contain mix-blend-multiply" />
            <span className="font-bold text-xl text-brand-maroon hidden lg:block tracking-tight">Mokshamandir</span>
          </Link>

          {/* Desktop Nav & Search */}
          <div className="flex-1 flex items-center justify-end md:justify-center px-4 lg:px-12 gap-8">
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors">Home</Link>
              <Link to="/category/all" className="text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors">Categories</Link>
              <Link to="/about" className="text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors">About</Link>
              <Link to="/contact" className="text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors">Contact</Link>
              <Link to="/my-orders" className="text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors">Orders</Link>
            </nav>
            <div className="relative w-[280px] xl:w-[320px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    window.location.href = `/category/all?search=${encodeURIComponent(e.target.value.trim())}`;
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:bg-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/wishlist" className="relative p-1 cursor-pointer hover:-translate-y-0.5 transition-transform">
              <Heart className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#C16E4F] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-1 cursor-pointer hover:-translate-y-0.5 transition-transform">
              <ShoppingCart className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {token ? (
              <AvatarDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-xs font-bold text-white bg-brand-orange px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors ml-2">
                <LogIn className="w-3.5 h-3.5" /> Login
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export function Header({ variant = 'default', title, showShare = false }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;
  
  const { token, user, logout } = useAuthStore();

  const handleLogout = () => { logout(); navigate('/'); };

  const MobileSidebar = () => (
    <>
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] md:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className={`fixed top-0 left-0 w-[280px] h-full bg-white z-[101] shadow-2xl transition-transform duration-300 md:hidden flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-orange-50/50">
          <div className="flex items-center gap-2">
            <img src="/image.png" alt="Logo" className="h-8 object-contain mix-blend-multiply" />
            <span className="font-bold text-lg text-brand-maroon">Mokshamandir</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-gray-500 hover:text-gray-800 bg-white rounded-full shadow-sm">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-2 flex-grow overflow-y-auto">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-semibold text-base py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-brand-orange transition-colors">Home</Link>
          <Link to="/category/all" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-semibold text-base py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-brand-orange transition-colors">Categories</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-semibold text-base py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-brand-orange transition-colors">About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-semibold text-base py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-brand-orange transition-colors">Contact Us</Link>
          <Link to="/my-orders" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-semibold text-base py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-brand-orange transition-colors">My Orders</Link>
          <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-semibold text-base py-3 px-4 rounded-lg hover:bg-orange-50 hover:text-brand-orange transition-colors">My Profile</Link>
        </nav>
        {!token && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-brand-orange text-white font-bold py-3 rounded-xl shadow-sm">
              <LogIn className="w-4 h-4" /> Login to Account
            </Link>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Header is always full header */}
      <DesktopFullHeader cartCount={cartCount} wishlistCount={wishlistCount} token={token} user={user} handleLogout={handleLogout} />
      
      {/* Mobile Header is now global */}
      <div className="md:hidden">
        <MobileSidebar />
        <div className="h-[110px]" />
        <header className="fixed top-0 left-0 z-50 w-full bg-white px-4 py-3 shadow-sm border-b border-gray-100">
          <div className="w-full">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1 -ml-1">
                  <Menu className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                </button>

                <Link to="/" className="flex items-center gap-2">
                  <img src="/image.png" alt="Moksha Mandir" className="h-8 object-contain mix-blend-multiply" />
                  <span className="font-bold text-lg text-brand-maroon">Mokshamandir</span>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/wishlist" className="relative p-1 cursor-pointer">
                  <Heart className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#C16E4F] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link to="/cart" className="relative p-1 cursor-pointer">
                  <ShoppingCart className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="relative mt-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, brands and more..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    navigate(`/category/all?search=${encodeURIComponent(e.target.value.trim())}`);
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
