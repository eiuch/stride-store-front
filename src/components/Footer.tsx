
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div>
            <h2 className="text-2xl font-bold tracking-tighter mb-4">
              КРОССЫ<span className="opacity-70">&nbsp;И&nbsp;ТОЧКА</span>
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xs">
              Магазин оригинальной спортивной обуви от ведущих мировых брендов. Качество, стиль и комфорт в каждой паре.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Магазин</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Все кроссовки
                </Link>
              </li>
              <li>
                <Link to="/new" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Новинки
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Скидки
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Бренды
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Помощь</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/delivery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Возврат
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Размерная сетка
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Частые вопросы
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary-foreground/70" />
                <span className="text-primary-foreground/80">Москва, ул. Тверская, 1</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary-foreground/70" />
                <span className="text-primary-foreground/80">+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary-foreground/70" />
                <span className="text-primary-foreground/80">info@crossandpoint.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-primary-foreground/10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/70 text-sm">
            © {currentYear} Кроссы и точка. Все права защищены.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
