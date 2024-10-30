import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLandingForm, setShowLandingForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    const errors = {};
    
    // Validate each field
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.company.trim()) {
      errors.company = 'Company is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Update error state
    setFormErrors(errors);
    
    // If no errors, proceed
    if (Object.keys(errors).length === 0) {
      setShowLandingForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Landing Form Modal */}
      {showLandingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Welcome to my Portfolio</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={formErrors.name ? 'border-red-500' : ''}
                />
                {formErrors.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {formErrors.name}
                  </div>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className={formErrors.company ? 'border-red-500' : ''}
                />
                {formErrors.company && (
                  <div className="text-red-500 text-sm mt-1">
                    {formErrors.company}
                  </div>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={formErrors.email ? 'border-red-500' : ''}
                />
                {formErrors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Enter Portfolio
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Rest of the component remains the same... */}
      {/* Header, Hero Section, Timeline, and Footer sections remain unchanged */}
    </div>
  );
};

export default Portfolio;
