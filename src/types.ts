export interface Subscription {
  plan: "Basic" | "Premium" | "Elite" | "Custom" | "None";
  activatedAt: string | null;
  expiresAt: string | null;
  durationDays: number;
}

export interface SubscriptionRequest {
  plan: "Basic" | "Premium" | "Elite" | "Custom";
  paymentRef: string;
  notes?: string;
  submittedAt: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  password?: string; // Hidden on client outputs if needed, but preserved in mock DB
  status: "pending" | "approved" | "rejected";
  subscription: Subscription;
  favorites: string[]; // Video IDs
  createdAt: string;
  subscriptionRequest?: SubscriptionRequest;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  categoryId: string; // References Category.id
  url: string; // YouTube, Vimeo, or direct MP4 URL
  duration: number; // in minutes
  views: number;
  thumbnail?: string;
  trainer: string;
  createdAt: string;
}

export interface AppStats {
  activeMembers: number;
  totalViews: number;
}
