
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

const ServiceListing = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-gray-50 py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Serviços</h1>
            <p className="text-gray-600 mb-6">
              Encontre o serviço que você precisa entre as nossas categorias
            </p>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar serviços..."
                className="input-search pl-10 w-full md:w-1/2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    icon={<span className="text-xl">{service.icon}</span>}
                    description={service.description}
                    link={service.link}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500 text-lg">
                    Nenhum serviço encontrado com "{searchQuery}".
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceListing;
