import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrackingResults from './components/TrackingResults';
import AIPredictions from './components/AIPredictions';
import EmailModal from './components/EmailModal';
import SmsModal from './components/SmsModal';
import YendoOffer from './components/YendoOffer';
import SweepstakesBanner from './components/SweepstakesBanner';
import AIChat from './components/AIChat';
import Features from './components/Features';
import Carriers from './components/Carriers';
import Footer from './components/Footer';
import InstallPrompt from './components/InstallPrompt';
import InstallButton from './components/InstallButton';
import { storage } from './lib/storage';
import { detectCarrier, validateTrackingNumber } from './lib/carrierDetection';

interface TrackingData {
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: string;
  events: Array<{
    status: string;
    location: string;
    timestamp: string;
    description: string;
  }>;
  lastUpdated: string;
}

function App() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const apiUrl = import.meta.env.VITE_TRACKING_API_URL;
      console.log('App initialized. API URL:', apiUrl ? 'Configured' : 'Missing');
      if (!apiUrl) {
        setAppError('Configuration error. Please refresh the page.');
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const trackingParam = params.get('tracking');
      if (trackingParam) {
        handleTrack(trackingParam, 'auto');
      }
    } catch (error) {
      console.error('App initialization error:', error);
      setAppError('Failed to initialize app. Please refresh.');
    }
  }, []);

  const handleTrack = async (number: string, selectedCarrier: string) => {
    setTrackingNumber(number);
    setCarrier(selectedCarrier === 'auto' ? 'auto' : selectedCarrier);
    setShowResults(true);
    setIsLoadingTracking(true);
    setTrackingError(null);
    setTrackingData(null);

    const validation = validateTrackingNumber(number, selectedCarrier);
    if (!validation.valid) {
      setTrackingError(validation.message || 'Invalid tracking number');
      setIsLoadingTracking(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_TRACKING_API_URL;
      if (!apiUrl) {
        throw new Error('API URL not configured');
      }

      console.log('Tracking request:', { trackingNumber: number, carrier: selectedCarrier, apiUrl });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          trackingNumber: number,
          carrier: selectedCarrier === 'auto' ? null : selectedCarrier
        })
      });

      const data = await response.json();
      console.log('API Response:', { status: response.status, carrier: data.carrier, trackingNumber: data.trackingNumber, data });

      if (response.ok) {
        const formatStatus = (status: string) => {
          return status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        };

        const transformedData = {
          ...data,
          status: formatStatus(data.status || 'processing'),
          events: data.events?.map((event: any) => ({
            ...event,
            status: formatStatus(event.status || 'processing'),
            location: typeof event.location === 'object'
              ? `${event.location.city}, ${event.location.state} ${event.location.zip}`
              : event.location
          })) || []
        };

        let actualCarrier = data.carrier ? data.carrier.toLowerCase() : null;
        const detectedCarrier = detectCarrier(number);
        console.log('Carrier detection:', { fromAPI: actualCarrier, clientDetected: detectedCarrier, willUse: detectedCarrier !== 'unknown' ? detectedCarrier : actualCarrier });

        if (detectedCarrier !== 'unknown') {
          actualCarrier = detectedCarrier;
        }

        if (actualCarrier) {
          setCarrier(actualCarrier);
          transformedData.carrier = actualCarrier;
        }

        setTrackingData(transformedData);
        setTrackingError(null);
      } else if (response.status === 404) {
        setTrackingError('Tracking number not found. Please verify and try again.');
        setTrackingData(null);
      } else if (response.status === 400) {
        setTrackingError('Invalid tracking number format. Please enter a proper tracking number for the selected carrier.');
        setTrackingData(null);
      } else {
        setTrackingError(data.message || 'Unable to fetch tracking information. Please check the tracking number and try again.');
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      setTrackingError('Network error. Please check your connection and try again.');
      setTrackingData(null);
    } finally {
      setIsLoadingTracking(false);
    }

    try {
      const existing = await storage.trackingSearches.getByTrackingNumber(number);
      if (existing) {
        await storage.trackingSearches.save({
          tracking_number: number,
          carrier: selectedCarrier === 'auto' ? null : selectedCarrier,
          search_count: existing.search_count + 1,
          last_searched: new Date().toISOString()
        });
      } else {
        await storage.trackingSearches.save({
          tracking_number: number,
          carrier: selectedCarrier === 'auto' ? null : selectedCarrier,
          search_count: 1,
          last_searched: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error saving tracking search:', error);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const params = new URLSearchParams(window.location.search);
    params.set('tracking', number);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

    if ((window as any).gtag) {
      (window as any).gtag('event', 'track_package', {
        tracking_number: number,
        carrier: selectedCarrier
      });
    }
  };

  if (appError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">App Error</h1>
          <p className="text-gray-600 mb-6">{appError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-all"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <SweepstakesBanner />
      <main className="flex-grow">
        {!showResults && <Hero onTrack={handleTrack} />}
        {showResults && (
          <>
            {trackingError ? (
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Tracking Not Found</h2>
                <p className="text-gray-600 mb-6">{trackingError}</p>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setTrackingError(null);
                  }}
                  className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-all"
                >
                  Try Another Number
                </button>
              </div>
            ) : (
              <>
                <TrackingResults
                  trackingData={trackingData}
                  trackingNumber={trackingNumber}
                  carrier={carrier}
                  isLoading={isLoadingTracking}
                  onEmailClick={() => setEmailModalOpen(true)}
                  onSmsClick={() => setSmsModalOpen(true)}
                />
                <AIPredictions
                  trackingData={trackingData}
                  carrier={carrier}
                  isLoading={isLoadingTracking}
                />
                <YendoOffer />
                <AIChat trackingData={trackingData} />
              </>
            )}
          </>
        )}
        {!showResults && <Features />}
        {!showResults && <Carriers />}
      </main>
      <Footer />
      <InstallPrompt />
      <InstallButton />

      <EmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        trackingNumber={trackingNumber}
        carrier={carrier}
      />
      <SmsModal
        isOpen={smsModalOpen}
        onClose={() => setSmsModalOpen(false)}
        trackingNumber={trackingNumber}
        carrier={carrier}
      />
    </div>
  );
}

export default App;
