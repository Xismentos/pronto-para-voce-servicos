
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard from "@/components/ProviderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const serviceTypeOptions = [
  { value: "", label: "Todos os serviços" },
  { value: "eletricista", label: "Eletricista" },
  { value: "diarista", label: "Diarista" },
  { value: "encanador", label: "Encanador" },
  { value: "ar_condicionado", label: "Ar Condicionado" },
  { value: "pintor", label: "Pintor" },
  { value: "marceneiro", label: "Marceneiro" },
  { value: "chaveiro", label: "Chaveiro" },
  { value: "jardineiro", label: "Jardineiro" },
  { value: "eletrodomesticos", label: "Técnicos de Eletrodomésticos" },
  { value: "piscineiro", label: "Piscineiro" }
];

const ProviderListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("loc") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [serviceType, setServiceType] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("rating_desc");
  
  const [providers, setProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update form fields based on URL parameters when they change
    const query = searchParams.get("q") || "";
    const loc = searchParams.get("loc") || "";
    
    setSearchQuery(query);
    setLocation(loc);
    
    // Set serviceType based on query if it matches a known service type
    const matchingServiceType = serviceTypeOptions.find(option => 
      option.value && query.toLowerCase().includes(option.value.toLowerCase())
    );
    if (matchingServiceType) {
      setServiceType(matchingServiceType.value);
    }
    
    fetchProviders();
  }, [searchParams]);

  const fetchProviders = async () => {
    setIsLoading(true);
    
    try {
      let query = supabase
        .from('service_providers')
        .select(`
          *,
          users:user_id (
            full_name,
            email,
            phone
          )
        `)
        .order('rating', { ascending: sortBy === 'rating_asc' });
      
      // Filter by service type if selected
      if (serviceType) {
        query = query.ilike('service_type', `%${serviceType}%`);
      } else if (searchQuery) {
        // If no specific service type but there's a search query
        query = query.or(`service_type.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      // Filter by location if specified
      if (location) {
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setProviders(data || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    
    if (location) {
      params.set("loc", location);
    }
    
    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    setTimeout(() => {
      fetchProviders();
    }, 100);
  };

  const handleServiceTypeChange = (value: string) => {
    setServiceType(value);
    setSearchQuery(value ? serviceTypeOptions.find(opt => opt.value === value)?.label || value : "");
    
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Profissionais</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input 
                  placeholder="O que você precisa?"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input 
                  placeholder="Onde? (cidade, estado)"
                  className="pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-auto">
                <Select value={serviceType} onValueChange={handleServiceTypeChange}>
                  <SelectTrigger className="min-w-[200px]">
                    <SelectValue placeholder="Filtrar por serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-auto">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="min-w-[200px]">
                    <SelectValue placeholder="Ordernar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating_desc">Melhor avaliação</SelectItem>
                    <SelectItem value="rating_asc">Pior avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p>Carregando profissionais...</p>
            </div>
          ) : providers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  id={provider.id}
                  name={provider.users?.full_name || "Profissional"}
                  image={provider.profile_picture_url || "/placeholder.svg"}
                  rating={provider.rating || 0}
                  reviewCount={provider.review_count || 0}
                  services={[provider.service_type]}
                  location={`${provider.city || ""}, ${provider.state || ""}`}
                  verified={provider.verified || false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Nenhum profissional encontrado</h3>
              <p className="text-gray-500">
                Tente mudar os filtros ou a busca para encontrar mais resultados.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProviderListing;
