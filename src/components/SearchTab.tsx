
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Product, products, brands, categories } from '@/assets/data';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchTabProps {
  onClose: () => void;
}

export const SearchTab = ({ onClose }: SearchTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [brandResults, setBrandResults] = useState<typeof brands>([]);
  const [categoryResults, setCategoryResults] = useState<typeof categories>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Filter products, brands, and categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setBrandResults([]);
      setCategoryResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Filter products
    const filteredProducts = products.filter((product) => 
      product.name.toLowerCase().includes(query) || 
      product.brand.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
    setSearchResults(filteredProducts);
    
    // Filter brands
    const filteredBrands = brands.filter((brand) =>
      brand.name.toLowerCase().includes(query)
    );
    setBrandResults(filteredBrands);
    
    // Filter categories
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(query) ||
      category.label.toLowerCase().includes(query)
    );
    setCategoryResults(filteredCategories);
    
  }, [searchQuery]);

  return (
    <div 
      ref={containerRef}
      className="absolute top-full left-0 right-0 bg-white shadow-md z-40 border-t border-gray-100 max-h-[80vh] overflow-hidden"
    >
      <div className="container-custom py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Поиск</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Command className="rounded-lg border">
          <CommandInput
            placeholder="Поиск кроссовок, брендов..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12"
            autoFocus
          />
          <CommandList className="max-h-[50vh] overflow-auto py-2">
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            
            {/* Brands search results */}
            {brandResults.length > 0 && (
              <CommandGroup heading="Бренды">
                {brandResults.map((brand) => (
                  <CommandItem 
                    key={`brand-${brand.id}`} 
                    value={`brand-${brand.id}`}
                    className="cursor-pointer py-3"
                    onSelect={() => {
                      onClose();
                    }}
                  >
                    <Link 
                      to={`/catalog?brand=${brand.name}`} 
                      className="flex items-center w-full"
                      onClick={onClose}
                    >
                      <div className="w-12 h-12 rounded bg-secondary/40 flex-shrink-0 mr-4 overflow-hidden">
                        {brand.image && (
                          <img 
                            src={brand.image} 
                            alt={brand.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{brand.name}</div>
                        <div className="text-sm text-muted-foreground">Бренд</div>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {/* Categories search results */}
            {categoryResults.length > 0 && (
              <CommandGroup heading="Категории">
                {categoryResults.map((category) => (
                  <CommandItem 
                    key={`category-${category.id}`} 
                    value={`category-${category.id}`}
                    className="cursor-pointer py-3"
                    onSelect={() => {
                      onClose();
                    }}
                  >
                    <Link 
                      to={`/catalog?category=${category.name}`} 
                      className="flex items-center w-full"
                      onClick={onClose}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{category.label}</div>
                        <div className="text-sm text-muted-foreground">Категория</div>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {/* Products search results */}
            {searchResults.length > 0 && (
              <CommandGroup heading="Товары">
                {searchResults.map((product) => (
                  <CommandItem 
                    key={product.id} 
                    value={product.id.toString()}
                    className="cursor-pointer py-3"
                    onSelect={() => {
                      onClose();
                    }}
                  >
                    <Link 
                      to={`/product/${product.id}`} 
                      className="flex items-center w-full"
                      onClick={onClose}
                    >
                      <div className="w-12 h-12 rounded bg-secondary/40 flex-shrink-0 mr-4 overflow-hidden">
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{product.brand}</div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm font-medium">
                          {new Intl.NumberFormat('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            maximumFractionDigits: 0,
                          }).format(product.price)}
                        </div>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {searchQuery.trim() !== '' && searchResults.length === 0 && brandResults.length === 0 && categoryResults.length === 0 && (
              <div className="px-2 py-6 text-center">
                <p className="text-muted-foreground">По запросу "{searchQuery}" ничего не найдено.</p>
                <p className="text-sm mt-2">Попробуйте изменить запрос или перейти в <Link to="/catalog" className="text-primary hover:underline" onClick={onClose}>каталог товаров</Link>.</p>
              </div>
            )}
          </CommandList>
        </Command>

        {searchQuery.trim() === '' && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Популярные запросы</h3>
            <div className="flex flex-wrap gap-2">
              {['Nike', 'Adidas', 'Puma', 'New Balance', 'Кроссовки для бега', 'Белые кроссовки', 'Черные кроссовки'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-secondary/50 text-sm hover:bg-secondary transition-colors"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
