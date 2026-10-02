import React from 'react';

export type UserRole = 'PARTICULAR' | 'AGENCY' | 'CLIENT';

export interface User {
  id?: string;
  name: string;
  role?: UserRole;
  headline: string; // e.g., "Propriétaire Particulier", "Agence Immobilière Agréée"
  avatarUrl?: string;
  bgUrl?: string;
  badge?: 'Verified' | 'Pro' | 'Agent' | 'Particulier';
  phone?: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  address?: string;
  // Agency specific
  agencyName?: string;
  licenseNumber?: string;
  rating?: number;
  dealsCompleted?: number;
  description?: string;
}

export type ListingType = 'RENTAL' | 'SALE' | 'INVESTMENT' | 'SERVICE' | 'NEWS';

export type PropertyCategory = 'APPARTEMENT' | 'VILLA' | 'DUPLEX' | 'MAISON' | 'STUDIO' | 'TERRAIN' | 'IMMEUBLE' | 'BUREAU';

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes?: number;
}

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
  priceAmount?: number;
  currency?: string;
  location?: string;
  city?: string;
  district?: string;
  address?: string;
  specs?: string; // e.g. "3 Chambres • 2 Douches • 160 m²"
  propertyCategory?: PropertyCategory;
  surfaceArea?: number; // in m²
  bedrooms?: number;
  bathrooms?: number;
  legalTitle?: 'Titre Foncier' | 'ACD' | 'Convention de vente' | 'Permis d\'habiter';
  availability?: string; // e.g. "Immédiate", "Sous 15 jours"
  
  // Details for Modal & Comments
  description?: string;
  amenities?: string[];
  images?: string[]; // Multi-photo Gallery
  commentsList?: PostComment[];

  
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

export type SearchUrgency = 'IMMEDIATE' | 'UNDER_1_MONTH' | 'FLEXIBLE';

export interface PropertySearch {
  id: string;
  client: User;
  transactionType: 'RENTAL' | 'SALE';
  propertyCategory: PropertyCategory;
  title: string;
  city: string;
  preferredDistricts: string[];
  budgetMin: number;
  budgetMax: number;
  currency: string;
  minBedrooms?: number;
  minBathrooms?: number;
  minSurface?: number; // m²
  desiredAmenities: string[];
  urgency: SearchUrgency;
  description: string;
  createdAt: string;
  matchingCount?: number;
}

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}