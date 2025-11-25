import { Package, MapPin, Clock, Mail, MessageSquare, RefreshCw } from 'lucide-react';
import { getCarrierDisplayName } from '../lib/carrierDetection';

interface TrackingResultsProps {
  trackingData: any;
  trackingNumber: string;
  carrier: string;
  isLoading: boolean;
  onEmailClick: () => void;
  onSmsClick: () => void;
}

export default function TrackingResults({
  trackingData,
  trackingNumber,
  carrier,
  isLoading,
  onEmailClick,
  onSmsClick
}: TrackingResultsProps) {
  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <RefreshCw className="h-12 w-12 mx-auto text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-600">Fetching tracking information...</p>
      </div>
    );
  }

  if (!trackingData) {
    return null;
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tracking Results</h2>
              <p className="text-gray-600">
                {trackingNumber} via {getCarrierDisplayName(carrier)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onEmailClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
              >
                <Mail className="h-4 w-4" />
                Email Updates
              </button>
              <button
                onClick={onSmsClick}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
              >
                <MessageSquare className="h-4 w-4" />
                SMS Alerts
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Current Status</p>
                <p className="text-xl font-bold text-gray-900">{trackingData.status}</p>
              </div>
            </div>
            {trackingData.estimatedDelivery && (
              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Estimated: {trackingData.estimatedDelivery}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Tracking History</h3>
            {trackingData.events?.map((event: any, index: number) => (
              <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">{event.status}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
