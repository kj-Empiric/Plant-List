import { usePlants } from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import DashboardStats from '../components/DashboardStats';
import { Button } from '../components/ui/button';
import { Plus, Leaf } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { plants } = usePlants();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Plant Collection</h1>
            <p className="text-muted-foreground">
              Manage and track your beautiful plants
            </p>
          </div>
          <Link to="/add-plant">
            <Button size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Add Plant
            </Button>
          </Link>
        </div>

        <DashboardStats />

        {plants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No plants yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Start building your plant collection by adding your first plant!
            </p>
            <Link to="/add-plant">
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Add Your First Plant
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}