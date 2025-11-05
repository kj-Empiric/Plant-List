import { Link } from 'react-router';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Plant } from '../types/plant';
import { Droplet, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/plant/${plant.id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{plant.name}</h3>
              <Badge variant="secondary">{plant.category}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Droplet className="w-4 h-4" />
                <span>{plant.wateringFrequency}</span>
              </div>
              <div className="flex items-center gap-1">
                <Sun className="w-4 h-4" />
                <span>{plant.sunlightRequirement}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}