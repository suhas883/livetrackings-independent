import { Package } from 'lucide-react';

export default function Carriers() {
  const carriers = [
    'FedEx', 'UPS', 'USPS', 'DHL', 'Amazon', 'OnTrac',
    'LaserShip', 'Canada Post', 'Royal Mail', 'Australia Post',
    'China Post', 'Japan Post'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            800+ Supported Shipping Carriers Worldwide
          </h2>
          <p className="text-gray-600">
            Track packages from FedEx, UPS, USPS, DHL, Amazon, and all major international shipping carriers in real-time
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {carriers.map((carrier, index) => (
            <div key={index} className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Package className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-700">{carrier}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm">
          ...and <strong>800+ more carriers</strong> worldwide
        </p>
      </div>
    </section>
  );
}
