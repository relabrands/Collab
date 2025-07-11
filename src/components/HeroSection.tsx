
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-tropical-50 via-white to-mint/10 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-coral/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-mint/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-coral/20 rounded-full px-4 py-2 mb-8">
            <MapPin className="h-4 w-4 text-coral" />
            <span className="text-sm font-medium text-gray-700">
              Conectando República Dominicana 🇩🇴
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Conecta tu{" "}
            <span className="bg-gradient-to-r from-coral to-tropical-500 bg-clip-text text-transparent">
              restaurante
            </span>
            <br />
            con{" "}
            <span className="bg-gradient-to-r from-mint to-tropical-400 bg-clip-text text-transparent">
              creadores locales
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            La primera plataforma dominicana que conecta restaurantes con microinfluencers 
            para colaboraciones gastronómicas auténticas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-coral to-tropical-500 hover:from-tropical-500 hover:to-coral text-white text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              Soy Restaurante
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-mint text-mint hover:bg-mint hover:text-white text-lg px-8 py-4 h-auto transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              Soy Creador de Contenido
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-coral to-tropical-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint to-tropical-400"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gold to-tropical-300"></div>
              </div>
              <span>50+ restaurantes conectados</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-gold fill-current" />
              <Star className="h-4 w-4 text-gold fill-current" />
              <Star className="h-4 w-4 text-gold fill-current" />
              <Star className="h-4 w-4 text-gold fill-current" />
              <Star className="h-4 w-4 text-gold fill-current" />
              <span>Experiencias auténticas garantizadas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
