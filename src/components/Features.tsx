import { RefreshCw, Brain, Bell } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: RefreshCw,
      title: 'Real-Time Updates',
      description: 'Track packages from 800+ carriers worldwide with instant status updates',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'AI Predictions',
      description: 'Smart delivery estimates powered by machine learning and historical data',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Bell,
      title: 'Email & SMS Alerts',
      description: 'Never miss an update with customizable notifications for every milestone',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose LiveTrackings for Package Tracking?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Advanced real-time package tracking with AI predictions for accurate delivery estimates across 800+ global carriers
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
