import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope
} from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl flex items-center justify-center shadow-lg">
                <FiPackage className="text-white text-xl" />
              </div>
              <span className="text-2xl font-black text-[var(--text-main)] tracking-tighter">
                Garment<span className="text-[var(--primary)]">House</span>
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed max-w-xs">
              State-of-the-art garment production tracking system for modern fashion brands. Quality, Speed, and Transparency in every fiber.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com/garmenthouse" },
                { icon: <FaTwitter />, link: "https://twitter.com/garmenthouse" },
                { icon: <FaLinkedinIn />, link: "https://linkedin.com/company/garmenthouse" },
                { icon: <FaInstagram />, link: "https://instagram.com/garmenthouse" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] hover:-translate-y-1 transition-all shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black text-[var(--text-main)] mb-6 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors">Collection</Link></li>
              <li><Link to="/about" className="text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-black text-[var(--text-main)] mb-6 uppercase tracking-widest">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors">Production FAQ</Link></li>
              <li><Link to="/privacy" className="text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[var(--text-secondary)] font-bold hover:text-[var(--primary)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black text-[var(--text-main)] mb-6 uppercase tracking-widest">Contact Info</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="text-[var(--primary)] mt-1"><FaMapMarkerAlt /></div>
                <span className="text-[var(--text-secondary)] font-bold text-sm">123 Garment Ave, Fashion District, Dhaka 1212</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-[var(--primary)]"><FaPhoneAlt /></div>
                <span className="text-[var(--text-secondary)] font-bold text-sm">+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-[var(--primary)]"><FaEnvelope /></div>
                <span className="text-[var(--text-secondary)] font-bold text-sm">production@garmenthouse.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Garment House. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[var(--text-muted)] text-xs font-black uppercase tracking-widest">
            <a href="#" className="hover:text-[var(--primary)]">Cookie Policy</a>
            <a href="#" className="hover:text-[var(--primary)]">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
