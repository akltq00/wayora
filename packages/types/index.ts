// Shared types for the Wayora platform

export interface Journey {
  id: string;
  userId: string;
  name: string;
  status: 'draft' | 'planning' | 'validated' | 'scheduled' | 'active' | 'paused' | 'completed' | 'reviewed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface Trait {
  id: string;
  journeyId: string;
  name: string;
  value: number;
  confidence: number;
  lastUpdated: Date;
}

export interface DNA {
  id: string;
  userId: string;
  traits: Trait[];
  createdAt: Date;
  updatedAt: Date;
}