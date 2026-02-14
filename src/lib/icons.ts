export interface IconData {
  name: string
  category: string
  path: string
  viewBox?: string
}

export const icons: IconData[] = [
  // Tech
  { name: 'Lightning', category: 'tech', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { name: 'Code', category: 'tech', path: 'M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z' },
  { name: 'CPU', category: 'tech', path: 'M18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2zM9 9h6v6H9z M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3' },
  { name: 'Globe', category: 'tech', path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z' },
  { name: 'Wifi', category: 'tech', path: 'M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01' },
  { name: 'Cloud', category: 'tech', path: 'M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z' },
  { name: 'Database', category: 'tech', path: 'M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zM2 12c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5' },
  { name: 'Shield', category: 'tech', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },

  // Business
  { name: 'Briefcase', category: 'business', path: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16' },
  { name: 'TrendingUp', category: 'business', path: 'M23 6l-9.5 9.5-5-5L1 18' },
  { name: 'Target', category: 'business', path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6a6 6 0 100 12 6 6 0 000-12zM12 10a2 2 0 100 4 2 2 0 000-4z' },
  { name: 'Award', category: 'business', path: 'M12 15l-4 6 1-7-5-4 7-1 3-6 3 6 7 1-5 4 1 7z' },
  { name: 'Crown', category: 'business', path: 'M2 17l2-11 5 5 3-7 3 7 5-5 2 11z' },
  { name: 'Building', category: 'business', path: 'M3 21h18M5 21V7l8-4 8 4v14M9 21v-4h6v4' },

  // Creative
  { name: 'Palette', category: 'creative', path: 'M12 2a10 10 0 00-8 16c1.5 2 3.5 3 6 3 1.1 0 2-.4 2.5-1 .5-.5.5-1.5.5-2.5 0-.5.2-1 .5-1.3.3-.3.8-.5 1.5-.5h2c2.5 0 5-1 5-5a10 10 0 00-10-9zM6.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' },
  { name: 'Brush', category: 'creative', path: 'M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 00-3-3.02z' },
  { name: 'Pen', category: 'creative', path: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586' },
  { name: 'Camera', category: 'creative', path: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11zM12 17a4 4 0 100-8 4 4 0 000 8z' },
  { name: 'Music', category: 'creative', path: 'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z' },
  { name: 'Film', category: 'creative', path: 'M19.82 2H4.18A2.18 2.18 0 002 4.18v15.64A2.18 2.18 0 004.18 22h15.64A2.18 2.18 0 0022 19.82V4.18A2.18 2.18 0 0019.82 2zM7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5' },

  // Nature
  { name: 'Sun', category: 'nature', path: 'M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' },
  { name: 'Moon', category: 'nature', path: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' },
  { name: 'Star', category: 'nature', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { name: 'Leaf', category: 'nature', path: 'M11 20A7 7 0 019.8 6.4C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10zM2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' },
  { name: 'Flower', category: 'nature', path: 'M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0M12 2a4 4 0 014 4c0 1.95-.72 3-2 4 1.28 1 2 2.05 2 4a4 4 0 01-8 0c0-1.95.72-3 2-4-1.28-1-2-2.05-2-4a4 4 0 014-4z' },
  { name: 'Mountain', category: 'nature', path: 'M8 3l4 8 5-5 5 14H2L8 3z' },
  { name: 'Droplet', category: 'nature', path: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z' },
  { name: 'Wave', category: 'nature', path: 'M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.4 2 5 2c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.4 2 5 2c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' },

  // Food
  { name: 'Coffee', category: 'food', path: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3' },
  { name: 'Pizza', category: 'food', path: 'M12 2L2 19.5h20L12 2zM8 13a1 1 0 100-2 1 1 0 000 2zM14 15a1 1 0 100-2 1 1 0 000 2zM11 9a1 1 0 100-2 1 1 0 000 2z' },
  { name: 'Apple', category: 'food', path: 'M12 2c-2.67 0-4 2.33-4 4s1.33 3 2 3c.67 0 2-1 2-1s1.33 1 2 1c.67 0 2-1 2-3s-1.33-4-4-4zM12 9c-5 0-8 3.58-8 8s2 5 4 5c1 0 2.5-1 4-1s3 1 4 1c2 0 4-2 4-5s-3-8-8-8z' },
  { name: 'Cake', category: 'food', path: 'M2 18h20v4H2zM4 14v4h16v-4c-2-2-4-2-4-4s2-4 2-4c-2 0-4 1-6 1s-4-1-6-1c0 0 2 2 2 4s-2 2-4 4z' },

  // Sports
  { name: 'Trophy', category: 'sports', path: 'M6 9H4a2 2 0 01-2-2V4a2 2 0 012-2h2M18 9h2a2 2 0 002-2V4a2 2 0 00-2-2h-2M4 22h16M12 17v5M8 22h8M18 2H6v7a6 6 0 1012 0V2z' },
  { name: 'Medal', category: 'sports', path: 'M12 17a5 5 0 100-10 5 5 0 000 10zM8.21 13.89L7 23l5-3 5 3-1.21-9.12' },
  { name: 'Dumbbell', category: 'sports', path: 'M6.5 6.5h11M17.5 17.5h-11M6.5 6.5v11M17.5 6.5v11M4 4v4M4 16v4M20 4v4M20 16v4M2 6h4M2 18h4M18 6h4M18 18h4' },
  { name: 'Football', category: 'sports', path: 'M12 2a10 10 0 100 20 10 10 0 000-20zM16.24 7.76l-8.48 8.48M8.5 8.5l7 7' },
  { name: 'Flame', category: 'sports', path: 'M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z' },

  // Abstract
  { name: 'Circle', category: 'abstract', path: 'M12 2a10 10 0 100 20 10 10 0 000-20z' },
  { name: 'Square', category: 'abstract', path: 'M3 3h18v18H3z' },
  { name: 'Triangle', category: 'abstract', path: 'M12 2l10 18H2L12 2z' },
  { name: 'Hexagon', category: 'abstract', path: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z' },
  { name: 'Diamond', category: 'abstract', path: 'M12 2l10 10-10 10L2 12 12 2z' },
  { name: 'Infinity', category: 'abstract', path: 'M12 12c-2-2.67-4-4-6-4a4 4 0 100 8c2 0 4-1.33 6-4zM12 12c2 2.67 4 4 6 4a4 4 0 000-8c-2 0-4 1.33-6 4z' },
  { name: 'Layers2', category: 'abstract', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name: 'Sparkle', category: 'abstract', path: 'M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8' },
  { name: 'Zap', category: 'abstract', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { name: 'Heart', category: 'abstract', path: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
]

export const iconCategories = ['all', 'tech', 'business', 'creative', 'nature', 'food', 'sports', 'abstract'] as const
