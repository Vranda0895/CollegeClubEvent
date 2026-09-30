import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventById, createRegistration } from '../api';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Registration() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', email: '', college: '', year: '', phoneNumber: ''
  });

  useEffect(() => {
    fetchEventById(eventId)
      .then(data => {
        if (!data || data.status === 404) throw new Error("Not found");
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Event not found or server is unavailable.");
        setLoading(false);
      });
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createRegistration(eventId, formData);
      setSubmitting(false);
      alert("Registration successful! See you there.");
      navigate('/events');
    } catch (err) {
      setError("Registration failed. Please check your network or inputs.");
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-32">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (!event) return (
    <div className="max-w-md mx-auto mt-20 text-center bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md">
      <p className="text-red-400 font-medium mb-8 text-lg">{error}</p>
      <button onClick={() => navigate('/events')} className="text-indigo-400 font-medium hover:text-white transition-colors bg-white/5 px-6 py-2.5 rounded-full border border-white/10">
        &larr; Back to Events
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-8 md:py-16 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-[#0B1120]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600"></div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Reserve Your Spot</h2>
          <p className="text-slate-400 text-lg font-light">Registering for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold mt-2 inline-block text-xl">{event.eventName}</span></p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-5 rounded-2xl mb-8 text-sm font-medium flex items-start gap-3">
            <div className="shrink-0 mt-0.5">⚠️</div>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} 
              className="w-full bg-[#030712]/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner" placeholder="e.g. Jane Doe" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} 
              className="w-full bg-[#030712]/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner" placeholder="jane@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">College Name</label>
            <input required type="text" name="college" value={formData.college} onChange={handleChange} 
              className="w-full bg-[#030712]/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner" placeholder="e.g. University of Technology" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Year of Study</label>
              <input required type="number" min="1" max="5" name="year" value={formData.year} onChange={handleChange} 
                className="w-full bg-[#030712]/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner" placeholder="e.g. 2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
              <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} 
                className="w-full bg-[#030712]/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{ padding: '1.125rem 1.5rem' }}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Processing...
                </span>
              ) : (
                <>
                  <CheckCircle2 size={20} /> Complete Registration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
