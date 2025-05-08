
import { Link } from "react-router-dom";
import { Search, User, Check, Shield, MessageSquare, Star, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-16">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">Como Funciona o ContrateJá</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Conectamos você aos melhores profissionais da sua região de forma rápida, 
              segura e eficiente.
            </p>
          </div>
        </section>

        {/* Steps for Clients */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Para Clientes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div className="feature-card h-full">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Search className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Busque um serviço</h3>
                  <p className="text-gray-600">
                    Digite o que você precisa e sua localização. Nosso sistema encontrará os 
                    melhores profissionais disponíveis na sua região.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div className="feature-card h-full">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <User className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Escolha o profissional</h3>
                  <p className="text-gray-600">
                    Compare perfis, avaliações, preços e disponibilidade. Escolha o profissional 
                    que melhor atende às suas necessidades.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div className="feature-card h-full">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <Check className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Contrate e avalie</h3>
                  <p className="text-gray-600">
                    Agende o serviço, acompanhe a execução e pague com segurança através da plataforma. 
                    Depois, avalie o profissional para ajudar outros usuários.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/cadastro" className="btn-primary">
                Cadastre-se agora
              </Link>
            </div>
          </div>
        </section>

        {/* Steps for Professionals */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Para Profissionais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div className="feature-card h-full">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <User className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Crie seu perfil</h3>
                  <p className="text-gray-600">
                    Cadastre-se na plataforma, complete seu perfil com fotos, descrição dos seus serviços e 
                    área de atendimento.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div className="feature-card h-full">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Receba pedidos</h3>
                  <p className="text-gray-600">
                    Os clientes próximos à sua região entrarão em contato quando precisarem dos seus serviços. 
                    Você recebe notificações em tempo real.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div className="feature-card h-full">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Realize o serviço e receba</h3>
                  <p className="text-gray-600">
                    Após realizar o serviço, o cliente faz o pagamento pela plataforma e você recebe seu dinheiro 
                    de forma segura e rápida.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/cadastro/profissional" className="btn-primary">
                Cadastre-se como profissional
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Por que usar o ContrateJá</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Nosso marketplace de serviços locais oferece vantagens para todos
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Para Clientes</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <Shield className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Segurança</h4>
                      <p className="text-gray-600 text-sm">
                        Todos os profissionais são verificados e avaliados por outros clientes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <Clock className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Economia de tempo</h4>
                      <p className="text-gray-600 text-sm">
                        Encontre profissionais qualificados rapidamente, sem precisar de indicações.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <Star className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Qualidade garantida</h4>
                      <p className="text-gray-600 text-sm">
                        Sistema de avaliações transparente para garantir a qualidade dos serviços.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <CreditCard className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Pagamento seguro</h4>
                      <p className="text-gray-600 text-sm">
                        Pague de forma segura pela plataforma, com garantia de serviço.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Para Profissionais</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <Search className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Mais clientes</h4>
                      <p className="text-gray-600 text-sm">
                        Amplie sua clientela e receba pedidos de serviço constantemente.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <Star className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Reputação online</h4>
                      <p className="text-gray-600 text-sm">
                        Construa sua reputação através de avaliações positivas dos clientes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <Clock className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Gestão de agenda</h4>
                      <p className="text-gray-600 text-sm">
                        Ferramentas para organizar sua agenda e atender mais clientes.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-2 rounded-full mr-4">
                      <CreditCard className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Pagamentos garantidos</h4>
                      <p className="text-gray-600 text-sm">
                        Receba seus pagamentos de forma segura e organizada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Como funciona o pagamento?</h3>
                <p className="text-gray-600">
                  O pagamento é feito através da plataforma após a conclusão do serviço. Aceitamos cartões 
                  de crédito, débito, PIX e transferência bancária. O valor fica retido até a confirmação 
                  de que o serviço foi concluído satisfatoriamente.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">O que acontece se eu não gostar do serviço?</h3>
                <p className="text-gray-600">
                  Caso o serviço não atenda às suas expectativas, você pode abrir uma solicitação de resolução 
                  através da plataforma. Nossa equipe analisará o caso e tomará as medidas necessárias para 
                  garantir uma solução justa.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Como os profissionais são selecionados?</h3>
                <p className="text-gray-600">
                  Todos os profissionais passam por um processo de verificação que inclui validação de documentos, 
                  endereço e, em alguns casos, comprovação de capacidade técnica. Além disso, o sistema de 
                  avaliações ajuda a manter a qualidade dos serviços.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Qual é a taxa cobrada dos profissionais?</h3>
                <p className="text-gray-600">
                  Cobramos uma taxa de comissão sobre cada serviço realizado através da plataforma. Esta taxa 
                  varia de acordo com a categoria do serviço e o plano escolhido pelo profissional. Para mais 
                  detalhes, consulte nossa página de planos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Os profissionais são segurados?</h3>
                <p className="text-gray-600">
                  Oferecemos um seguro básico para todos os serviços contratados através da plataforma, que 
                  cobre possíveis danos causados durante a execução do serviço. Profissionais com planos 
                  Premium têm coberturas adicionais.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/faq" className="btn-secondary">
                Ver todas as perguntas frequentes
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
              <p className="text-xl opacity-90 mb-8">
                Cadastre-se agora e encontre o profissional ideal para o serviço que você precisa.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/cadastro" className="bg-white text-brand-blue font-medium px-6 py-3 rounded-md hover:bg-white/90 transition-colors">
                  Cadastre-se como cliente
                </Link>
                <Link to="/cadastro/profissional" className="bg-transparent border border-white text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
                  Sou um profissional
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

export default HowItWorks;
