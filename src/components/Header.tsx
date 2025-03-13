
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItemCount(cartItems.length);
    };

    // Initial count
    updateCartCount();

    // Listen for storage events (when cart is updated)
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for when cart changes within the same tab
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Update cart count when route changes (in case items were added/removed)
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItemCount(cartItems.length);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-xl shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-bold tracking-tighter transition-transform hover:scale-[1.02] duration-300"
          >
            КРОССЫ<span className="text-primary/70">&nbsp;И&nbsp;ТОЧКА</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={cn(
              "text-sm font-medium text-foreground/90 hover:text-foreground transition-colors link-hover",
              location.pathname === "/" && "text-foreground font-semibold"
            )}>
              Главная
            </Link>
            <Link to="/catalog" className={cn(
              "text-sm font-medium text-foreground/90 hover:text-foreground transition-colors link-hover",
              location.pathname === "/catalog" && "text-foreground font-semibold"
            )}>
              Каталог
            </Link>
            <Link to="/brands" className={cn(
              "text-sm font-medium text-foreground/90 hover:text-foreground transition-colors link-hover",
              location.pathname === "/brands" && "text-foreground font-semibold"
            )}>
              Бренды
            </Link>
            <Link to="/about" className={cn(
              "text-sm font-medium text-foreground/90 hover:text-foreground transition-colors link-hover",
              location.pathname === "/about" && "text-foreground font-semibold"
            )}>
              О нас
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full transition-all hover:bg-secondary">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full transition-all hover:bg-secondary">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full transition-all hover:bg-secondary" asChild>
              <Link to="/cart">
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] bg-primary text-primary-foreground rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className={cn("w-6 h-6 transition-opacity", isMenuOpen ? "opacity-0" : "opacity-100")} />
            <X className={cn("w-6 h-6 absolute transition-opacity", isMenuOpen ? "opacity-100" : "opacity-0")} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out pt-24",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container-custom flex flex-col h-full">
          <nav className="flex flex-col space-y-8 pt-6">
            <Link 
              to="/" 
              className={cn(
                "text-3xl font-medium",
                location.pathname === "/" && "text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className={cn(
                "text-3xl font-medium",
                location.pathname === "/catalog" && "text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </Link>
            <Link 
              to="/brands" 
              className={cn(
                "text-3xl font-medium",
                location.pathname === "/brands" && "text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Бренды
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-3xl font-medium",
                location.pathname === "/about" && "text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </Link>
          </nav>

          <div className="flex items-center justify-center space-x-8 mt-auto mb-12">
            <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full">
              <Search className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full">
              <User className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="w-14 h-14 rounded-full" asChild>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
