import React, { useState } from 'react';
import { toast } from 'sonner';

export default function DemoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cafeName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/demo', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
      });

      if (response.ok) {
        toast.success('SYSTEM_UPDATE: Demo request logged successfully.');
        setFormData({ name: '', email: '', cafeName: '' });
      } else if (response.status === 429) {
        toast.error('ERR_RATE_LIMIT: Awaiting cooldown cycle. Try again later.');
      } else {
        toast.error('ERR_EXCEPTION: Payload rejected. Verify fields and retry.');
      }
    } catch (error) {
      toast.error('ERR_EXCEPTION: Payload rejected. Verify fields and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="demo-form-container p-6 bg-black border border-white/10 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-mono text-white mb-6 uppercase tracking-widest">Request Access</h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Commander Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-white/5 border border-white/10 p-3 rounded text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Comms Link (Email)"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-white/5 border border-white/10 p-3 rounded text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <input
          type="text"
          name="cafeName"
          placeholder="Facility Designation (Cafe Name)"
          value={formData.cafeName}
          onChange={handleChange}
          required
          className="bg-white/5 border border-white/10 p-3 rounded text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all text-xs font-mono text-white tracking-[0.2em] uppercase cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'Transmitting...' : 'Initialize Demo'}
        </button>
      </form>
    </div>
  );
}
