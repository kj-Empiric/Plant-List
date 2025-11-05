import { usePlants } from '@/context/PlantContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function Wishlist() {
  const { plants, updatePlant } = usePlants();
  const wishlist = plants.filter(p => (p.status || 'owned') === 'wishlist');

  const markOwned = (id: string) => {
    const p = plants.find(x => x.id === id);
    if (!p) return;
    updatePlant({ ...p, status: 'owned' });
    toast.success('Moved to Owned');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-muted-foreground">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{(p.species || p.name)}{p.variety ? ` • ${p.variety}` : ''}</div>
                  </div>
                  <Badge variant="secondary">{p.category}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{p.sunlightRequirement} • {p.wateringFrequency}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => markOwned(p.id)}>Mark as Owned</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}


