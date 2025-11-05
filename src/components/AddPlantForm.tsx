import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { PLANT_CATEGORIES, PlantCategory } from '../types/plant';
import { usePlants } from '../context/PlantContext';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';

const plantSchema = z.object({
  name: z.string().min(1, 'Plant name is required'),
  species: z.string().min(1, 'Species/common name is required'),
  variety: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  wateringFrequency: z.string().min(1, 'Watering frequency is required'),
  sunlightRequirement: z.string().min(1, 'Sunlight requirement is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  owned: z.boolean().default(true),
});

type PlantFormData = z.infer<typeof plantSchema>;

export default function AddPlantForm() {
  const { addPlant, plants, updatePlant } = usePlants();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
  });

  const selectedCategory = watch('category');

  const onSubmit = (data: PlantFormData) => {
    const speciesKey = (data.species || data.name).trim().toLowerCase();
    const varietyKey = (data.variety || '').trim().toLowerCase();
    const duplicate = plants.find(p => ((p.species || p.name).trim().toLowerCase() === speciesKey) && ((p.variety || '').trim().toLowerCase() === varietyKey));

    if (duplicate) {
      if (duplicate.status === 'wishlist' && data.owned) {
        updatePlant({ ...duplicate, status: 'owned' });
        toast.success('Moved from Wishlist to Owned');
        return navigate('/');
      }
      toast.error('This plant/variety is already in your collection.');
      return;
    }
    const newPlant = {
      id: crypto.randomUUID(),
      name: data.name,
      species: data.species,
      variety: data.variety,
      category: data.category as PlantCategory,
      imageUrl: data.imageUrl,
      wateringFrequency: data.wateringFrequency,
      sunlightRequirement: data.sunlightRequirement,
      description: data.description,
      dateAdded: new Date().toISOString(),
      status: data.owned ? 'owned' : 'wishlist',
    };

    addPlant(newPlant);
    toast.success('Plant added successfully!');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Plant Name</Label>
        <Input
          id="name"
          placeholder="e.g., Monstera Deliciosa"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="species">Species / Common Name</Label>
          <Input
            id="species"
            placeholder="e.g., Money Plant (Pothos), Aglaonema"
            {...register('species')}
          />
          {errors.species && (
            <p className="text-sm text-destructive">{errors.species.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="variety">Variety (optional)</Label>
          <Input
            id="variety"
            placeholder="e.g., Marble Queen, Neon, Silver Bay"
            {...register('variety')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setValue('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {PLANT_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          placeholder="https://example.com/plant-image.jpg"
          {...register('imageUrl')}
        />
        {errors.imageUrl && (
          <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="wateringFrequency">Watering Frequency</Label>
        <Input
          id="wateringFrequency"
          placeholder="e.g., Once a week"
          {...register('wateringFrequency')}
        />
        {errors.wateringFrequency && (
          <p className="text-sm text-destructive">
            {errors.wateringFrequency.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sunlightRequirement">Sunlight Requirement</Label>
        <Input
          id="sunlightRequirement"
          placeholder="e.g., Bright indirect light"
          {...register('sunlightRequirement')}
        />
        {errors.sunlightRequirement && (
          <p className="text-sm text-destructive">
            {errors.sunlightRequirement.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Tell us about this plant..."
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox id="owned" checked={!!watch('owned')} onCheckedChange={(v) => setValue('owned', Boolean(v))} />
          <Label htmlFor="owned">I already own this plant</Label>
        </div>
        <p className="text-xs text-muted-foreground">Uncheck to add it to your Wishlist.</p>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          Add Plant
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}