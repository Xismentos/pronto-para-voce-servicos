
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (searchQuery) {
      searchParams.append("q", searchQuery);
    }
    
    if (location) {
      searchParams.append("loc", location);
    }
    
    navigate(`/profissionais?${searchParams.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Encontre o profissional certo em segundos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Conectamos você a profissionais qualificados para qualquer serviço que precisar. Rápido, seguro e prático.
          </p>

          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="O que você precisa? (ex: eletricista)"
                  className="input-search pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Onde? (cidade ou bairro)"
                  className="input-search pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button className="btn-green whitespace-nowrap" size="lg" onClick={handleSearch}>
                Buscar
              </Button>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Serviços populares:
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Link to="/profissionais?q=eletricista" className="text-brand-blue hover:underline">Eletricista</Link>
              <span className="text-gray-400">•</span>
              <Link to="/profissionais?q=encanador" className="text-brand-blue hover:underline">Encanador</Link>
              <span className="text-gray-400">•</span>
              <Link to="/profissionais?q=diarista" className="text-brand-blue hover:underline">Diarista</Link>
              <span className="text-gray-400">•</span>
              <Link to="/profissionais?q=pintor" className="text-brand-blue hover:underline">Pintor</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
