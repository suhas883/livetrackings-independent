import { CreditCard, TrendingUp, Shield, Zap, Clock, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAffiliateUrl } from '../lib/affiliate';

export default function YendoOffer() {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const benefits = [
    { icon: TrendingUp, text: '5% cashback on all purchases' },
    { icon: CreditCard, text: '$200 sign-up bonus TODAY' },
    { icon: Shield, text: 'No annual fee EVER' },
    { icon: Zap, text: 'Instant approval (2 min)' }
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 right-0 bg-yellow-400 text-black font-bold px-4 py-2 rounded-bl-lg flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Limited Time: {formatTime(timeLeft)}</span>
            </div>
            <div className="p-8 pt-12">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-300" />
                <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wide">
                  LAST CHANCE - $200 BONUS ENDS SOON
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Get $200 FREE + 5% Cashback
              </h3>
              <p className="text-purple-200 mb-6">
                Instant approval in 2 minutes | Join 50,000+ smart shoppers saving daily
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 text-white">
                      <Icon className="w-5 h-5 text-green-300" />
                      <span className="text-sm">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
              <a
                href={getAffiliateUrl('yendo')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                CLAIM $200 NOW - Limited Spots
              </a>
              <p className="text-purple-200 text-xs mt-4 text-center">
                Only 47 spots left today | No credit check required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
