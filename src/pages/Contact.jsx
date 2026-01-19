import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been sent to our production team!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: <FiMapPin />, title: 'Command Center', detail: '123 Garment Street, Fashion District, Dhaka 1212' },
    { icon: <FiPhone />, title: 'Direct Uplink', detail: '+880 1234-567890' },
    { icon: <FiMail />, title: 'Encrypted Mail', detail: 'production@garmenthouse.com' },
    { icon: <FiClock />, title: 'Operational Sync', detail: 'Mon - Fri: 9AM - 6PM, Sat: 10AM - 2PM' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] py-20 border-b border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Initiate <span className="gradient-text">Contact</span></h1>
            <p className="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Have questions about our production protocols? Our strategic response team is standing by for your inquiry.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-sm font-black text-[var(--primary)] uppercase tracking-[0.3em] mb-10">Network Coordinates</h2>
              <div className="grid gap-8">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-16 h-16 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[20px] flex items-center justify-center text-[var(--primary)] text-xl group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500 shadow-xl shadow-black/5 group-hover:-translate-y-1">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-[var(--text-main)] text-[10px] uppercase tracking-widest mb-1.5 opacity-60">{info.title}</h3>
                      <p className="text-[var(--text-secondary)] font-bold text-lg">{info.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social or Extra Info */}
            <div className="p-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-[40px] text-white overflow-hidden relative group shadow-2xl shadow-[var(--primary)]/20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
              <h3 className="text-2xl font-black mb-4 relative z-10 tracking-tight">Global Grid Operations</h3>
              <p className="opacity-90 leading-relaxed font-medium relative z-10 text-lg">
                We maintain active nodes across multiple continents, ensuring sub-millisecond responsiveness in our manufacturing supply chain.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 md:p-14 border border-[var(--border)] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FiSend size={120} className="-rotate-12" />
              </div>

              <h2 className="text-3xl font-black text-[var(--text-main)] mb-10 tracking-tight">Transmission Hub</h2>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Entity Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="modern-input"
                      placeholder="e.g. Sterling Cooper"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Communication Channel</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="modern-input"
                      placeholder="e.g. office@sterling.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Inquiry Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="modern-input"
                    placeholder="Brief objective summary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Payload Detail</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="modern-input !h-48 resize-none"
                    placeholder="Describe your manufacturing requirements..."
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-gradient w-full py-5 text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-[var(--primary)]/20"
                >
                  <FiSend /> Broadcast Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
