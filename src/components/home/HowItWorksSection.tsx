
import { Link } from "react-router-dom";
import { ArrowRight, Search, User, Check } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">Como Funciona</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Contratar um profissional nunca foi tão fácil. Conectamos você ao profissional certo em apenas 3 passos.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-brand-blue" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Busque um serviço</h3>
            <p className="text-gray-600">
              Digite o que você precisa e sua localização para encontrar profissionais qualificados perto de você.
            </p>
          </div>
          
          <div className="feature-card text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-brand-blue" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Escolha o profissional</h3>
            <p className="text-gray-600">
              Compare perfis, avaliações e preços. Escolha o profissional que melhor atende às suas necessidades.
            </p>
          </div>
          
          <div className="feature-card text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-brand-blue" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Contrate e avalie</h3>
            <p className="text-gray-600">
              Agende o serviço, pague com segurança e avalie o profissional após a conclusão.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/como-funciona" className="btn-primary inline-flex items-center">
            Saiba mais
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
