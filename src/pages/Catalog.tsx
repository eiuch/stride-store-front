
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories, brands } from '@/assets/data';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, X, ArrowUpDown, Search } from 'lucide-react';

type ProductFilters = {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  searchQuery: string;
};

const Catalog = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    const categoryParam = urlParams.get('category');
    
    if (brandParam) {
      setFilters(prev => ({
        ...prev,
        brand: [brandParam]
      }));
    }
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: [categoryParam]
      }));
    }
  }, []);

  // State for filters and mobile filter visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    category: [],
    brand: [],
    priceRange: [0, 50000],
    searchQuery: '',
  });
  
  // Get min and max prices from products
  const allPrices = products.map(p => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  
  // Sort options
  const [sortOption, setSortOption] = useState('featured');
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }
    
    // Filter by brand
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
      return false;
    }
    
    // Filter by price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) || 
             product.brand.toLowerCase().includes(query) ||
             product.category.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return a.isNew ? -1 : 1;
      default: // featured
        return a.isFeatured ? -1 : b.isFeatured ? 1 : 0;
    }
  });
  
  // Update category filter
  const toggleCategory = (category: string) => {
    setFilters(prev => {
      if (prev.category.includes(category)) {
        return {
          ...prev,
          category: prev.category.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          category: [...prev.category, category]
        };
      }
    });
  };
  
  // Update brand filter
  const toggleBrand = (brand: string) => {
    setFilters(prev => {
      if (prev.brand.includes(brand)) {
        return {
          ...prev,
          brand: prev.brand.filter(b => b !== brand)
        };
      } else {
        return {
          ...prev,
          brand: [...prev.brand, brand]
        };
      }
    });
  };
  
  // Update price range filter
  const handlePriceChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [values[0], values[1]] as [number, number]
    }));
  };
  
  // Update search query
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      priceRange: [minPrice, maxPrice],
      searchQuery: '',
    });
    setSortOption('featured');
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
        <section className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Каталог кроссовок</h1>
            <p className="text-muted-foreground">
              Найдите идеальную пару кроссовок от ведущих мировых брендов
            </p>
          </div>
          
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <Button 
              onClick={toggleFilter} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Фильтры
            </Button>
            
            <div className="flex items-center gap-2">
              <select 
                className="bg-background border rounded-md px-2 py-1 text-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">По популярности</option>
                <option value="price-asc">Сначала дешевые</option>
                <option value="price-desc">Сначала дорогие</option>
                <option value="newest">Новинки</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar - Desktop */}
            <aside className={`w-full md:w-64 lg:w-72 hidden md:block`}>
              <div className="bg-card rounded-lg p-6 sticky top-32 border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Фильтры</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Сбросить все
                  </Button>
                </div>
                
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск..."
                      className="pl-8"
                      value={filters.searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                
                {/* Price range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Цена</h4>
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={500}
                    value={[filters.priceRange[0], filters.priceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Категории</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`} 
                          checked={filters.category.includes(category.name)}
                          onCheckedChange={() => toggleCategory(category.name)}
                        />
                        <Label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Бренды</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand.id}`} 
                          checked={filters.brand.includes(brand.name)}
                          onCheckedChange={() => toggleBrand(brand.name)}
                        />
                        <Label 
                          htmlFor={`brand-${brand.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {brand.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Filters sidebar - Mobile */}
            <div className={`fixed inset-0 bg-background z-40 md:hidden transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="h-full overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Фильтры</h3>
                  <Button variant="ghost" size="icon" onClick={toggleFilter}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Mobile filters content - same as desktop */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск..."
                      className="pl-8"
                      value={filters.searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Цена</h4>
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={500}
                    value={[filters.priceRange[0], filters.priceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Категории</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-category-${category.id}`} 
                          checked={filters.category.includes(category.name)}
                          onCheckedChange={() => toggleCategory(category.name)}
                        />
                        <Label 
                          htmlFor={`mobile-category-${category.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Бренды</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-brand-${brand.id}`} 
                          checked={filters.brand.includes(brand.name)}
                          onCheckedChange={() => toggleBrand(brand.name)}
                        />
                        <Label 
                          htmlFor={`mobile-brand-${brand.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {brand.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <Button onClick={clearFilters} variant="outline" className="flex-1">
                    Сбросить
                  </Button>
                  <Button onClick={toggleFilter} className="flex-1">
                    Применить
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products section */}
            <div className="flex-1">
              {/* Product count and sorting - Desktop */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'товар' : 
                  sortedProducts.length >= 2 && sortedProducts.length <= 4 ? 'товара' : 'товаров'}
                </Badge>
                
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <select 
                    className="bg-background border rounded-md px-2 py-1 text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">По популярности</option>
                    <option value="price-asc">Сначала дешевые</option>
                    <option value="price-desc">Сначала дорогие</option>
                    <option value="newest">Новинки</option>
                  </select>
                </div>
              </div>
              
              {/* Applied filters */}
              {(filters.category.length > 0 || filters.brand.length > 0 || 
                filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice || 
                filters.searchQuery) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {filters.category.map(cat => (
                    <Badge key={cat} variant="secondary" className="px-3 py-1">
                      {categories.find(c => c.name === cat)?.label}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => toggleCategory(cat)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  
                  {filters.brand.map(b => (
                    <Badge key={b} variant="secondary" className="px-3 py-1">
                      {b}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => toggleBrand(b)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  
                  {(filters.priceRange[0] > minPrice || filters.priceRange[1] < maxPrice) && (
                    <Badge variant="secondary" className="px-3 py-1">
                      {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                    </Badge>
                  )}
                  
                  {filters.searchQuery && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Поиск: {filters.searchQuery}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              )}
              
              {/* Product grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
                  <p className="text-muted-foreground mb-6">Попробуйте изменить параметры фильтрации</p>
                  <Button onClick={clearFilters} variant="outline">
                    Сбросить все фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Catalog;
