
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        {/* Hero section */}
        <section className="container-custom py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">О компании <span className="text-primary">Кроссы и точка</span></h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Мы – молодой бренд, который стремится изменить подход к продаже кроссовок в России.
                Наша миссия – делать качественную обувь доступной и дарить удовольствие от покупок.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-secondary/50 p-5 rounded-lg">
                  <h3 className="text-2xl font-bold mb-1">5+</h3>
                  <p className="text-muted-foreground">Лет опыта</p>
                </div>
                <div className="bg-secondary/50 p-5 rounded-lg">
                  <h3 className="text-2xl font-bold mb-1">100K+</h3>
                  <p className="text-muted-foreground">Довольных клиентов</p>
                </div>
                <div className="bg-secondary/50 p-5 rounded-lg">
                  <h3 className="text-2xl font-bold mb-1">25+</h3>
                  <p className="text-muted-foreground">Городов доставки</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-video lg:aspect-square"
            >
              <img
                src="https://images.unsplash.com/photo-1600181516264-3ea807ff44b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Наша команда"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Our story */}
        <section className="bg-secondary/30 py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">Наша история</h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Всё началось в 2018 году, когда группа энтузиастов кроссовочной культуры решила 
                создать магазин, который сочетал бы в себе качественные товары, доступные цены и 
                отличный сервис. Мы начинали как маленький онлайн-магазин, но быстро выросли 
                благодаря положительным отзывам наших клиентов.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Сегодня "Кроссы и точка" – это больше, чем просто магазин. Это сообщество людей, 
                объединенных любовью к стильной и комфортной обуви. Мы постоянно расширяем 
                ассортимент, сотрудничаем с известными брендами и развиваем наш сервис, чтобы 
                каждый клиент оставался доволен.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Values */}
        <section className="container-custom py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Наши ценности</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 rounded-xl border shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Качество</h3>
              <p className="text-muted-foreground">
                Мы тщательно отбираем товары и работаем только с проверенными поставщиками, 
                чтобы гарантировать оригинальность и высокое качество каждой пары обуви.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-8 rounded-xl border shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Сервис</h3>
              <p className="text-muted-foreground">
                Наша команда всегда готова помочь с выбором, ответить на вопросы и 
                сделать процесс покупки максимально удобным. Мы ценим каждого клиента.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card p-8 rounded-xl border shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Доступность</h3>
              <p className="text-muted-foreground">
                Мы стремимся сделать качественную обувь доступной для всех. 
                Регулярные акции, скидки и специальные предложения – часть нашей философии.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Team */}
        <section className="container-custom py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Наша команда</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-4 overflow-hidden rounded-xl aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Александр Петров" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Александр Петров</h3>
              <p className="text-muted-foreground">Основатель и CEO</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-4 overflow-hidden rounded-xl aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
                  alt="Екатерина Иванова" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Екатерина Иванова</h3>
              <p className="text-muted-foreground">Директор по маркетингу</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-4 overflow-hidden rounded-xl aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Михаил Сидоров" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Михаил Сидоров</h3>
              <p className="text-muted-foreground">Руководитель отдела продаж</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-4 overflow-hidden rounded-xl aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80" 
                  alt="Анна Козлова" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Анна Козлова</h3>
              <p className="text-muted-foreground">Руководитель службы поддержки</p>
            </motion.div>
          </div>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
