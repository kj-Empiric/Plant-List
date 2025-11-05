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

const plantSchema = z.object({
  name: z.string().min(1, 'Plant name is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  wateringFrequency: z.string().min(1, 'Watering frequency is required'),
  sunlightRequirement: z.string().min(1, 'Sunlight requirement is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type PlantFormData = z.infer<typeof plantSchema>;

export default function AddPlantForm() {
  const { addPlant } = usePlants();
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
    const newPlant = {
      id: crypto.randomUUID(),
      name: data.name,
      category: data.category as PlantCategory,
      imageUrl: data.imageUrl,
      wateringFrequency: data.wateringFrequency,
      sunlightRequirement: data.sunlightRequirement,
      description: data.description,
      dateAdded: new Date().toISOString(),
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