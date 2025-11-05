import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function PlantParentEssentials() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Plant Parent Essentials</h1>
        <p className="text-muted-foreground mt-1">Core tools and concepts every plant parent needs. Curated from reputable web sources (see citations).</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Watering & Moisture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Badge variant="secondary">Watering can</Badge> with narrow spout for control.
              </li>
              <li>
                <Badge variant="secondary">Soil moisture meter</Badge> (helps prevent overwatering in beginners).
              </li>
              <li>
                Self-watering pots for consistent moisture when away.
              </li>
              <li>
                Use room-temperature water; water thoroughly until excess drains.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Light & Placement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                South/East windows give strongest light; rotate plants for even growth.
              </li>
              <li>
                <Badge variant="secondary">Full‑spectrum LED grow light</Badge> for low‑light rooms.
              </li>
              <li>
                Keep leaves dust‑free to maximize photosynthesis.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soil, Pots & Drainage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Use high‑quality <Badge variant="secondary">potting mix</Badge> (never garden soil) with good aeration.
              </li>
              <li>
                Pots must have <Badge variant="secondary">drainage holes</Badge>; pair with saucers or trays.
              </li>
              <li>
                Repot when roots circle or mix compacts; upsize 1–2" only.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feeding & Routine Care</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Balanced liquid <Badge variant="secondary">fertilizer</Badge> during active growth (spring–summer); reduce in winter.
              </li>
              <li>
                <Badge variant="secondary">Pruning shears</Badge> for dead leaves and shaping; clean blades between plants.
              </li>
              <li>
                <Badge variant="secondary">Humidity aids</Badge>: room humidifier, pebble tray, or occasional misting for tropicals.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pests & Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Quarantine new plants; inspect undersides of leaves weekly.
              </li>
              <li>
                <Badge variant="secondary">Sticky traps</Badge> for fungus gnats; 
                <Badge variant="secondary">neem oil/insecticidal soap</Badge> for soft‑bodied pests.
              </li>
              <li>
                Adjust care for symptoms: yellowing (overwater), crispy edges (underwater/low humidity), leggy growth (low light).
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="font-medium text-foreground">Citations and further reading</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Essentials overviews and tool suggestions: 
            <a className="underline" href="https://www.eonline.com/news/1395830/must-have-plant-accessories-for-every-kind-of-plant-parent" target="_blank" rel="noreferrer">E! Online</a>, 
            <a className="underline" href="https://plantinthebox.com/blogs/the-plant-lover-blog/10-must-have-houseplant-accessories-for-every-plant-parent" target="_blank" rel="noreferrer">Plant In The Box</a>, 
            <a className="underline" href="https://www.domino.com/content/everything-in-our-kit-for-new-plant-parents-is-on-amazon/" target="_blank" rel="noreferrer">Domino</a>.
          </li>
          <li>
            Care fundamentals (watering, light, humidity, fertilizer): 
            <a className="underline" href="https://www.homedepot.com/c/ai/how-to-be-the-best-new-houseplant-parent/9ba683603be9fa5395fab901f5d5d3d6" target="_blank" rel="noreferrer">Home Depot Guide</a>.
          </li>
        </ul>
      </div>
    </main>
  );
}


