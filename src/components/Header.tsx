import { Button } from "@/components/ui/button";
import { ChefHat, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-coral to-tropical-500 p-2 rounded-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
              FoodiesBnB RD
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-coral transition-colors">
              Inicio
            </a>
            <a href="/explore" className="text-gray-700 hover:text-coral transition-colors">
              Explorar
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-coral transition-colors">
              ¿Cómo funciona?
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-coral transition-colors">
              Contacto
            </a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-coral text-coral hover:bg-coral hover:text-white"
              onClick={() => navigate("/auth")}
            >
              Iniciar Sesión
            </Button>
            <Button 
              className="bg-gradient-to-r from-coral to-tropical-500 hover:from-tropical-500 hover:to-coral text-white"
              onClick={() => navigate("/auth")}
            >
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-coral transition-colors">
                Inicio
              </a>
              <a href="/explore" className="text-gray-700 hover:text-coral transition-colors">
                Explorar
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-coral transition-colors">
                ¿Cómo funciona?
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-coral transition-colors">
                Contacto
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  className="border-coral text-coral hover:bg-coral hover:text-white"
                  onClick={() => navigate("/auth")}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  className="bg-gradient-to-r from-coral to-tropical-500 hover:from-tropical-500 hover:to-coral text-white"
                  onClick={() => navigate("/auth")}
                >
                  Registrarse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
