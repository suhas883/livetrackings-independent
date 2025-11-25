import { Search, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  onTrack: (trackingNumber: string, carrier: string) => void;
}

export default function Hero({ onTrack }: HeroProps) {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim(), 'auto');
    }
  };

  return (
    <section id="track" className="bg-gradient-to-br from-blue-50 via-white to-sky-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Trusted by 100K+ users</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Courier Tracking
            <span className="block text-blue-800 mt-2">Accurate Delivery Predictions for 800+ Carriers</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Track packages with intelligent predictions | Real-time updates from global couriers | Never miss a delivery
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="w-full px-4 py-3 text-base md:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5" />
                Track Now
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-white/50 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Tracking Number Examples:</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded">FedEx: 123456789012</span>
              <span className="bg-gray-100 px-2 py-1 rounded">UPS: 1Z999AA10123456784</span>
              <span className="bg-gray-100 px-2 py-1 rounded">USPS: 9400111899223456789</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">✓ 100% Free Forever</span>
            <span className="flex items-center gap-1">✓ AI Predictions</span>
            <span className="flex items-center gap-1">✓ Instant Alerts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
