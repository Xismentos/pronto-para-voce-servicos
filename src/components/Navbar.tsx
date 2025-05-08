
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-blue">ContrateJá</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/servicos" className="text-gray-600 hover:text-brand-blue transition-colors">
            Serviços
          </Link>
          <Link to="/como-funciona" className="text-gray-600 hover:text-brand-blue transition-colors">
            Como Funciona
          </Link>
          <Link to="/para-profissionais" className="text-gray-600 hover:text-brand-blue transition-colors">
            Para Profissionais
          </Link>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/buscar" className="text-gray-600 p-2 rounded-full hover:bg-gray-100">
            <Search size={20} />
          </Link>
          <Link to="/login" className="btn-secondary">Entrar</Link>
          <Link to="/cadastro" className="btn-primary">Cadastre-se</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/buscar" className="text-gray-600 p-2 rounded-full hover:bg-gray-100">
            <Search size={20} />
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 bg-white border-t">
          <div className="flex flex-col gap-4">
            <Link 
              to="/servicos" 
              className="text-gray-600 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              to="/como-funciona" 
              className="text-gray-600 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              to="/para-profissionais" 
              className="text-gray-600 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Para Profissionais
            </Link>
            <div className="flex gap-4 pt-2">
              <Link 
                to="/login" 
                className="btn-secondary flex-1 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link 
                to="/cadastro" 
                className="btn-primary flex-1 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
