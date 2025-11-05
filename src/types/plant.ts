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
  category: PlantCategory;
  imageUrl: string;
  wateringFrequency: string;
  sunlightRequirement: string;
  description: string;
  dateAdded: string;
}