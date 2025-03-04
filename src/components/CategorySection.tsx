
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '@/assets/data';

const CategorySection = () => {
  return (
    <section className="relative overflow-hidden section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-background rounded-full text-xs font-medium text-muted-foreground mb-2">
            Категории
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">Выберите свой стиль</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Мы подобрали кроссовки для любого случая — от повседневной носки до профессионального спорта
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Link to={`/category/${category.name}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.label}</h3>
                    <div className="flex items-center">
                      <span className="text-white/80 text-sm">Смотреть коллекцию</span>
                      <motion.span
                        className="ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
