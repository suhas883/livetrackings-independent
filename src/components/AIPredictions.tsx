interface AIPredictionsProps {
  trackingData: any;
  carrier: string;
  isLoading: boolean;
}

export default function AIPredictions({ trackingData, carrier, isLoading }: AIPredictionsProps) {
  if (isLoading || !trackingData) return null;
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">AI Delivery Predictions</h2>
        <p className="text-gray-600">Based on your package journey, we predict delivery within the estimated timeframe.</p>
      </div>
    </section>
  );
}
