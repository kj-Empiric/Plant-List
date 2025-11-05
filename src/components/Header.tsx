import { Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import { Home, Plus, Grid3x3 } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/add-plant', label: 'Add Plant', icon: Plus },
    { path: '/categories', label: 'Categories', icon: Grid3x3 }
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌿</span>
            </div>
            <span className="font-bold text-xl">Plant Care</span>
          </Link>
          
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}