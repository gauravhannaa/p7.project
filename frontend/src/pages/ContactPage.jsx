import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import { Mail, Linkedin, Instagram } from "lucide-react";  // Removed Github
import { profile } from "../data/portfolioData";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message transmitted securely!");
      setSending(false);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };
  
  return (
    <Layout>
      <PageHeader title="Secure Communication Console" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-neon mb-4">📡 Encrypted Channel</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 text-white"
              required
            />
            <textarea
              rows="4"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 text-white"
              required
            ></textarea>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30 transition"
            >
              {sending ? "Sending..." : "Send Secure Message"}
            </button>
          </form>
        </div>
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-neon mb-4">🔗 External Links</h2>
          <div className="space-y-3">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-gray-300 hover:text-neon">
              <Mail size={18} /> {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-neon">
              {/* Text fallback for GitHub */}
              <span className="text-neon">[git]</span> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-neon">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-neon">
              <Instagram size={18} /> Instagram
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;