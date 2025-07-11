
import { ChefHat, Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contacto" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-coral to-tropical-500 p-2 rounded-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-coral to-mint bg-clip-text text-transparent">
                FoodiesBnB RD
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Conectando el sabor dominicano con la creatividad digital. 
              La primera plataforma gastronómica de República Dominicana.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-coral transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-coral transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-coral transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Plataforma</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-coral transition-colors">Para Restaurantes</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Para Creadores</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">¿Cómo funciona?</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Precios</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-coral transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-coral transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-coral" />
                <span>hola@foodiesbnbrd.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-coral" />
                <span>+1 (809) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-coral" />
                <span>Santo Domingo, RD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FoodiesBnB RD. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Hecho con ❤️ en República Dominicana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
