export interface TrackingSearch {
  id: string;
  tracking_number: string;
  carrier: string | null;
  search_count: number;
  last_searched: string;
  created_at: string;
}

export interface EmailSubscription {
  id: string;
  email: string;
  tracking_number: string;
  carrier: string | null;
  notify_out_for_delivery: boolean;
  created_at: string;
}

const TRACKING_SEARCHES_KEY = 'tracking_searches';
const EMAIL_SUBSCRIPTIONS_KEY = 'email_subscriptions';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const storage = {
  trackingSearches: {
    async getAll(): Promise<TrackingSearch[]> {
      try {
        const data = localStorage.getItem(TRACKING_SEARCHES_KEY);
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    },

    async getByTrackingNumber(trackingNumber: string): Promise<TrackingSearch | null> {
      const searches = await this.getAll();
      return searches.find(s => s.tracking_number === trackingNumber) || null;
    },

    async save(search: Omit<TrackingSearch, 'id' | 'created_at'>): Promise<void> {
      const searches = await this.getAll();
      const existing = searches.find(s => s.tracking_number === search.tracking_number);

      if (existing) {
        existing.search_count = search.search_count;
        existing.last_searched = search.last_searched;
        existing.carrier = search.carrier;
      } else {
        searches.push({
          ...search,
          id: generateId(),
          created_at: new Date().toISOString(),
        });
      }

      localStorage.setItem(TRACKING_SEARCHES_KEY, JSON.stringify(searches));
    },
  },

  emailSubscriptions: {
    async getAll(): Promise<EmailSubscription[]> {
      try {
        const data = localStorage.getItem(EMAIL_SUBSCRIPTIONS_KEY);
        return data ? JSON.parse(data) : [];
      } catch {
        return [];
      }
    },

    async save(subscription: Omit<EmailSubscription, 'id' | 'created_at'>): Promise<void> {
      const subscriptions = await this.getAll();
      subscriptions.push({
        ...subscription,
        id: generateId(),
        created_at: new Date().toISOString(),
      });
      localStorage.setItem(EMAIL_SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
    },

    async getByEmail(email: string): Promise<EmailSubscription[]> {
      const subscriptions = await this.getAll();
      return subscriptions.filter(s => s.email === email);
    },
  },
};
