
import { Button } from "@/components/ui/button";
import { Camera, Gift, Zap, Heart } from "lucide-react";

export const ForCreators = () => {
  const benefits = [
    {
      icon: Gift,
      title: "Experiencias gratis",
      description: "Disfruta de los mejores restaurantes sin costo a cambio de contenido"
    },
    {
      icon: Camera,
      title: "Contenido auténtico",
      description: "Crea contenido natural que realmente conecta con tu audiencia"
    },
    {
      icon: Zap,
      title: "Crece tu marca personal",
      description: "Construye tu reputación como foodie e influencer gastronómico"
    },
    {
      icon: Heart,
      title: "Apoya lo local",
      description: "Ayuda a restaurantes dominicanos a crecer mientras disfrutas"
    }
  ];

  return (
    <section id="creadores" className="py-20 bg-gradient-to-br from-mint/5 to-tropical-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-mint/20 to-tropical-400/20 rounded-3xl h-96 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
              <div className="text-center z-10 p-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <Camera className="h-12 w-12 text-mint" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Panel de Creador
                </h3>
                <p className="text-gray-600">
                  Descubre oportunidades y gestiona tus colaboraciones
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Para{" "}
                <span className="bg-gradient-to-r from-mint to-tropical-400 bg-clip-text text-transparent">
                  Creadores
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Convierte tu pasión por la comida en experiencias increíbles y contenido que inspira.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-mint/10 to-tropical-400/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-mint" />
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
                className="bg-gradient-to-r from-mint to-tropical-400 hover:from-tropical-400 hover:to-mint text-white"
              >
                Únete como Creador
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-mint text-mint hover:bg-mint hover:text-white"
              >
                Ver Ejemplos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
