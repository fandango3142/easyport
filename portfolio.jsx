import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: ''
  });

  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const menuItems = [
    { title: 'Home', href: '#' },
    { title: 'Work Experience', href: '#experience' },
    { title: 'Education', href: '#education' },
    { title: 'More About Me', href: '#about' },
    { title: 'Resume', href: '#resume' }
  ];

  const experiences = [
    {
      year: '2023',
      title: 'Senior Developer',
      company: 'Tech Corp',
      description: 'Led development of core products'
    },
    {
      year: '2021',
      title: 'Software Engineer',
      company: 'StartUp Inc',
      description: 'Full-stack development'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference bg-white transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${cursorPosition.x - 16}px, ${cursorPosition.y - 16}px) scale(${cursorHover ? 1.5 : 1})`,
        }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-40">
        <div className="flex items-center justify-between px-4 h-16">
          <button 
            onClick={toggleMenu} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-out"
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold animate-fade-in">John Doe</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Sidebar Menu */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        bg-white/90 backdrop-blur-md w-64 transition-transform duration-500 ease-out z-40`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold">Menu</h2>
          <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          {menuItems.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-out"
              style={{ 
                transitionDelay: `${index * 50}ms`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Banner with Parallax */}
        <section 
          className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden"
          style={{ height: '80vh' }}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: 'url("/api/placeholder/1920/1080")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div 
            className="relative h-full flex items-center px-6"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold mb-4 opacity-0 animate-slide-up">
                Welcome to My Portfolio
              </h1>
              <p className="text-xl opacity-0 animate-slide-up" style={{ animationDelay: '200ms' }}>
                Frontend Developer & UI/UX Enthusiast
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-4xl mx-auto py-12 px-6">
          <h2 className="text-2xl font-bold mb-8">Experience Timeline</h2>
          <div className="relative">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="mb-8 flex opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  {index !== experiences.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200 mt-3" />
                  )}
                </div>
                <div 
                  className="bg-white rounded-lg shadow-md p-6 flex-1 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <div className="text-sm text-blue-500 font-semibold">{exp.year}</div>
                  <h3 className="text-lg font-bold mt-1">{exp.title}</h3>
                  <div className="text-gray-600">{exp.company}</div>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Contact Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md animate-dialog-enter">
          <DialogHeader>
            <DialogTitle>Welcome! Please introduce yourself</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <Input
                required
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Input
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Input
                type="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full animate-slide-up transition-all duration-300 hover:scale-105"
              style={{ animationDelay: '400ms' }}
            >
              Continue to Portfolio
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dialog-enter {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-dialog-enter {
          animation: dialog-enter 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
