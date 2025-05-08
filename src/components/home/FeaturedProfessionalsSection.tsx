
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProviderCard from "@/components/ProviderCard";
import { providers } from "@/data/providers";

const FeaturedProfessionalsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">Profissionais em Destaque</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Conheça alguns dos nossos melhores profissionais com excelentes avaliações e experiência comprovada.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.slice(0, 3).map((provider) => (
            <ProviderCard
              key={provider.id}
              id={provider.id}
              name={provider.name}
              image={provider.image}
              rating={provider.rating}
              reviewCount={provider.reviewCount}
              services={provider.services}
              location={provider.location}
              verified={provider.verified}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/profissionais" className="btn-primary inline-flex items-center">
            Ver mais profissionais
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionalsSection;
