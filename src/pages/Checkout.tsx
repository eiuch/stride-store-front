
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, CreditCard, MapPin, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';

const Checkout = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier',
    saveInfo: false,
  });
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, saveInfo: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation (simplified)
    if (!formData.firstName || !formData.email || !formData.phone) {
      toast.error('Пожалуйста, заполните обязательные поля');
      return;
    }
    
    // Show success state
    toast.success('Заказ успешно оформлен!');
    setOrderPlaced(true);
  };
  
  // Demo order summary data
  const orderSummary = {
    subtotal: 25990,
    discount: 2599,
    shipping: 0,
    total: 23391,
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-28 pb-16">
          <div className="container-custom max-w-3xl mx-auto">
            <div className="bg-card rounded-lg shadow-sm border p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">Спасибо за заказ!</h1>
              
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Ваш заказ #23589 успешно оформлен. Мы отправили подтверждение на вашу электронную почту.
              </p>
              
              <div className="bg-secondary/40 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <div className="text-left space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Номер заказа:</span>
                    <span className="font-medium">#23589</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата:</span>
                    <span className="font-medium">{new Date().toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Метод оплаты:</span>
                    <span className="font-medium">Банковская карта</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сумма:</span>
                    <span className="font-medium">{formatPrice(orderSummary.total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/">
                    Вернуться на главную
                  </Link>
                </Button>
                
                <Button asChild>
                  <Link to="/catalog">
                    Продолжить покупки
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-muted-foreground mb-8">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Главная
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <Link to="/cart" className="hover:text-foreground transition-colors">
                  Корзина
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">Оформление заказа</span>
              </li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Contact information */}
                <div className="bg-card rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Контактная информация</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Delivery method */}
                <div className="bg-card rounded-lg shadow-sm border p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Способ доставки</h2>
                  
                  <RadioGroup 
                    value={formData.deliveryMethod}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryMethod: value }))}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="courier" id="courier" />
                      <Label htmlFor="courier" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Курьерская доставка</div>
                            <div className="text-sm text-muted-foreground">Доставка до двери в течение 1-3 дней</div>
                          </div>
                        </div>
                      </Label>
                      <div className="font-medium">300 ₽</div>
                    </div>
                    
                    <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Самовывоз из пункта выдачи</div>
                            <div className="text-sm text-muted-foreground">Более 1000 пунктов выдачи по всей России</div>
                          </div>
                        </div>
                      </Label>
                      <div className="font-medium">Бесплатно</div>
                    </div>
                  </RadioGroup>
                  
                  {formData.deliveryMethod === 'courier' && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Адрес *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required={formData.deliveryMethod === 'courier'}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Город *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required={formData.deliveryMethod === 'courier'}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Индекс *</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required={formData.deliveryMethod === 'courier'}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Payment method */}
                <div className="bg-card rounded-lg shadow-sm border p-6 mb-8">
                  <h2 className="text-lg font-semibold mb-4">Способ оплаты</h2>
                  
                  <Tabs value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="card">Банковская карта</TabsTrigger>
                      <TabsTrigger value="cash">При получении</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <div className="flex items-center space-x-3 rounded-lg border p-4 bg-secondary/50">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Оплата банковской картой</div>
                          <div className="text-sm text-muted-foreground">Visa, Mastercard, МИР</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        После нажатия кнопки "Оформить заказ", вы будете перенаправлены на страницу безопасной оплаты.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="cash">
                      <div className="flex items-center space-x-3 rounded-lg border p-4 bg-secondary/50">
                        <div>
                          <div className="font-medium">Оплата при получении</div>
                          <div className="text-sm text-muted-foreground">Наличными или картой курьеру или в пункте выдачи</div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="flex items-center space-x-2 mb-8">
                  <Checkbox 
                    id="saveInfo" 
                    checked={formData.saveInfo}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="saveInfo" className="cursor-pointer">
                    Сохранить информацию для будущих заказов
                  </Label>
                </div>
                
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Оформить заказ
                </Button>
              </form>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-32">
                <h2 className="text-lg font-semibold mb-4">Ваш заказ</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Товары (2)</span>
                    <span>{formatPrice(orderSummary.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>Скидка по промокоду</span>
                    <span>-{formatPrice(orderSummary.discount)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{orderSummary.shipping > 0 ? formatPrice(orderSummary.shipping) : 'Бесплатно'}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Итого</span>
                      <span>{formatPrice(orderSummary.total)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4 text-sm">
                  <p className="font-medium mb-2">В вашем заказе:</p>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Nike Air Max 270 x 1</span>
                      <span className="font-medium">{formatPrice(12990)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Adidas Ultraboost 23 x 2</span>
                      <span className="font-medium">{formatPrice(13000)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
