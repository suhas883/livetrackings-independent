/**
 * Client-side carrier detection as fallback
 * This detects carrier from tracking number format
 */
export function detectCarrier(trackingNumber: string): string {
  const cleaned = trackingNumber.replace(/\s/g, '');

  // UPS: 1Z followed by 16 characters
  if (/^1Z[0-9A-Z]{16}$/i.test(cleaned)) {
    return 'ups';
  }

  // FedEx patterns
  if (
    /^\d{12}$/.test(cleaned) || // 12 digits
    /^\d{15}$/.test(cleaned) || // 15 digits
    /^\d{20}$/.test(cleaned) || // 20 digits
    /^\d{22}$/.test(cleaned)    // 22 digits
  ) {
    return 'fedex';
  }

  // USPS patterns
  if (
    /^\d{20}$/.test(cleaned) || // 20 digits
    /^\d{22}$/.test(cleaned) || // 22 digits
    /^94\d{20}$/.test(cleaned) || // 94 + 20 digits
    /^92\d{20}$/.test(cleaned) || // 92 + 20 digits
    /^93\d{20}$/.test(cleaned) || // 93 + 20 digits
    /^(94|92|93|82)\d{20}$/.test(cleaned) || // Priority/Express
    /^[A-Z]{2}\d{9}US$/.test(cleaned) // International
  ) {
    return 'usps';
  }

  // DHL patterns
  if (
    /^\d{10}$/.test(cleaned) || // 10 digits
    /^\d{11}$/.test(cleaned) || // 11 digits
    /^[A-Z]{3}\d{7}$/.test(cleaned) // 3 letters + 7 digits
  ) {
    return 'dhl';
  }

  // ONTRAC patterns
  if (/^C\d{14}$/.test(cleaned)) {
    return 'ontrac';
  }

  // LaserShip patterns
  if (/^L[A-Z]\d{8}$/.test(cleaned)) {
    return 'lasership';
  }

  // Amazon Logistics
  if (/^TBA\d{12}$/.test(cleaned)) {
    return 'amazon';
  }

  // Default fallback
  return 'unknown';
}

/**
 * Get display name for carrier
 */
export function getCarrierDisplayName(carrier: string): string {
  const carriers: Record<string, string> = {
    ups: 'UPS',
    usps: 'USPS',
    fedex: 'FedEx',
    dhl: 'DHL',
    ontrac: 'OnTrac',
    lasership: 'LaserShip',
    amazon: 'Amazon Logistics',
    unknown: 'Unknown Carrier'
  };

  return carriers[carrier.toLowerCase()] || carrier.toUpperCase();
}

/**
 * Validate if tracking number matches selected carrier
 */
export function validateTrackingNumber(trackingNumber: string, selectedCarrier: string): { valid: boolean; message?: string } {
  if (selectedCarrier === 'auto') {
    const detected = detectCarrier(trackingNumber);
    if (detected === 'unknown') {
      return { valid: false, message: 'Unable to detect carrier from tracking number. Please select a carrier manually.' };
    }
    return { valid: true };
  }

  const detected = detectCarrier(trackingNumber);

  // If we can detect a carrier and it doesn't match what they selected
  if (detected !== 'unknown' && detected !== selectedCarrier.toLowerCase()) {
    return {
      valid: false,
      message: `This appears to be a ${getCarrierDisplayName(detected)} tracking number, not ${getCarrierDisplayName(selectedCarrier)}. Please enter a proper tracking number for ${getCarrierDisplayName(selectedCarrier)} or use auto-detect.`
    };
  }

  return { valid: true };
}
