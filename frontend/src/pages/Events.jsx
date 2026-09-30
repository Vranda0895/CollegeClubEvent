import { useEffect, useState } from 'react';
import { fetchEvents, searchEvents, filterEvents } from '../api';
import EventCard from '../components/EventCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const loadEvents = () => {
    setLoading(true);
    fetchEvents().then(data => {
      setEvents(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return loadEvents();
    setLoading(true);
    searchEvents(searchQuery).then(data => {
      setEvents(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (!filterCategory.trim()) return loadEvents();
    setLoading(true);
    filterEvents(filterCategory).then(data => {
      setEvents(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('');
    loadEvents();
  };

  return (
    <div className="py-8 md:py-12">
      <div className="text-center mb-12 md:mb-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Explore Events</h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4 font-light">
          Find the perfect event for you. Search by name or filter by category to discover what's happening on campus.
        </p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-16 bg-white/[0.02] p-4 md:p-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
        <form onSubmit={handleSearch} className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-14 w-full bg-[#030712]/50 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all border border-white/5 hover:border-white/10">
            Search
          </button>
        </form>
        
        <div className="hidden lg:block w-px bg-white/10 mx-2"></div>
        
        <form onSubmit={handleFilter} className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Filter size={20} className="text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Category (e.g. tech, art)" 
              className="pl-14 w-full bg-[#030712]/50 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all border border-white/5 hover:border-white/10">
            Filter
          </button>
        </form>
        
        {(searchQuery || filterCategory) && (
          <button onClick={clearFilters} className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-6 py-4 rounded-2xl transition-all border border-red-500/20 shrink-0 mt-2 lg:mt-0">
            <RefreshCw size={18} />
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white/[0.02] rounded-3xl border border-white/5 backdrop-blur-sm">
          <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No events found</h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8">We couldn't find any events matching your current filters. Try adjusting your search criteria.</p>
          <button onClick={clearFilters} className="text-indigo-400 font-medium hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-8 py-3 rounded-full border border-indigo-500/20 transition-all">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
