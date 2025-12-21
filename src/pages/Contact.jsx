import { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl">📍</div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>123 Garment Street, Fashion District, City 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">📞</div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">✉️</div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>info@garmenttracker.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl">🕐</div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input bg-white border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-3 w-full transition"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input bg-white border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-3 w-full transition"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium">Subject</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="input bg-white border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-3 w-full transition"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label pb-2">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="textarea bg-white border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-3 w-full transition resize-none"
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="px-6 py-2.5 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition font-medium text-base w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
