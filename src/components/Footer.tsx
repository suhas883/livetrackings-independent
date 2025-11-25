import { Mail, Package } from 'lucide-react';
import { useState } from 'react';
import { getAffiliateUrl } from '../lib/affiliate';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      window.location.href = getAffiliateUrl('offer');
    }, 1500);
  };

  const quickLinks = [
    { label: 'Track Package', href: '#track' },
    { label: 'Features', href: '#features' },
    { label: 'Blog', href: '/blogs.html' },
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  const popularCarriers = [
    { label: 'FedEx Tracking', href: '#' },
    { label: 'UPS Tracking', href: '#' },
    { label: 'USPS Tracking', href: '#' },
    { label: 'DHL Tracking', href: '#' },
    { label: 'Amazon Tracking', href: '#' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">LiveTrackings</span>
            </div>
            <p className="text-gray-400 text-sm">
              Track any package, anywhere, instantly. The most advanced tracking platform with 800+ carriers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}><a href={link.href} className="text-gray-400 hover:text-white text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Popular Carriers</h3>
            <ul className="space-y-2">
              {popularCarriers.map((link, index) => (
                <li key={index}><a href={link.href} className="text-gray-400 hover:text-white text-sm">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            {subscribed ? (
              <p className="text-green-400 text-sm">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit}>
                <p className="text-gray-400 text-sm mb-3">Get tracking tips and updates</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                    required
                  />
                  <button type="submit" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700">
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} LiveTrackings. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {legalLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-400 hover:text-white text-sm">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
