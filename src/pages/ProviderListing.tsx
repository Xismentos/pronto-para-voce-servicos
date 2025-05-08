
import { useState, useEffect } from "react";
import { Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard from "@/components/ProviderCard";
import { providers } from "@/data/providers";

const ProviderListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = location === "" || 
                          provider.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesVerified = !verifiedOnly || provider.verified;
    
    const matchesRating = provider.rating >= minRating;
    
    return matchesSearch && matchesLocation && matchesVerified && matchesRating;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-gray-50 py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Profissionais</h1>
            <p className="text-gray-600 mb-6">
              Encontre profissionais qualificados para o serviço que você precisa
            </p>

            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar serviço ou profissional..."
                    className="input-search pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Localização..."
                    className="input-search pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200" 
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filtros
                </Button>
                <Button className="btn-primary whitespace-nowrap">
                  Buscar
                </Button>
              </div>

              {showFilters && (
                <div className="border-t mt-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={() => setVerifiedOnly(!verifiedOnly)}
                        className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                      />
                      <span>Apenas verificados</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Classificação mínima
                    </label>
                    <select 
                      className="input-search"
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                    >
                      <option value={0}>Todos</option>
                      <option value={3}>3+ estrelas</option>
                      <option value={4}>4+ estrelas</option>
                      <option value={4.5}>4.5+ estrelas</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
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
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500 text-lg">
                    Nenhum profissional corresponde aos critérios de busca.
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

export default ProviderListing;
