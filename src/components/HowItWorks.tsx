
import { Search, Handshake, Camera } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Explora y Conecta",
      description: "Restaurantes buscan creadores locales. Creadores descubren experiencias gastronómicas únicas.",
      color: "from-coral to-tropical-500"
    },
    {
      icon: Handshake,
      title: "Haz Match",
      description: "Acuerden los términos: tipo de contenido, fechas, y beneficios mutuos.",
      color: "from-mint to-tropical-400"
    },
    {
      icon: Camera,
      title: "Crea y Comparte",
      description: "Disfruta la experiencia gastronómica y comparte contenido auténtico con tu audiencia.",
      color: "from-gold to-tropical-300"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conectamos el sabor dominicano con la creatividad digital en tres simples pasos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
              )}
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-200">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
