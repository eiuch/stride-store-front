
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, Settings, ShoppingBag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileTabProps {
  onClose: () => void;
}

export const ProfileTab = ({ onClose }: ProfileTabProps) => {
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

  const profileMenuItems = [
    { icon: User, label: 'Профиль', path: '#' },
    { icon: ShoppingBag, label: 'Мои заказы', path: '#' },
    { icon: Heart, label: 'Избранное', path: '#' },
    { icon: Clock, label: 'История просмотров', path: '#' },
    { icon: Settings, label: 'Настройки', path: '#' },
    { icon: LogOut, label: 'Выйти', path: '#' },
  ];

  return (
    <div 
      ref={containerRef}
      className="absolute top-full right-0 w-full md:w-[400px] bg-white shadow-md z-40 border-t border-gray-100 max-h-[80vh] overflow-auto"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Личный кабинет</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Пароль</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="mr-2"
                  />
                  <label htmlFor="remember" className="text-sm">Запомнить меня</label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">Забыли пароль?</a>
              </div>
              <Button className="w-full">Войти</Button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium mb-3">Быстрый вход</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Google
                </Button>
                <Button variant="outline" className="flex-1">
                  VK
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="register-name" className="text-sm font-medium">Имя</label>
                <input
                  id="register-name"
                  type="text"
                  placeholder="Иван"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="register-email" className="text-sm font-medium">Email</label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="register-password" className="text-sm font-medium">Пароль</label>
                <input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Подтвердите пароль</label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm">Я согласен с <a href="#" className="text-primary hover:underline">условиями</a></label>
              </div>
              <Button className="w-full">Зарегистрироваться</Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-4">Меню пользователя</h3>
          <div className="space-y-1">
            {profileMenuItems.map((item, index) => (
              <Link 
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors",
                  item.label === 'Выйти' && "text-destructive hover:text-destructive"
                )}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
