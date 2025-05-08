
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight, Check, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ProviderCard from "@/components/ProviderCard";
import { services } from "@/data/services";
import { providers } from "@/data/providers";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
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
                    />
                  </div>
                  <Button className="btn-green whitespace-nowrap" size="lg">
                    Buscar
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Serviços populares:
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <Link to="/servicos/eletricistas" className="text-brand-blue hover:underline">Eletricista</Link>
                  <span className="text-gray-400">•</span>
                  <Link to="/servicos/encanadores" className="text-brand-blue hover:underline">Encanador</Link>
                  <span className="text-gray-400">•</span>
                  <Link to="/servicos/diaristas" className="text-brand-blue hover:underline">Diarista</Link>
                  <span className="text-gray-400">•</span>
                  <Link to="/servicos/pintores" className="text-brand-blue hover:underline">Pintor</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
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

        {/* How It Works Section */}
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

        {/* Featured Professionals */}
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

        {/* Trust and Safety */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Segurança e Confiança</h2>
              <p className="text-gray-600 mb-10">
                Todos os profissionais da nossa plataforma passam por um rigoroso processo de verificação para garantir a sua segurança.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Profissionais verificados</h3>
                  <p className="text-gray-600 text-sm">
                    Verificamos a identidade e os documentos de todos os profissionais cadastrados.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Avaliações transparentes</h3>
                  <p className="text-gray-600 text-sm">
                    Todas as avaliações são de clientes reais que contrataram os serviços.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Pagamento seguro</h3>
                  <p className="text-gray-600 text-sm">
                    Pagamentos protegidos e liberados somente após a aprovação do serviço.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Professionals */}
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
      </main>

      <Footer />
    </div>
  );
};

export default Index;

// Import for CreditCard icon
import { CreditCard } from "lucide-react";
