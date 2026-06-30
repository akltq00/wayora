// Configuration files for Wayora platform

export const CONFIG = {
  appName: 'Wayora',
  version: '0.0.0',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  debug: process.env.DEBUG === 'true',
};

export const API_ROUTES = {
  journeys: '/api/journeys',
  dna: '/api/dna',
  memory: '/api/memory',
};