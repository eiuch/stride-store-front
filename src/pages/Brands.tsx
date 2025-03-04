
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { brands, products } from '@/assets/data';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';

const Brands = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <section className="container-custom py-8 md:py-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Бренды</h1>
            <p className="text-muted-foreground max-w-3xl">
              Мы сотрудничаем с лучшими мировыми брендами, чтобы предложить вам качественную и стильную обувь.
              В нашем каталоге представлены как классические модели, так и самые свежие новинки.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <motion.div 
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative group overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-40 h-24 mb-6 flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-center mb-2">{brand.name}</h3>
                  
                  <Badge variant="secondary" className="mb-4">
                    {products.filter(p => p.brand === brand.name).length} моделей
                  </Badge>
                  
                  <Link 
                    to={`/catalog?brand=${brand.name}`}
                    className="inline-flex items-center text-sm font-medium text-primary"
                  >
                    Посмотреть коллекцию
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="container-custom py-8 md:py-12">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Популярные модели</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.filter(product => product.isFeatured).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Brands;
