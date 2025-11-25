// Affiliate links configuration
// For independent deployment, using direct URLs

const REDIRECT_BASE_URL = import.meta.env.VITE_REDIRECT_API_URL || '';

export const affiliateLinks = {
  yendo: REDIRECT_BASE_URL ? `${REDIRECT_BASE_URL}/redirect/yendo` : 'https://yendo.com',
  credit: REDIRECT_BASE_URL ? `${REDIRECT_BASE_URL}/redirect/credit` : '#',
  sweepstakes: REDIRECT_BASE_URL ? `${REDIRECT_BASE_URL}/redirect/sweepstakes` : '#',
  offer: REDIRECT_BASE_URL ? `${REDIRECT_BASE_URL}/redirect/offer` : '#',
};

export const getAffiliateUrl = (type: keyof typeof affiliateLinks): string => {
  return affiliateLinks[type];
};

export const trackClick = async (linkType: string) => {
  try {
    if (REDIRECT_BASE_URL) {
      await fetch(`${REDIRECT_BASE_URL}/redirect/${linkType}`);
    }
  } catch (error) {
    console.error('Failed to track click:', error);
  }
};
