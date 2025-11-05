import { useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { usePlants } from '@/context/PlantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SpeciesDetail() {
  const params = useParams();
  const speciesParam = decodeURIComponent(params.species || '');
  const { plants } = usePlants();

  const { varieties, others } = useMemo(() => {
    const filtered = plants.filter((p) => (p.species || p.name).trim() === speciesParam);
    const byVariety = new Map<string, typeof filtered>();
    for (const p of filtered) {
      const key = p.variety && p.variety.trim() ? p.variety.trim() : 'Unspecified variety';
      if (!byVariety.has(key)) byVariety.set(key, [] as any);
      byVariety.get(key)!.push(p);
    }
    const entries = Array.from(byVariety.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    return { varieties: entries, others: filtered };
  }, [plants, speciesParam]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{speciesParam}</h1>
        <Link className="text-sm underline text-muted-foreground" to="/species">Back to species</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {varieties.map(([variety, items]) => (
          <Card key={variety}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>{variety}</span>
                <Badge variant="secondary">{items.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {items.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded object-cover border" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.sunlightRequirement} • {p.wateringFrequency}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
        {varieties.length === 0 && (
          <p className="text-muted-foreground">No plants for this species yet.</p>
        )}
      </div>
    </main>
  );
}


