import { useEffect, useState } from 'react';
import { fetchEvents } from '../api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events", err);
        setLoading(false);
      });
  }, []);

  const featuredEvent = events.length > 0 ? events[0] : null;
  const upcomingEvents = events.slice(1, 4);

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-32 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[400px] bg-gradient-to-r from-indigo-500/20 to-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs md:text-sm font-semibold tracking-wider mb-8 uppercase backdrop-blur-sm">
          <Sparkles size={16} />
          College Club Events
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[1.1]">
          Where Ideas Meet. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Events Come Alive.</span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed px-4">
          Join our vibrant community. Discover exciting events, engaging workshops, and exclusive meetups tailored for your growth and networking.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-4">
          <Link to="/events" className="inline-flex items-center justify-center gap-2 bg-white text-[#030712] font-semibold py-4 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
            Explore Events
            <ArrowRight size={20} />
          </Link>
          <Link to="/events" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-full transition-all">
            Register for an Event
          </Link>
        </div>
        
        <div className="mt-24 animate-bounce text-slate-500 text-sm font-medium tracking-wide">
          Upcoming events &darr;
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {featuredEvent && (
            <section className="relative">
              <div className="absolute -left-10 top-20 w-72 h-72 bg-blue-600/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Featured Event</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>
              
              <div className="relative group rounded-[2rem] p-[1px] overflow-hidden bg-gradient-to-b from-indigo-500/40 via-purple-500/10 to-transparent hover:from-indigo-400/50 transition-all duration-500 shadow-2xl shadow-indigo-900/10">
                <div className="bg-[#0B1120]/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                  
                  <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      {featuredEvent.category && (
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-6 uppercase">
                          {featuredEvent.category}
                        </span>
                      )}
                      <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">{featuredEvent.eventName}</h3>
                      <p className="text-base md:text-lg text-slate-400 mb-10 leading-relaxed font-light">
                        {featuredEvent.description}
                      </p>
                      
                      <Link
                        to={`/register/${featuredEvent.id}`}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 px-10 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] w-full sm:w-auto"
                      >
                        Reserve Your Spot
                      </Link>
                    </div>
                    
                    <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                      <div className="flex items-start gap-5">
                        <div className="bg-indigo-500/20 p-3.5 rounded-xl border border-indigo-500/20 shrink-0"><Sparkles className="text-indigo-400" size={24} /></div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Date</p>
                          <p className="text-lg md:text-xl text-white font-semibold">{featuredEvent.date || 'To be announced'}</p>
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-white/5"></div>
                      <div className="flex items-start gap-5">
                        <div className="bg-purple-500/20 p-3.5 rounded-xl border border-purple-500/20 shrink-0"><Sparkles className="text-purple-400" size={24} /></div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Time</p>
                          <p className="text-lg md:text-xl text-white font-semibold">{featuredEvent.time || 'To be announced'}</p>
                        </div>
                      </div>
                      <div className="w-full h-[1px] bg-white/5"></div>
                      <div className="flex items-start gap-5">
                        <div className="bg-cyan-500/20 p-3.5 rounded-xl border border-cyan-500/20 shrink-0"><Sparkles className="text-cyan-400" size={24} /></div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Venue</p>
                          <p className="text-lg md:text-xl text-white font-semibold">{featuredEvent.venue || 'To be announced'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {upcomingEvents.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">What's Happening</h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
                <Link to="/events" className="hidden sm:flex text-indigo-400 font-medium hover:text-indigo-300 transition-colors items-center gap-1 shrink-0">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              
              <div className="mt-8 text-center sm:hidden">
                <Link to="/events" className="inline-flex text-indigo-400 font-medium hover:text-indigo-300 transition-colors items-center gap-1">
                  View all events <ArrowRight size={16} />
                </Link>
              </div>
            </section>
          )}

          {events.length === 0 && (
            <div className="text-center bg-white/[0.02] border border-white/5 rounded-3xl py-24 px-4 backdrop-blur-sm">
              <Sparkles className="text-slate-600 mx-auto mb-6" size={48} />
              <p className="text-xl text-slate-400 font-medium">More amazing events coming soon.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
