
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, MapPin, Star } from "lucide-react";

export const ForRestaurants = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumenta tu visibilidad",
      description: "Llega a nuevas audiencias a través de creadores auténticos de tu zona"
    },
    {
      icon: Users,
      title: "Marketing genuino",
      description: "Contenido real y espontáneo que conecta con los dominicanos"
    },
    {
      icon: MapPin,
      title: "Alcance local",
      description: "Conecta con microinfluencers de tu comunidad y alrededores"
    },
    {
      icon: Star,
      title: "Sin costos ocultos",
      description: "Solo intercambia experiencias gastronómicas por contenido de calidad"
    }
  ];

  return (
    <section id="restaurantes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Para{" "}
                <span className="bg-gradient-to-r from-coral to-tropical-500 bg-clip-text text-transparent">
                  Restaurantes
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Haz que tu restaurante sea el próximo trending topic gastronómico en República Dominicana.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-coral/10 to-tropical-500/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-coral to-tropical-500 hover:from-tropical-500 hover:to-coral text-white"
              >
                Registra tu Restaurante
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-coral text-coral hover:bg-coral hover:text-white"
              >
                Ver Demo
              </Button>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-coral/20 to-tropical-500/20 rounded-3xl h-96 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
              <div className="text-center z-10 p-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <TrendingUp className="h-12 w-12 text-coral" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Dashboard de Restaurante
                </h3>
                <p className="text-gray-600">
                  Gestiona todas tus colaboraciones desde un solo lugar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
