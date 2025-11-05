import { Card, CardContent } from './ui/card';
import { usePlants } from '../context/PlantContext';
import { Leaf, Droplet, Sun } from 'lucide-react';

export default function DashboardStats() {
  const { plants } = usePlants();

  const totalPlants = plants.length;
  const categoriesCount = new Set(plants.map(p => p.category)).size;
  const needsWaterToday = plants.filter(p => 
    p.wateringFrequency.toLowerCase().includes('daily')
  ).length;

  const stats = [
    {
      label: 'Total Plants',
      value: totalPlants,
      icon: Leaf,
      color: 'text-green-600'
    },
    {
      label: 'Categories',
      value: categoriesCount,
      icon: Sun,
      color: 'text-amber-600'
    },
    {
      label: 'Need Water Today',
      value: needsWaterToday,
      icon: Droplet,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}