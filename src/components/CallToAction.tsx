
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-coral/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-mint/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-white">
              ¡Comienza tu viaje gastronómico hoy!
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            ¿Listo para conectar con
            <br />
            <span className="bg-gradient-to-r from-coral to-gold bg-clip-text text-transparent">
              la comunidad foodie
            </span>
            <br />
            dominicana?
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Únete a la revolución gastronómica que está transformando cómo los restaurantes 
            y creadores colaboran en República Dominicana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-coral to-tropical-500 hover:from-tropical-500 hover:to-coral text-white text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Empezar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 h-auto transition-all duration-300"
            >
              Agendar Demo
            </Button>
          </div>

          <div className="mt-12 text-sm text-gray-400">
            <p>Gratis para empezar • Sin comisiones ocultas • Soporte en español</p>
          </div>
        </div>
      </div>
    </section>
  );
};
