/**
 * Application configuration and constants
 */

// Wedding details
export const WEDDING_CONFIG = {
  // Couple information
  COUPLE: {
    BRIDE_NAME: 'Duyen',
    GROOM_NAME: 'Cong',
    FULL_NAMES: 'Cong & Duyen',
  },

  // Event details
  EVENT: {
    DATE: new Date('2025-05-15T17:00:00+07:00'),
    CEREMONY_TIME: '17:00',
    RECEPTION_TIME: '18:00',
    VENUE_NAME: 'Trung Tâm Tiệc Cưới Nguyên Đình',
    VENUE_ADDRESS: '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
    VENUE_MAP_URL: 'https://maps.google.com/?q=10.7553,106.7539',
  },

  // Contact information
  CONTACT: {
    BRIDE: {
      PHONE: '+84 123 456 789',
      EMAIL: 'duyen@example.com',
    },
    GROOM: {
      PHONE: '+84 987 654 321',
      EMAIL: 'cong@example.com',
    },
  },

  // Gift information
  GIFT: {
    BRIDE: {
      BANK_NAME: 'Vietcombank',
      ACCOUNT_NAME: 'Nguyen Thi Duyen',
      ACCOUNT_NUMBER: '1234567890',
    },
    GROOM: {
      BANK_NAME: 'Techcombank',
      ACCOUNT_NAME: 'Hoang Dinh Cong',
      ACCOUNT_NUMBER: '0987654321',
    },
  },
};

// API endpoints
export const API_ENDPOINTS = {
  GUESTS: '/api/guests',
  GUEST_BY_ID: (id: string) => `/api/guests/${id}`,
  BULK_DELETE: '/api/guests/bulk-delete',
  BULK_UPDATE: '/api/guests/bulk-update',
  IMPORT: '/api/guests/import',
  RSVP: (uniqueInviteId: string) => `/api/rsvp/${uniqueInviteId}`,
  ANONYMOUS_RSVP: '/api/rsvp/anonymous',
  STATS: '/api/stats',
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/auth/session',
  },
};

// Routes
export const ROUTES = {
  HOME: '/',
  BRIDE: '/bride',
  GROOM: '/groom',
  INVITE: (uniqueGuestId: string) => `/invite/${uniqueGuestId}`,
  ADMIN: {
    LOGIN: '/host/login',
    DASHBOARD: '/host',
    GUESTS: '/host/guests',
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'wedding_auth_token',
  THEME: 'wedding_theme',
};

// Animation durations
export const ANIMATION = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
};

// Default pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

// Default form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Vui lòng nhập thông tin này',
  INVALID_EMAIL: 'Vui lòng nhập địa chỉ email hợp lệ',
  MIN_LENGTH: (min: number) => `Phải có ít nhất ${min} ký tự`,
  MAX_LENGTH: (max: number) => `Không được vượt quá ${max} ký tự`,
};
