
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchUser();

    // Set up listener for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

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
          <Link to="/profissionais" className="text-gray-600 hover:text-brand-blue transition-colors">
            Profissionais
          </Link>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/buscar" className="text-gray-600 p-2 rounded-full hover:bg-gray-100">
            <Search size={20} />
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/perfil" className="flex items-center gap-2 text-gray-600 hover:text-brand-blue">
                <User size={20} />
                <span>Meu Perfil</span>
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="flex items-center gap-2"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">Entrar</Link>
              <Link to="/cadastro" className="btn-primary">Cadastre-se</Link>
            </>
          )}
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
              to="/profissionais" 
              className="text-gray-600 hover:text-brand-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profissionais
            </Link>
            
            {user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link 
                  to="/perfil" 
                  className="flex items-center gap-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Meu Perfil</span>
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="flex items-center gap-2 py-2"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
