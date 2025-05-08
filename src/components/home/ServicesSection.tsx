
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              icon={<span className="text-xl">{service.icon}</span>}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/servicos" className="btn-primary inline-flex items-center">
            Ver todos os serviços
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
