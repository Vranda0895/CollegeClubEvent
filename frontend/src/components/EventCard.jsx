import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';

export default function EventCard({ event, hideRegister = false }) {
  return (
    <div className="group relative bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="p-8 flex-grow relative z-10">
        <div className="flex justify-between items-start mb-5 gap-4">
          <h3 className="text-xl font-bold text-slate-100 leading-tight group-hover:text-indigo-300 transition-colors">{event.eventName}</h3>
          {event.category && (
            <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <Tag size={10} />
              {event.category}
            </span>
          )}
        </div>
        
        <div className="space-y-4 mt-6 text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <div className="bg-white/5 p-2 rounded-xl"><Calendar size={16} className="text-indigo-400" /></div>
            <span>{event.date || 'TBA'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 p-2 rounded-xl"><Clock size={16} className="text-purple-400" /></div>
            <span>{event.time || 'TBA'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 p-2 rounded-xl"><MapPin size={16} className="text-cyan-400" /></div>
            <span className="truncate pr-2">{event.venue || 'TBA'}</span>
          </div>
        </div>
        
        <p className="mt-8 text-slate-400/80 line-clamp-3 text-sm leading-relaxed font-light">
          {event.description}
        </p>
      </div>
      
      {!hideRegister && (
        <div className="p-8 pt-0 mt-auto relative z-10">
          <Link
            to={`/register/${event.id}`}
            className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 text-slate-200 hover:text-white border border-white/10 hover:border-transparent font-medium py-3.5 px-4 rounded-xl transition-all duration-300"
          >
            Register Now
          </Link>
        </div>
      )}
    </div>
  );
}
