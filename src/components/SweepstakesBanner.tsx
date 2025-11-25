import { Gift, Sparkles, ArrowRight } from 'lucide-react';
import { getAffiliateUrl } from '../lib/affiliate';

export default function SweepstakesBanner() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl shadow-xl overflow-hidden">
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <Gift className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white text-sm font-bold uppercase tracking-wide">Special Offer</span>
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Win $5,000 Cash!</h3>
            <p className="text-purple-100">Enter our monthly sweepstakes! No purchase necessary. Drawing every month.</p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={getAffiliateUrl('sweepstakes')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 px-6 rounded-lg text-lg transition-all transform hover:scale-105"
            >
              <span>Enter Free Now</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <p className="text-purple-200 text-xs mt-2 text-center">FREE ENTRY</p>
          </div>
        </div>
      </div>
    </div>
  );
}
