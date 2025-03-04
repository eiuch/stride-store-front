
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ChevronRight, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { products } from '@/assets/data';

type CartItem = {
  productId: string;
  quantity: number;
  size: string;
};

const Cart = () => {
  // Demo cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: 'product1', quantity: 1, size: '42' },
    { productId: 'product3', quantity: 2, size: '39' },
  ]);
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    toast.success('Товар удален из корзины');
  };
  
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'скидка' || promoCode.toLowerCase() === 'sale') {
      setPromoApplied(true);
      toast.success('Промокод применен');
    } else {
      toast.error('Неверный промокод');
    }
  };
  
  // Get product details for each cart item
  const cartWithDetails = cartItems.map(item => {
    const productDetails = products.find(p => p.id === item.productId);
    return {
      ...item,
      product: productDetails
    };
  });
  
  // Calculate totals
  const subtotal = cartWithDetails.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);
  
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount with promo
  const shipping = subtotal > 5000 ? 0 : 300; // Free shipping over 5000₽
  const total = subtotal - discount + shipping;
  
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
          <h1 className="text-3xl font-bold mb-6">Корзина</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg shadow-sm border">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Товары в корзине</h2>
                    
                    <div className="divide-y">
                      {cartWithDetails.map((item) => (
                        <div key={item.productId} className="py-4 flex flex-col sm:flex-row">
                          <div className="sm:w-24 sm:h-24 h-32 mb-4 sm:mb-0 bg-secondary/40 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product?.image} 
                              alt={item.product?.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="sm:ml-4 flex-grow">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">
                                  <Link to={`/product/${item.productId}`} className="hover:underline">
                                    {item.product?.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {item.product?.brand}
                                </p>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Размер: {item.size}
                                </p>
                              </div>
                              
                              <button 
                                onClick={() => removeFromCart(item.productId)}
                                className="text-muted-foreground hover:text-foreground transition-colors h-6 w-6 flex items-center justify-center"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="flex justify-between items-end mt-2">
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center rounded border hover:border-primary transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                
                                <span className="w-10 text-center font-medium text-sm">
                                  {item.quantity}
                                </span>
                                
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center rounded border hover:border-primary transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              
                              <div className="text-right">
                                <div className="font-semibold">
                                  {formatPrice((item.product?.price || 0) * item.quantity)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-xs text-muted-foreground">
                                    {formatPrice(item.product?.price || 0)} за шт.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Continue shopping */}
                <div className="mt-4">
                  <Link 
                    to="/catalog" 
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
                    Продолжить покупки
                  </Link>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-32">
                  <h2 className="text-lg font-semibold mb-4">Сумма заказа</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Товары ({cartItems.length})</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка по промокоду</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка</span>
                      <span>{shipping > 0 ? formatPrice(shipping) : 'Бесплатно'}</span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Итого</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                      {shipping === 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          Бесплатная доставка
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Promo code */}
                  <div className="mb-6">
                    <label htmlFor="promo" className="text-sm font-medium mb-2 block">
                      Промокод
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        id="promo"
                        placeholder="Введите промокод"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button 
                        onClick={applyPromoCode}
                        disabled={!promoCode || promoApplied}
                        variant={promoApplied ? "secondary" : "default"}
                      >
                        {promoApplied ? 'Применен' : 'Применить'}
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-green-600 mt-1">
                        Промокод успешно применен
                      </p>
                    )}
                  </div>
                  
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout">
                      Оформить заказ
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Нажимая кнопку, вы соглашаетесь с условиями оферты и политикой конфиденциальности
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg shadow-sm border">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Ваша корзина пуста</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Похоже, вы еще не добавили товары в корзину. Перейдите в каталог, чтобы найти подходящие кроссовки.
              </p>
              
              <Button asChild size="lg">
                <Link to="/catalog">
                  Перейти в каталог
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
