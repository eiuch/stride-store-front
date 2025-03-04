
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="container-custom py-20 md:py-32">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-9xl font-bold text-primary/10">404</h1>
            <h2 className="text-3xl font-bold mt-6 mb-4">Страница не найдена</h2>
            <p className="text-muted-foreground mb-8">
              Извините, страница, которую вы ищете, не существует или была перемещена.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться на главную
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
