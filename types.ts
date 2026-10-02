import React from 'react';

export interface User {
  name: string;
  headline: string; // e.g., "Owner", "Tenant", "Agency"
  avatarUrl?: string;
  bgUrl?: string;
  badge?: 'Verified' | 'Pro' | 'Agent';
}

export type ListingType = 'RENTAL' | 'SALE' | 'INVESTMENT' | 'SERVICE' | 'NEWS';

export interface PostData {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number; // Used as "Shares"
  imageUrl?: string;
  listingType: ListingType;
  price?: string;
  location?: string;
  specs?: string; // e.g. "3 Beds • 2 Baths"
  
  // Details for Modal
  description?: string;
  amenities?: string[];
  images?: string[]; // Gallery
  
  // Investment specific
  fundingProgress?: number; // 0 to 100
  targetAmount?: string;
  investorsCount?: number;
  minInvestment?: string;
  projectedYield?: string;
  roi?: string;

  // AI Matching
  isAiRecommended?: boolean;
  matchScore?: number; // e.g. 95
  matchReason?: string; // e.g. "Fits your commute & budget"
}

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}