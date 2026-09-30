import { useState, useEffect } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent, fetchRegistrations, searchRegistrations, filterRegistrations } from '../api';
import { Trash2, Edit2, Search, Filter, Plus, Calendar as CalendarIcon, Users } from 'lucide-react';

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  const initialEventState = { eventName: '', date: '', time: '', venue: '', description: '', category: '' };
  const [eventForm, setEventForm] = useState(initialEventState);
  const [editingId, setEditingId] = useState(null);
  
  const [searchReg, setSearchReg] = useState('');
  const [filterCol, setFilterCol] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    Promise.all([fetchEvents(), fetchRegistrations()])
      .then(([evts, regs]) => {
        setEvents(evts);
        setRegistrations(regs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEvent(editingId, eventForm);
        alert("Event successfully updated!");
      } else {
        await createEvent(eventForm);
        alert("Event successfully created!");
      }
      setEventForm(initialEventState);
      setEditingId(null);
      loadData();
    } catch (err) {
      alert("Failed to save event");
    }
  };

  const handleEditClick = (evt) => {
    setEditingId(evt.id);
    setEventForm({
      eventName: evt.eventName || '', date: evt.date || '', time: evt.time || '',
      venue: evt.venue || '', description: evt.description || '', category: evt.category || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEventForm(initialEventState);
  };

  const handleDeleteEvent = async (id) => {
    if (confirm("Are you sure you want to delete this event? This cannot be undone.")) {
      try {
        await deleteEvent(id);
        if (editingId === id) cancelEdit();
        loadData();
      } catch (err) {
        alert("Failed to delete event");
      }
    }
  };

  const handleSearchReg = (e) => {
    e.preventDefault();
    if (!searchReg) return loadData();
    searchRegistrations(searchReg).then(setRegistrations);
  };

  const handleFilterReg = (e) => {
    e.preventDefault();
    if (!filterCol) return loadData();
    filterRegistrations(filterCol).then(setRegistrations);
  };

  const inputClasses = "w-full bg-[#030712]/50 border border-white/10 rounded-xl p-3.5 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner";

  return (
    <div className="py-8 md:py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-400 mt-4 text-lg font-light">Manage your college club events and student registrations.</p>
      </div>
      
      <div className="flex gap-2 border-b border-white/10 mb-10 overflow-x-auto no-scrollbar">
        <button 
          className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-colors whitespace-nowrap ${activeTab === 'events' ? 'border-b-2 border-indigo-400 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
          onClick={() => setActiveTab('events')}
        >
          <CalendarIcon size={18} /> Manage Events
        </button>
        <button 
          className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-colors whitespace-nowrap ${activeTab === 'registrations' ? 'border-b-2 border-indigo-400 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
          onClick={() => setActiveTab('registrations')}
        >
          <Users size={18} /> View Registrations
        </button>
      </div>

      {activeTab === 'events' && (
        <div className="grid lg:grid-cols-[1.2fr_1.8fr] gap-10 xl:gap-16">
          {/* Form Section */}
          <div>
            <div className="bg-[#0B1120]/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden sticky top-28">
              {editingId && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>}
              {!editingId && <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50"></div>}
              
              <div className="flex items-center gap-4 mb-8 mt-2">
                <div className={`p-3 rounded-xl border ${editingId ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                  {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {editingId ? 'Edit Event' : 'Create Event'}
                </h2>
              </div>

              <form onSubmit={handleSubmitEvent} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Event Name</label>
                  <input required value={eventForm.eventName} onChange={e=>setEventForm({...eventForm, eventName: e.target.value})} className={inputClasses} placeholder="e.g. Annual Tech Summit" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Date</label>
                    <input type="date" required value={eventForm.date} onChange={e=>setEventForm({...eventForm, date: e.target.value})} className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Time</label>
                    <input type="time" required value={eventForm.time} onChange={e=>setEventForm({...eventForm, time: e.target.value})} className={inputClasses} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Venue</label>
                  <input required value={eventForm.venue} onChange={e=>setEventForm({...eventForm, venue: e.target.value})} className={inputClasses} placeholder="e.g. Main Auditorium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Category</label>
                  <input required value={eventForm.category} onChange={e=>setEventForm({...eventForm, category: e.target.value})} className={inputClasses} placeholder="e.g. Technology" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
                  <textarea required value={eventForm.description} onChange={e=>setEventForm({...eventForm, description: e.target.value})} className={`${inputClasses} h-32 resize-none`} placeholder="Provide event details..."></textarea>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button type="submit" className={`flex-1 flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5 ${editingId ? 'bg-gradient-to-r from-amber-600 to-orange-500 shadow-amber-900/30 hover:shadow-amber-900/50' : 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-900/30 hover:shadow-indigo-900/50'}`}>
                    {editingId ? 'Save Changes' : 'Publish Event'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={cancelEdit} className="px-6 border border-white/10 bg-white/5 rounded-xl font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Event Roster
              </h2>
              <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm py-1.5 px-4 rounded-full font-bold tracking-wider">{events.length} TOTAL</span>
            </div>
            
            <div className="space-y-4">
              {loading && events.length === 0 ? (
                 <div className="text-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div></div>
              ) : events.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10 backdrop-blur-sm">
                  <CalendarIcon size={48} className="text-slate-600 mx-auto mb-5" />
                  <p className="text-slate-400 font-medium text-lg">No events exist yet.</p>
                  <p className="text-slate-500 mt-2">Use the form to create your first event.</p>
                </div>
              ) : (
                events.map(evt => (
                  <div key={evt.id} className={`group bg-white/[0.02] border backdrop-blur-sm rounded-2xl p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-5 transition-all hover:bg-white/[0.05] hover:shadow-xl hover:-translate-y-0.5 ${editingId === evt.id ? 'border-amber-500/50 bg-amber-500/5 shadow-amber-900/10' : 'border-white/10 hover:border-white/20 hover:shadow-black/50'}`}>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-bold text-white text-xl">{evt.eventName}</h3>
                        {evt.category && <span className="text-[10px] uppercase font-bold tracking-wider bg-white/10 text-slate-300 px-2.5 py-1 rounded-full border border-white/5">{evt.category}</span>}
                      </div>
                      <p className="text-sm text-slate-400 flex items-center gap-2 font-medium">
                        <span>{evt.date}</span> <span className="text-slate-600">&bull;</span> <span>{evt.time}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto opacity-100 lg:opacity-30 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditClick(evt)} className="text-slate-300 hover:text-white bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 p-3 rounded-xl transition-all" title="Edit Event">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDeleteEvent(evt.id)} className="text-slate-300 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/30 p-3 rounded-xl transition-all" title="Delete Event">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div>
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white/[0.02] p-4 rounded-3xl border border-white/10 backdrop-blur-sm">
            <form onSubmit={handleSearchReg} className="flex flex-1 gap-3">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search size={18} className="text-slate-500 group-focus-within:text-indigo-400" /></div>
                <input placeholder="Search student name..." value={searchReg} onChange={e=>setSearchReg(e.target.value)} className="w-full bg-[#030712]/50 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner" />
              </div>
              <button className="bg-white/5 hover:bg-white/10 text-white px-6 rounded-2xl font-semibold transition-colors border border-white/5">Search</button>
            </form>
            
            <div className="hidden md:block w-px bg-white/10 mx-1"></div>
            
            <form onSubmit={handleFilterReg} className="flex flex-1 gap-3">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Filter size={18} className="text-slate-500 group-focus-within:text-purple-400" /></div>
                <input placeholder="Filter by college..." value={filterCol} onChange={e=>setFilterCol(e.target.value)} className="w-full bg-[#030712]/50 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 shadow-inner" />
              </div>
              <button className="bg-white/5 hover:bg-white/10 text-white px-6 rounded-2xl font-semibold transition-colors border border-white/5">Filter</button>
            </form>
            
            {(searchReg || filterCol) && (
              <button onClick={() => { setSearchReg(''); setFilterCol(''); loadData(); }} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 rounded-2xl font-semibold transition-colors shrink-0">Clear</button>
            )}
          </div>
          
          <div className="overflow-x-auto bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">ID</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Student Name</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Email</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">College & Year</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Phone</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-400">Event ID</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, idx) => (
                  <tr key={reg.id} className={`border-b border-white/5 hover:bg-white/[0.04] transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                    <td className="p-5 text-sm text-slate-500 font-mono">#{reg.id}</td>
                    <td className="p-5 font-semibold text-slate-200">{reg.name}</td>
                    <td className="p-5 text-sm text-slate-400">{reg.email}</td>
                    <td className="p-5 text-sm text-slate-400">
                      <span className="text-slate-300 font-medium">{reg.college}</span> 
                      <span className="text-slate-500 ml-3 text-xs font-bold border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Yr {reg.year}</span>
                    </td>
                    <td className="p-5 text-sm text-slate-400 font-mono">{reg.phoneNumber}</td>
                    <td className="p-5 text-sm text-slate-400">
                      <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-md font-mono font-semibold">EVT-{reg.eventId}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {registrations.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users size={32} className="text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No registrations found</h3>
                <p className="text-slate-400">Wait for students to start registering for your events.</p>
              </div>
            )}
            {loading && (
               <div className="text-center p-20">
                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mx-auto"></div>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
