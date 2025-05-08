
import { Link } from "react-router-dom";

const ProfessionalCTA = () => {
  return (
    <section className="py-16 bg-brand-blue text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">É um profissional?</h2>
          <p className="text-white/90 text-xl mb-8">
            Cadastre-se na plataforma e comece a receber pedidos de serviços hoje mesmo!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cadastro/profissional" className="bg-white text-brand-blue font-medium px-6 py-3 rounded-md hover:bg-white/90 transition-colors">
              Cadastre-se como profissional
            </Link>
            <Link to="/para-profissionais" className="bg-transparent border border-white text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalCTA;
