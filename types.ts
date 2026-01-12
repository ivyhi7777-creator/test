export enum CarrierType {
  SKT = 'SKT',
  KT = 'KT',
  LGU = 'LGU+',
}

export interface Plan {
  id: string;
  provider: string; // e.g., 'tplus', 'mobing'
  carrier: CarrierType;
  name: string;
  data: string;
  voice: string;
  message: string;
  price: number;
  originalPrice: number;
  promoMonths?: number;
  tags: string[];
}

export interface Phone {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  features: string[];
  colors: string[];
  badge?: string;
}

export type ViewState = 'home' | 'plans' | 'phones' | 'advisor';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  recommendedPlanIds?: string[];
}