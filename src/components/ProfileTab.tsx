
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, Settings, ShoppingBag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface ProfileTabProps {
  onClose: () => void;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Некорректный email" }),
  password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Имя должно быть не менее 2 символов" }),
  email: z.string().email({ message: "Некорректный email" }),
  password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
  confirmPassword: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Вы должны согласиться с условиями",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export const ProfileTab = ({ onClose }: ProfileTabProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  
  // Initialize user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserData(parsedUser);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);
  
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

  // Form for login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Form for registration
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  // Submit login form
  const onLoginSubmit = (values: LoginFormValues) => {
    // Mock login - In a real app, this would call an API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: any) => u.email === values.email);
    
    if (user && user.password === values.password) {
      // Login successful
      setIsLoggedIn(true);
      setUserData({ name: user.name, email: user.email });
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
      
      toast.success('Вход выполнен успешно');
    } else {
      // Login failed
      toast.error('Неверный email или пароль');
    }
  };

  // Submit registration form
  const onRegisterSubmit = (values: RegisterFormValues) => {
    // Mock registration - In a real app, this would call an API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (storedUsers.some((u: any) => u.email === values.email)) {
      toast.error('Пользователь с таким email уже существует');
      return;
    }
    
    // Add new user
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    
    // Auto-login after registration
    setIsLoggedIn(true);
    setUserData({ name: values.name, email: values.email });
    localStorage.setItem('user', JSON.stringify({ name: values.name, email: values.email }));
    
    toast.success('Регистрация выполнена успешно');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('user');
    toast.success('Вы вышли из аккаунта');
    onClose();
  };

  // Handle favorites navigation
  const goToFavorites = () => {
    navigate('/favorites');
    onClose();
  };

  const profileMenuItems = [
    { icon: User, label: 'Профиль', path: '#' },
    { icon: ShoppingBag, label: 'Мои заказы', path: '#' },
    { icon: Heart, label: 'Избранное', path: '#', onClick: goToFavorites },
    { icon: Clock, label: 'История просмотров', path: '#' },
    { icon: Settings, label: 'Настройки', path: '#' },
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

        {isLoggedIn ? (
          // Logged-in user view
          <div>
            <div className="flex items-center gap-4 mb-6 p-4 bg-secondary/20 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">{userData?.name}</div>
                <div className="text-sm text-muted-foreground">{userData?.email}</div>
              </div>
            </div>
            
            <div className="space-y-1 mb-6">
              {profileMenuItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  className="flex items-center gap-3 p-2.5 rounded-md hover:bg-secondary transition-colors"
                  onClick={item.onClick ? () => item.onClick?.() : onClose}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <button
                className="flex w-full items-center gap-3 p-2.5 rounded-md hover:bg-secondary transition-colors text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        ) : (
          // Login/register tabs
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            type="email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type="password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="rememberMe"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mr-2"
                          />
                          <label htmlFor="rememberMe" className="text-sm">Запомнить меня</label>
                        </div>
                      )}
                    />
                    <a href="#" className="text-sm text-primary hover:underline">Забыли пароль?</a>
                  </div>
                  
                  <Button type="submit" className="w-full">Войти</Button>
                </form>
              </Form>
              
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
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Иван" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            type="email" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type="password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтвердите пароль</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="••••••••" 
                            type="password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={field.value}
                          onChange={field.onChange}
                          className="mr-2"
                        />
                        <label htmlFor="terms" className="text-sm">
                          Я согласен с <a href="#" className="text-primary hover:underline">условиями</a>
                        </label>
                        <FormMessage />
                      </div>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">Зарегистрироваться</Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};
