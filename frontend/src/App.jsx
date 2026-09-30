import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Registration from './pages/Registration';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Global subtle background gradients for premium dark mode */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]"></div>
      </div>
      
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register/:eventId" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm z-0 relative">
        <p>&copy; {new Date().getFullYear()} College Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
