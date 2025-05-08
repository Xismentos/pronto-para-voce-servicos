
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard from "@/components/ProviderCard";
import { supabase } from "@/integrations/supabase/client";

const ServiceDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Find the title based on the service ID from the URL
  const getServiceTitle = () => {
    // Convert URL path (e.g., "eletricistas") to display title (e.g., "Eletricistas")
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  };

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        // Here we would fetch providers that offer this service category
        // For now, we'll use mock data until we implement provider profiles
        
        // In a real implementation, we would query service_providers where service_type matches category
        const { data, error } = await supabase
          .from('service_providers')
          .select('*')
          .eq('service_type', category);
          
        if (error) throw error;
        
        // If we have data, use it; otherwise use an empty array
        setProviders(data || []);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [category]);

  const filteredProviders = providers.filter(provider => {
    // This is a placeholder until we have real provider data
    // We would filter by name, description, etc.
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-gray-50 py-10">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">{getServiceTitle()}</h1>
            <p className="text-gray-600 mb-6">
              Encontre profissionais qualificados para {getServiceTitle().toLowerCase()}
            </p>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar profissionais..."
                className="input-search pl-10 w-full md:w-1/2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : providers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    id={provider.id}
                    name={provider.user_id || "Nome do Profissional"}
                    image="https://source.unsplash.com/random/300x200/?worker"
                    rating={provider.rating || 4.5}
                    reviewCount={10}
                    services={[provider.service_type || category]}
                    location={provider.city || "Localização não especificada"}
                    verified={provider.verified || false}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">
                  Não encontramos profissionais na categoria {getServiceTitle().toLowerCase()}.
                </p>
                <p className="text-gray-400 mt-2">
                  Tente buscar em outra categoria ou volte mais tarde.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
