
export const Stats = () => {
  const stats = [
    {
      number: "50+",
      label: "Restaurantes Conectados",
      description: "En Santo Domingo, Santiago y más"
    },
    {
      number: "200+",
      label: "Creadores Activos", 
      description: "Microinfluencers dominicanos"
    },
    {
      number: "500+",
      label: "Colaboraciones Exitosas",
      description: "Experiencias gastronómicas auténticas"
    },
    {
      number: "95%",
      label: "Satisfacción",
      description: "De restaurantes y creadores"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-coral to-tropical-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Impacto Real en República Dominicana
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Números que hablan por sí solos
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg md:text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-white/80">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
