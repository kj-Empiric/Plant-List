import { useState } from 'react';
import { usePlants } from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import { Button } from '../components/ui/button';
import { PLANT_CATEGORIES, PlantCategory } from '../types/plant';
import { motion } from 'framer-motion';

export default function Categories() {
  const { plants } = usePlants();
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | 'All'>('All');

  const filteredPlants = selectedCategory === 'All'
    ? plants
    : plants.filter(plant => plant.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Browse by Category</h1>
        <p className="text-muted-foreground mb-8">
          Filter your plants by their category
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
          >
            All ({plants.length})
          </Button>
          {PLANT_CATEGORIES.map((category) => {
            const count = plants.filter(p=> p.category === category).length;
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({count})
              </Button>
            );
          })}
        </div>

        {filteredPlants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <h2 className="text-2xl font-semibold mb-2">No plants in this category</h2>
            <p className="text-muted-foreground">
              Try selecting a different category or add a new plant.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}