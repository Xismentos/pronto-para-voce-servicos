
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Check, MessageSquare, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { providers } from "@/data/providers";

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<typeof providers[0] | null>(null);

  useEffect(() => {
    const foundProvider = providers.find(p => p.id === id);
    if (foundProvider) {
      setProvider(foundProvider);
    }
  }, [id]);

  if (!provider) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Profissional não encontrado</h2>
            <p className="text-gray-600 mb-4">
              O profissional que você está procurando não existe ou foi removido.
            </p>
            <Link to="/profissionais" className="btn-primary">
              Ver todos os profissionais
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-10">
        <div className="container">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="w-full h-80 object-cover" 
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{provider.name}</h1>
                    
                    <div className="flex items-center mt-2 mb-4">
                      <div className="flex text-yellow-500">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            fill={i < Math.floor(provider.rating) ? "currentColor" : "none"}
                            className={i < Math.floor(provider.rating) ? "" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">
                        {provider.rating.toFixed(1)} ({provider.reviewCount} avaliações)
                      </span>
                      
                      {provider.verified && (
                        <span className="ml-4 bg-blue-50 text-brand-blue px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <Check size={14} className="mr-1" />
                          Verificado
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={18} className="mr-2" />
                      {provider.location}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="btn-outline flex items-center gap-2">
                      <MessageSquare size={18} />
                      Chat
                    </Button>
                    <Button className="btn-outline flex items-center gap-2">
                      <Phone size={18} />
                      Ligar
                    </Button>
                    <Button className="btn-primary flex items-center gap-2">
                      <Calendar size={18} />
                      Agendar
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Serviços oferecidos</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {provider.services.map((service, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2">Sobre</h2>
                  <p className="text-gray-600">
                    {provider.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Avaliações</h2>
            
            <div className="space-y-6">
              {/* Sample reviews - would be dynamic in a real app */}
              <div className="border-b pb-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">Maria Souza</h4>
                    <div className="flex text-yellow-500">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < 5 ? "currentColor" : "none"}
                          className={i < 5 ? "" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">há 2 semanas</span>
                </div>
                <p className="text-gray-600">
                  Excelente profissional! Chegou no horário combinado e resolveu o problema rapidamente. 
                  Muito educado e deixou tudo limpo após o serviço. Recomendo!
                </p>
              </div>
              
              <div className="border-b pb-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">João Pereira</h4>
                    <div className="flex text-yellow-500">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < 4 ? "currentColor" : "none"}
                          className={i < 4 ? "" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">há 1 mês</span>
                </div>
                <p className="text-gray-600">
                  Atendimento muito bom, resolveu o problema do meu chuveiro rapidamente. 
                  O preço foi justo pelo serviço. Só demorou um pouco para chegar, por isso 4 estrelas.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">Carla Santos</h4>
                    <div className="flex text-yellow-500">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < 5 ? "currentColor" : "none"}
                          className={i < 5 ? "" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">há 2 meses</span>
                </div>
                <p className="text-gray-600">
                  Profissional extremamente competente e prestativo. Identificou o problema rapidamente
                  e me explicou tudo que estava fazendo. Preço justo e atendimento excelente.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline">Ver todas as avaliações</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProviderProfile;
