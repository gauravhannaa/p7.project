import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import { Mail, Linkedin, Instagram, Github, Facebook } from "lucide-react";
import { submitContact, fetchProfile } from "../api";
import { profile as staticProfile } from "../data/portfolioData";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [profileData, setProfileData] = useState(staticProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchProfile();
        if (res.data && Object.keys(res.data).length > 0) {
          setProfileData(res.data);
        }
      } catch (error) {
        console.error("Error loading profile, using static fallback", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await submitContact(form);
      toast.success("🔐 Message transmitted securely!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("❌ Transmission failed! Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-green-400 text-xl animate-pulse">Loading contact info...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Secure Communication Console" />

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT: FORM */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-neon mb-4">
            📡 Encrypted Channel
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your identity..."
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 text-green-400"
              required
            />
            <input
              type="email"
              placeholder="Secure email address..."
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 text-green-400"
              required
            />
            <textarea
              rows="4"
              placeholder="Transmit your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-black/50 border border-neon/30 rounded px-3 py-2 text-green-400"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-2 bg-neon/20 border border-neon rounded hover:bg-neon/30 transition text-green-400"
            >
              {sending ? "Encrypting & Sending..." : "Send Secure Message"}
            </button>
          </form>
        </div>

        {/* RIGHT: SOCIAL + CONTACT */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-neon mb-4">
            🔗 External Secure Links
          </h2>

          <div className="space-y-3">
            <a
              href={`mailto:${profileData.email || staticProfile.email}`}
              className="flex items-center gap-3 text-green-400 hover:text-neon"
            >
              <Mail size={18} /> {profileData.email || staticProfile.email}
            </a>
            <a
              href={profileData.github || staticProfile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-green-400 hover:text-neon"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href={profileData.linkedin || staticProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-green-400 hover:text-neon"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href={profileData.instagram || staticProfile.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-green-400 hover:text-neon"
            >
              <Instagram size={18} /> Instagram
            </a>
            <a
              href="https://www.facebook.com/Gauravhanna"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-green-400 hover:text-neon"
            >
              <Facebook size={18} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;