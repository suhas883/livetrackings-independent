import { X } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingNumber: string;
  carrier: string;
}

export default function EmailModal({ isOpen, onClose, trackingNumber, carrier }: EmailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Email Notifications</h2>
          <button onClick={onClose}><X className="h-6 w-6" /></button>
        </div>
        <p className="text-gray-600 mb-4">Get email updates for {trackingNumber}</p>
        <input type="email" placeholder="Enter your email" className="w-full p-3 border rounded-lg mb-4" />
        <button onClick={onClose} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
          Subscribe
        </button>
      </div>
    </div>
  );
}
