
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '@/assets/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Define the cart item type
interface CartItem {
  id: number;
  quantity: number;
  size: string;
}

const Cart = () => {
  // Load cart items from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Get the product details for each cart item
  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      ...product,
      quantity: item.quantity,
      size: item.size,
    };
  }).filter(item => item !== undefined) as any[];
  
  // Calculate cart totals
  const subtotal = cartProducts.reduce((total, item) => {
    return total + (item?.price || 0) * (item?.quantity || 0);
  }, 0);
  
  const shipping = subtotal > 5000 ? 0 : 499;
  const total = subtotal + shipping - discountAmount;
  
  // Update quantities
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };
  
  // Remove item from cart
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    toast.success('Товар удален из корзины');
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    // Simplified promo code logic - normally would check against valid codes from API
    if (promoCode.toLowerCase() === 'sale20') {
      setPromoApplied(true);
      setDiscountAmount(Math.round(subtotal * 0.2)); // 20% discount
      toast.success('Промокод применен! Скидка 20%');
    } else {
      toast.error('Неверный промокод');
    }
  };
  
  // Format price to RUB
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Корзина</h1>
          
          {cartProducts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Ваша корзина пуста</h2>
              <p className="text-muted-foreground mb-6">Добавьте товары, чтобы оформить заказ</p>
              <Button asChild size="lg">
                <Link to="/catalog">Продолжить покупки</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="md:col-span-2">
                <ul className="space-y-6">
                  {cartProducts.map((item) => (
                    <motion.li
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary/40 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/product/${item.id}`} className="font-medium hover:underline line-clamp-1">
                          {item.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">Размер: {item.size}</div>
                        <div className="text-sm text-muted-foreground">{item.brand}</div>
                        <div className="font-semibold">{formatPrice(item.price)}</div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border hover:border-primary transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border hover:border-primary transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Order summary */}
              <div className="bg-card rounded-lg p-6 sticky top-32 border shadow-sm">
                <h3 className="font-semibold mb-4">Итого</h3>
                
                <div className="flex justify-between items-center mb-2">
                  <span>Подитог:</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span>Доставка:</span>
                  <span className="font-medium">{shipping === 0 ? 'Бесплатно' : formatPrice(shipping)}</span>
                </div>
                
                {promoApplied ? (
                  <div className="flex justify-between items-center mb-4">
                    <span>Скидка:</span>
                    <span className="text-green-500 font-medium">- {formatPrice(discountAmount)}</span>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Промокод"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button
                        onClick={applyPromoCode}
                        className="absolute right-1 top-1 rounded-md"
                      >
                        Применить
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Всего:</span>
                  <span className="text-lg font-semibold">{formatPrice(total)}</span>
                </div>
                
                <Button asChild size="lg" className="w-full">
                  <Link to="/checkout" className="flex items-center justify-center">
                    Оформить заказ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
