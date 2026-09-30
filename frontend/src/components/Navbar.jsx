import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50' : 'bg-transparent border-b border-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
              <CalendarDays className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              Nexus<span className="font-light text-slate-400">Events</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/events" className="hover:text-white transition-colors">Events</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
            <Link to="/events" className="bg-white text-[#030712] hover:bg-indigo-50 px-5 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Explore Events
            </Link>
          </div>

          <button 
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B1120] border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl backdrop-blur-xl">
          <Link to="/" className="text-slate-300 font-medium hover:text-white p-3 rounded-xl hover:bg-white/5">Home</Link>
          <Link to="/events" className="text-slate-300 font-medium hover:text-white p-3 rounded-xl hover:bg-white/5">Events</Link>
          <Link to="/admin" className="text-slate-300 font-medium hover:text-white p-3 rounded-xl hover:bg-white/5">Admin</Link>
          <Link to="/events" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-3 rounded-xl font-bold mt-4 shadow-lg shadow-indigo-500/20">
            Explore Events
          </Link>
        </div>
      )}
    </nav>
  );
}
