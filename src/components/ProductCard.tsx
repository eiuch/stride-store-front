
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/assets/data';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, index = 0, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fallback image in case the product image is missing or fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  const handleAddToCart = () => {
    // If no onAddToCart prop, show toast
    if (!onAddToCart) {
      toast.success(`${product.name} добавлен в корзину`);
      
      // Add to localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].quantity += 1;
      } else {
        cartItems.push({
          id: product.id,
          quantity: 1,
          size: product.sizes[Math.floor(product.sizes.length / 2)].toString()
        });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      // Dispatch custom event to notify header about cart changes
      window.dispatchEvent(new Event('cartUpdated'));
    } else {
      onAddToCart(product);
    }
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.name} добавлен в избранное`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-2xl bg-secondary/40 aspect-[4/5] mb-4">
        <Link to={`/product/${product.id}`} className="block h-full w-full relative">
          {/* Loading state */}
          <div className={cn("absolute inset-0 bg-gray-100 animate-pulse", isImageLoaded && !imageError ? "opacity-0" : "opacity-100")} />
          
          {/* Product image */}
          <img
            src={product.image || fallbackImage}
            alt={product.name}
            className={cn(
              "h-full w-full object-cover transition-all duration-500",
              isHovered ? "scale-105" : "scale-100",
              isImageLoaded && !imageError ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setIsImageLoaded(true);
            }}
          />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Новинка
              </span>
            )}
            {product.oldPrice && (
              <span className="inline-block bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                Скидка
              </span>
            )}
          </div>
          
          {/* Quick actions */}
          <div className={cn(
            "absolute bottom-4 left-0 right-0 flex justify-center transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="flex gap-2 px-4">
              <Button size="sm" className="rounded-full bg-white/90 text-foreground hover:bg-white" onClick={(e) => {
                e.preventDefault();
                handleAddToWishlist();
              }}>
                <Heart className="w-4 h-4 mr-1" />
                <span className="text-xs">В избранное</span>
              </Button>
              <Button size="sm" className="rounded-full bg-primary/90 hover:bg-primary" onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}>
                <ShoppingBag className="w-4 h-4 mr-1" />
                <span className="text-xs">В корзину</span>
              </Button>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Product info */}
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">{product.brand}</div>
        <h3 className="font-medium line-clamp-1">
          <Link to={`/product/${product.id}`} className="hover:underline">{product.name}</Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
