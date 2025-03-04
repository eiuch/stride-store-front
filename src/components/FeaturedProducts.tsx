
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/assets/data';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground mb-2">
              Featured Collection
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">Популярные кроссовки</h2>
          </div>
          
          <Link 
            to="/catalog" 
            className="hidden md:flex items-center text-sm font-medium link-hover"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>Смотреть все</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link 
            to="/catalog" 
            className="inline-flex items-center text-sm font-medium px-5 py-2 border border-input rounded-full hover:bg-secondary transition-colors"
          >
            Смотреть все
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
