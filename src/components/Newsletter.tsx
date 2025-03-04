
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Подписка оформлена",
        description: "Спасибо за подписку на наши новости!",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">Подпишитесь на новости</h2>
            <p className="mt-4 text-muted-foreground">
              Будьте в курсе новых поступлений, акций и эксклюзивных предложений
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full h-12 px-4 rounded-full border border-input focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="h-12 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Подписаться'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            
            <p className="mt-4 text-xs text-muted-foreground">
              Нажимая кнопку "Подписаться", вы соглашаетесь с нашей политикой конфиденциальности
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
