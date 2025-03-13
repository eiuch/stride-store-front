
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/assets/data';
import { Button } from '@/components/ui/button';
import { HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [wishlistProducts, setWishlistProducts] = useState<typeof products>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist products
  useEffect(() => {
    const loadWishlist = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
      const wishlistProducts = products.filter(product => wishlistIds.includes(product.id));
      setWishlistProducts(wishlistProducts);
      setLoading(false);
    };

    loadWishlist();
    
    // Listen for wishlist updates
    window.addEventListener('wishlistUpdated', loadWishlist);
    
    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);

  // Clear all items from wishlist
  const clearWishlist = () => {
    localStorage.setItem('wishlistItems', '[]');
    setWishlistProducts([]);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  // Remove a single product from wishlist
  const removeFromWishlist = (productId: number) => {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    const updatedWishlist = wishlistItems.filter((id: number) => id !== productId);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    
    setWishlistProducts(prev => prev.filter(product => product.id !== productId));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <section className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Избранное</h1>
            <p className="text-muted-foreground">
              Товары, которые вы добавили в избранное
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-[4/5] mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : wishlistProducts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  {wishlistProducts.length} {
                    wishlistProducts.length === 1 ? 'товар' : 
                    wishlistProducts.length >= 2 && wishlistProducts.length <= 4 ? 'товара' : 'товаров'
                  } в избранном
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearWishlist}
                  className="text-sm"
                >
                  Очистить избранное
                </Button>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {wishlistProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                    onAddToWishlist={() => removeFromWishlist(product.id)}
                  />
                ))}
              </motion.div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                <HeartOff className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Ваш список избранного пуст</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Добавляйте товары в избранное, чтобы не потерять их и легко найти позже.
              </p>
              <Button asChild>
                <Link to="/catalog">Перейти в каталог</Link>
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
