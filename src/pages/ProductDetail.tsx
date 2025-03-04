
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Minus, Plus, Heart, Share2, ShoppingBag, Check, TruckIcon } from 'lucide-react';
import { products } from '@/assets/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(product?.image || '');
  const [relatedProducts, setRelatedProducts] = useState<typeof products>([]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find product and related products
  useEffect(() => {
    const currentProduct = products.find(p => p.id === id);
    setProduct(currentProduct);
    
    if (currentProduct) {
      setMainImage(currentProduct.image);
      // Get related products (same category or brand, but not the same product)
      const related = products.filter(p => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || p.brand === currentProduct.brand)
      ).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-28 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <p className="text-muted-foreground mb-6">Запрашиваемый товар не существует или был удален</p>
            <Button asChild>
              <Link to="/catalog">Вернуться в каталог</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sample sizes for the product
  const availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
  
  // Sample images (using main image for demo)
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1712&q=80',
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80',
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const addToCart = () => {
    if (!selectedSize) {
      toast.error('Пожалуйста, выберите размер');
      return;
    }
    
    toast.success(`${product.name} добавлен в корзину`);
    // Here you would add the product to the cart
  };
  
  const addToWishlist = () => {
    toast.success(`${product.name} добавлен в избранное`);
    // Here you would add the product to the wishlist
  };

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
                <Link to="/catalog" className="hover:text-foreground transition-colors">
                  Каталог
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <Link 
                  to={`/catalog?category=${product.category}`} 
                  className="hover:text-foreground transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
          
          {/* Product details section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Product images */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={mainImage}
                className="bg-secondary/40 rounded-2xl overflow-hidden aspect-square"
              >
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4"
                />
              </motion.div>
              
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Link 
                    to={`/catalog?brand=${product.brand}`}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {product.brand}
                  </Link>
                  
                  {product.isNew && (
                    <Badge className="bg-primary text-primary-foreground">
                      Новинка
                    </Badge>
                  )}
                  
                  {product.oldPrice && (
                    <Badge variant="destructive">
                      Скидка
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-end space-x-4 mb-6">
                  <span className="text-3xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  
                  {product.oldPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-8">
                  {product.description || 'Кроссовки с инновационной системой амортизации обеспечивают максимальный комфорт при ходьбе и беге. Дышащий верх из качественных материалов, прочная резиновая подошва с отличным сцеплением.'}
                </p>
              </div>
              
              {/* Size selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Размер</h3>
                  <button className="text-sm text-primary hover:underline">
                    Таблица размеров
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center rounded-md border font-medium transition-all ${
                        selectedSize === size 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-background hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity selection */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Количество</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center rounded-md border hover:border-primary transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center rounded-md border hover:border-primary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="sm:flex-1"
                  onClick={addToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Добавить в корзину
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="sm:flex-none"
                  onClick={addToWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="sm:flex-none"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Delivery info */}
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <TruckIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Бесплатная доставка</p>
                    <p className="text-sm text-muted-foreground">При заказе от 5000 ₽</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Гарантия качества</p>
                    <p className="text-sm text-muted-foreground">Только оригинальные товары</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product tabs */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4">
              <h3 className="text-xl font-semibold">О товаре</h3>
              <p>
                {product.description || 'Кроссовки с инновационной системой амортизации обеспечивают максимальный комфорт при ходьбе и беге. Дышащий верх из качественных материалов, прочная резиновая подошва с отличным сцеплением.'}
              </p>
              <p>
                Эта модель сочетает в себе стиль и функциональность. Уникальная технология амортизации делает каждый шаг комфортным, а продуманный дизайн обеспечивает не только привлекательный внешний вид, но и превосходную поддержку стопы.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Верх из дышащих материалов</li>
                <li>Амортизирующая подошва</li>
                <li>Анатомическая стелька</li>
                <li>Усиленная защита пятки</li>
                <li>Противоскользящая подошва</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications" className="space-y-4">
              <h3 className="text-xl font-semibold">Характеристики</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4 py-2 border-b">
                  <span className="text-muted-foreground">Бренд</span>
                  <span>{product.brand}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b">
                  <span className="text-muted-foreground">Модель</span>
                  <span>{product.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b">
                  <span className="text-muted-foreground">Категория</span>
                  <span>{product.category}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b">
                  <span className="text-muted-foreground">Материал верха</span>
                  <span>Текстиль, Синтетическая кожа</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b">
                  <span className="text-muted-foreground">Материал подошвы</span>
                  <span>Резина</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b">
                  <span className="text-muted-foreground">Сезон</span>
                  <span>Весна/Лето</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b">
                  <span className="text-muted-foreground">Страна производства</span>
                  <span>Вьетнам</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="space-y-4">
              <h3 className="text-xl font-semibold">Доставка и оплата</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Способы доставки</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Курьерская доставка по Москве и области</li>
                    <li>Доставка до пунктов выдачи заказов</li>
                    <li>Доставка Почтой России по всей стране</li>
                    <li>Транспортные компании</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Сроки доставки</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Москва: 1-2 дня</li>
                    <li>Санкт-Петербург: 2-3 дня</li>
                    <li>Другие города: 3-7 дней</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Способы оплаты</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Банковской картой онлайн</li>
                    <li>Наличными при получении</li>
                    <li>Банковской картой при получении</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-8">Похожие товары</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard 
                    key={relatedProduct.id} 
                    product={relatedProduct} 
                    index={index} 
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
