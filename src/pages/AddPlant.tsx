import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import AddPlantForm from '../components/AddPlantForm';
import { motion } from 'framer-motion';

export default function AddPlant() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Add New Plant</CardTitle>
            <p className="text-muted-foreground">
              Fill in the details to add a new plant to your collection
            </p>
          </CardHeader>
          <CardContent>
            <AddPlantForm />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}