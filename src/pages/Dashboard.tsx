import { usePlants } from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import DashboardStats from '../components/DashboardStats';
import { Button } from '../components/ui/button';
import { Plus, Leaf } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function Dashboard() {
  const { plants, replacePlants } = usePlants();
  const owned = plants.filter(p => (p.status || 'owned') === 'owned');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const data = JSON.stringify(plants, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date();
    const ymd = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    a.href = url;
    a.download = `plant-care-backup-${ymd}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error('Invalid format');
      // Basic shape validation
      const cleaned = parsed.map((p: any) => ({
        id: String(p.id ?? crypto.randomUUID()),
        name: String(p.name ?? ''),
        species: p.species ? String(p.species) : undefined,
        variety: p.variety ? String(p.variety) : undefined,
        category: String(p.category ?? 'Indoor'),
        imageUrl: String(p.imageUrl ?? ''),
        wateringFrequency: String(p.wateringFrequency ?? ''),
        sunlightRequirement: String(p.sunlightRequirement ?? ''),
        description: String(p.description ?? ''),
        dateAdded: String(p.dateAdded ?? new Date().toISOString()),
        status: p.status === 'wishlist' ? 'wishlist' : 'owned',
      }));
      replacePlants(cleaned);
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line no-alert
      alert('Failed to import. Please select a valid backup JSON file.');
    } finally {
      e.target.value = '';
    }
  };

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
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportData}>Export</Button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
            <Button variant="outline" onClick={onImportClick}>Import</Button>
            <Link to="/add-plant">
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Add Plant
              </Button>
            </Link>
          </div>
        </div>

        <DashboardStats />

        {owned.length === 0 ? (
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
            {owned.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}