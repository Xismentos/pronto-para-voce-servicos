
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-brand-blue">ContrateJá</span>
            </div>
            <p className="text-gray-600 mb-4">
              Conectamos profissionais qualificados aos clientes que precisam de serviços com rapidez e segurança.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-blue hover:text-brand-blue/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-brand-blue hover:text-brand-blue/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-brand-blue hover:text-brand-blue/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Para Clientes</h3>
            <ul className="space-y-2">
              <li><Link to="/servicos" className="text-gray-600 hover:text-brand-blue">Encontrar Serviços</Link></li>
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-brand-blue">Como Funciona</Link></li>
              <li><Link to="/seguranca" className="text-gray-600 hover:text-brand-blue">Segurança</Link></li>
              <li><Link to="/pagamentos" className="text-gray-600 hover:text-brand-blue">Pagamentos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Para Profissionais</h3>
            <ul className="space-y-2">
              <li><Link to="/para-profissionais" className="text-gray-600 hover:text-brand-blue">Por que se cadastrar</Link></li>
              <li><Link to="/planos" className="text-gray-600 hover:text-brand-blue">Nossos Planos</Link></li>
              <li><Link to="/sucesso" className="text-gray-600 hover:text-brand-blue">Histórias de Sucesso</Link></li>
              <li><Link to="/recursos" className="text-gray-600 hover:text-brand-blue">Recursos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li><Link to="/quem-somos" className="text-gray-600 hover:text-brand-blue">Quem Somos</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-brand-blue">Blog</Link></li>
              <li><Link to="/contato" className="text-gray-600 hover:text-brand-blue">Contato</Link></li>
              <li><Link to="/termos" className="text-gray-600 hover:text-brand-blue">Termos de Uso</Link></li>
              <li><Link to="/privacidade" className="text-gray-600 hover:text-brand-blue">Privacidade</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} ContrateJá. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
