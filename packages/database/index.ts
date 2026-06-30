// Database utilities and configurations for Wayora

export const DATABASE_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'wayora',
  user: process.env.DB_USER || 'wayora',
  password: process.env.DB_PASSWORD || 'wayora',
};

export const REDIS_CONFIG = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};