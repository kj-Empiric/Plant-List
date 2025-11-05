import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import AddPlant from "./pages/AddPlant";
import PlantDetail from "./pages/PlantDetail";
import Categories from "./pages/Categories";
import Header from "./components/Header";
import PlantParentEssentials from "./pages/PlantParentEssentials";
import SpeciesList from "./pages/SpeciesList";
import SpeciesDetail from "./pages/SpeciesDetail";
import Wishlist from "./pages/Wishlist";
import { PlantProvider } from "./context/PlantContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <PlantProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/add-plant" element={<AddPlant />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/essentials" element={<PlantParentEssentials />} />
          <Route path="/species" element={<SpeciesList />} />
          <Route path="/species/:species" element={<SpeciesDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </PlantProvider>
  );
}