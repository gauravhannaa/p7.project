import { useState } from 'react';
import { submitContact } from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      await submitContact(formData);
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-hacker-green mb-8 text-center glow-text">
          &lt; Contact /&gt;
        </h2>
        <div className="bg-card-bg/50 backdrop-blur-sm border border-hacker-green/20 rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-hacker-green mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-hacker-green/30 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-hacker-green transition"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-hacker-green mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-hacker-green/30 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-hacker-green transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-hacker-green mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-black/50 border border-hacker-green/30 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-hacker-green transition resize-none"
                placeholder="Enter your message"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-hacker-green text-black font-bold py-3 rounded-lg hover:bg-transparent hover:border hover:border-hacker-green hover:text-hacker-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status.message && (
              <div className={`p-3 rounded ${status.type === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'} border ${status.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;