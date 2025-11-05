import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Plant } from '../types/plant';

interface PlantState {
  plants: Plant[];
}

type PlantAction =
  | { type: 'SET_PLANTS'; payload: Plant[] }
  | { type: 'ADD_PLANT'; payload: Plant }
  | { type: 'UPDATE_PLANT'; payload: Plant }
  | { type: 'DELETE_PLANT'; payload: string };

interface PlantContextType extends PlantState {
  addPlant: (plant: Plant) => void;
  updatePlant: (plant: Plant) => void;
  deletePlant: (id: string) => void;
  getPlantById: (id: string) => Plant | undefined;
  replacePlants: (plants: Plant[]) => void;
}

const PlantContext = createContext<PlantContextType | undefined>(undefined);

const STORAGE_KEY = 'plant-care-app-data';

function plantReducer(state: PlantState, action: PlantAction): PlantState {
  switch (action.type) {
    case 'SET_PLANTS':
      return { plants: action.payload };
    case 'ADD_PLANT':
      return { plants: [...state.plants, action.payload] };
    case 'UPDATE_PLANT':
      return {
        plants: state.plants.map((plant) =>
          plant.id === action.payload.id ? action.payload : plant
        ),
      };
    case 'DELETE_PLANT':
      return {
        plants: state.plants.filter((plant) => plant.id !== action.payload),
      };
    default:
      return state;
  }
}

export function PlantProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(plantReducer, { plants: [] });

  // Load plants from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const plants = JSON.parse(stored);
        dispatch({ type: 'SET_PLANTS', payload: plants });
      } catch (error) {
        console.error('Failed to load plants from localStorage:', error);
      }
    }
  }, []);

  // Save plants to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.plants));
  }, [state.plants]);

  const addPlant = (plant: Plant) => {
    dispatch({ type: 'ADD_PLANT', payload: plant });
  };

  const updatePlant = (plant: Plant) => {
    dispatch({ type: 'UPDATE_PLANT', payload: plant });
  };

  const deletePlant = (id: string) => {
    dispatch({ type: 'DELETE_PLANT', payload: id });
  };

  const getPlantById = (id: string) => {
    return state.plants.find((plant) => plant.id === id);
  };

  const replacePlants = (plants: Plant[]) => {
    dispatch({ type: 'SET_PLANTS', payload: plants });
  };

  return (
    <PlantContext.Provider
      value={{
        plants: state.plants,
        addPlant,
        updatePlant,
        deletePlant,
        getPlantById,
        replacePlants,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
}

export function usePlants() {
  const context = useContext(PlantContext);
  if (context === undefined) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
}