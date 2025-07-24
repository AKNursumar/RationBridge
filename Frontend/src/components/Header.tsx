import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Utensils } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Donate Food', href: '/donate' },
    { name: 'Find Donations', href: '/volunteer' },
    { name: 'Community', href: '/community' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-soft group-hover:shadow-elevation transition-all duration-300">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">RationBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/volunteer">Find Food</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-4 rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" asChild>
                  <Link to="/volunteer" onClick={() => setIsMenuOpen(false)}>
                    Find Food
                  </Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                    Donate Now
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;