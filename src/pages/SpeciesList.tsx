import { useMemo } from 'react';
import { usePlants } from '@/context/PlantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router';

export default function SpeciesList() {
  const { plants } = usePlants();

  const speciesStats = useMemo(() => {
    const map = new Map<string, { count: number; varieties: Set<string> }>();
    for (const p of plants) {
      const key = (p.species || p.name).trim();
      if (!map.has(key)) map.set(key, { count: 0, varieties: new Set() });
      const entry = map.get(key)!;
      entry.count += 1;
      if (p.variety && p.variety.trim()) entry.varieties.add(p.variety.trim());
    }
    return Array.from(map.entries()).map(([species, data]) => ({
      species,
      count: data.count,
      varieties: Array.from(data.varieties).sort(),
    })).sort((a, b) => a.species.localeCompare(b.species));
  }, [plants]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Species & Varieties</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {speciesStats.map((s) => (
          <Link key={s.species} to={`/species/${encodeURIComponent(s.species)}`}>
            <Card className="hover:bg-accent/40 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{s.species}</span>
                  <span className="text-sm text-muted-foreground">{s.count} plants</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {s.varieties.length > 0 ? `${s.varieties.length} variet${s.varieties.length === 1 ? 'y' : 'ies'}: ${s.varieties.slice(0, 3).join(', ')}${s.varieties.length > 3 ? '…' : ''}` : 'No varieties specified'}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {speciesStats.length === 0 && (
          <p className="text-muted-foreground">No plants yet. Add some to see species here.</p>
        )}
      </div>
    </main>
  );
}


