
import { Shield, Star, CreditCard } from "lucide-react";

const TrustAndSafetySection = () => {
  return (
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
  );
};

export default TrustAndSafetySection;
