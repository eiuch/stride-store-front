
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/4 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] -translate-x-1/4 translate-y-1/4 bg-gray-100 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 md:pr-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground mb-4">
                Новая коллекция 2023
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                Кроссовки, которые <span className="text-primary/90">подчеркнут ваш стиль</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 md:mb-8 md:pr-12">
                Уникальная коллекция премиальной обуви от ведущих мировых брендов. Доставка по всей России.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/catalog">
                    Смотреть каталог
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/brands">
                    Популярные бренды
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 md:mt-0 md:w-1/2 z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: ["0%", "-3%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80" 
                    alt="Featured sneakers" 
                    className="rounded-2xl shadow-xl w-full object-cover aspect-square md:aspect-[4/5]"
                  />
                </motion.div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full -z-10"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass-panel p-4 rounded-xl shadow-lg max-w-[180px]"
              >
                <div className="text-sm font-medium mb-1">Быстрая доставка</div>
                <div className="text-xs text-muted-foreground">По всей России от 1 до 3 дней</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute left-4 bottom-8 glass-panel p-4 rounded-xl shadow-lg max-w-[180px]"
              >
                <div className="text-sm font-medium mb-1">Гарантия качества</div>
                <div className="text-xs text-muted-foreground">Только оригинальные товары</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
