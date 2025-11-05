export const PLANT_CATEGORIES = [
  'Succulents',
  'Tropical',
  'Flowering',
  'Herbs',
  'Cacti',
  'Ferns',
  'Vines',
  'Trees',
  'Indoor',
  'Outdoor',
  'Semidoor',
  'Air-Purifying',
  'Flowering',
  'Low Light'
] as const;

export type PlantCategory = typeof PLANT_CATEGORIES[number];

export interface Plant {
  id: string;
  name: string;
  species?: string; // e.g., "Money Plant" (Epipremnum aureum)
  variety?: string; // e.g., "Marble Queen"
  category: PlantCategory;
  imageUrl: string;
  wateringFrequency: string;
  sunlightRequirement: string;
  description: string;
  dateAdded: string;
  status?: 'owned' | 'wishlist';
}