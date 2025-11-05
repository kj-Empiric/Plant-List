import { useParams, useNavigate } from 'react-router';
import { usePlants } from '../context/PlantContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Droplet, Sun, Calendar, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { PLANT_CATEGORIES, PlantCategory } from '../types/plant';

const plantSchema = z.object({
  name: z.string().min(1, 'Plant name is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  wateringFrequency: z.string().min(1, 'Watering frequency is required'),
  sunlightRequirement: z.string().min(1, 'Sunlight requirement is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type PlantFormData = z.infer<typeof plantSchema>;

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlantById, deletePlant, updatePlant } = usePlants();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const plant = getPlantById(id!);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: plant ? {
      name: plant.name,
      category: plant.category,
      imageUrl: plant.imageUrl,
      wateringFrequency: plant.wateringFrequency,
      sunlightRequirement: plant.sunlightRequirement,
      description: plant.description,
    } : undefined,
  });

  const selectedCategory = watch('category');

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-semibold mb-2">Plant not found</h2>
            <p className="text-muted-foreground mb-6">
              The plant you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    deletePlant(plant.id);
    toast.success('Plant deleted successfully');
    navigate('/');
  };

  const onSubmit = (data: PlantFormData) => {
    const updatedPlant = {
      ...plant,
      name: data.name,
      category: data.category as PlantCategory,
      imageUrl: data.imageUrl,
      wateringFrequency: data.wateringFrequency,
      sunlightRequirement: data.sunlightRequirement,
      description: data.description,
    };

    updatePlant(updatedPlant);
    toast.success('Plant updated successfully!');
    setIsEditOpen(false);
  };

  const dateAdded = new Date(plant.dateAdded).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{plant.name}</h1>
                  <Badge variant="secondary" className="text-base">
                    {plant.category}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Plant</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name">Plant Name</Label>
                          <Input id="edit-name" {...register('name')} />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="edit-category">Category</Label>
                          <Select
                            value={selectedCategory}
                            onValueChange={(value) => setValue('category', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
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
                          <Label htmlFor="edit-imageUrl">Image URL</Label>
                          <Input id="edit-imageUrl" type="url" {...register('imageUrl')} />
                          {errors.imageUrl && (
                            <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="edit-wateringFrequency">Watering Frequency</Label>
                          <Input id="edit-wateringFrequency" {...register('wateringFrequency')} />
                          {errors.wateringFrequency && (
                            <p className="text-sm text-destructive">
                              {errors.wateringFrequency.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="edit-sunlightRequirement">Sunlight Requirement</Label>
                          <Input id="edit-sunlightRequirement" {...register('sunlightRequirement')} />
                          {errors.sunlightRequirement && (
                            <p className="text-sm text-destructive">
                              {errors.sunlightRequirement.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea id="edit-description" rows={4} {...register('description')} />
                          {errors.description && (
                            <p className="text-sm text-destructive">
                              {errors.description.message}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <Button type="submit" className="flex-1">
                            Save Changes
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Plant</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {plant.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Watering</p>
                    <p className="font-semibold">{plant.wateringFrequency}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Sun className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sunlight</p>
                    <p className="font-semibold">{plant.sunlightRequirement}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Added</p>
                    <p className="font-semibold">{dateAdded}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {plant.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}