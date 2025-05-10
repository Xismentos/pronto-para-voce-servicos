
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type UserRole = Database["public"]["Enums"]["user_role"];

const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [providerDetails, setProviderDetails] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
    address: "",
    serviceType: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/login");
          return;
        }
        
        setUser(session.user);
        
        // Fetch user metadata
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        
        if (userError && userError.code !== "PGRST116") {
          throw userError;
        }
        
        if (userData) {
          setUserDetails(userData);
          setFormData(prevData => ({
            ...prevData,
            fullName: userData.full_name || "",
            email: userData.email || "",
            phone: userData.phone || "",
          }));
        }
        
        // If user is a provider, fetch provider details
        if (userData?.role === "prestador") {
          const { data: providerData, error: providerError } = await supabase
            .from("service_providers")
            .select("*")
            .eq("user_id", session.user.id)
            .single();
          
          if (providerError && providerError.code !== "PGRST116") {
            throw providerError;
          }
          
          if (providerData) {
            setProviderDetails(providerData);
            setFormData(prevData => ({
              ...prevData,
              city: providerData.city || "",
              state: providerData.state || "",
              zipCode: providerData.zip_code || "",
              address: providerData.address || "",
              serviceType: providerData.service_type || "",
              description: providerData.description || "",
            }));
          }
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast.error("Erro ao carregar os dados do perfil");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Update user details
      const { error: userUpdateError } = await supabase
        .from("users")
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
        })
        .eq("id", user.id);
      
      if (userUpdateError) throw userUpdateError;
      
      // If user is a service provider, update provider details
      if (userDetails?.role === "prestador") {
        // Check if provider record exists
        if (providerDetails) {
          // Update existing record
          const { error: providerUpdateError } = await supabase
            .from("service_providers")
            .update({
              city: formData.city,
              state: formData.state,
              zip_code: formData.zipCode,
              address: formData.address,
              service_type: formData.serviceType,
              description: formData.description,
            })
            .eq("user_id", user.id);
          
          if (providerUpdateError) throw providerUpdateError;
        } else {
          // Create new record
          const { error: providerInsertError } = await supabase
            .from("service_providers")
            .insert({
              user_id: user.id,
              city: formData.city,
              state: formData.state,
              zip_code: formData.zipCode,
              address: formData.address,
              service_type: formData.serviceType,
              description: formData.description,
            });
          
          if (providerInsertError) throw providerInsertError;
        }
      }
      
      toast.success("Perfil atualizado com sucesso!");
      
      // Refresh user details
      const { data: updatedUserData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (updatedUserData) {
        setUserDetails(updatedUserData);
      }
      
      if (userDetails?.role === "prestador") {
        const { data: updatedProviderData } = await supabase
          .from("service_providers")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (updatedProviderData) {
          setProviderDetails(updatedProviderData);
        }
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Erro ao atualizar o perfil");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !userDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container py-10">
          <div className="text-center">Carregando perfil...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container py-10">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
            {userDetails?.role === "prestador" && (
              <TabsTrigger value="provider">Perfil Profissional</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize seus dados pessoais</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      placeholder="seu@email.com"
                    />
                    <p className="text-sm text-gray-500">O email não pode ser alterado</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          {userDetails?.role === "prestador" && (
            <TabsContent value="provider">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil Profissional</CardTitle>
                  <CardDescription>Configure seu perfil como prestador de serviços</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Tipo de Serviço</Label>
                      <Select 
                        name="serviceType" 
                        value={formData.serviceType} 
                        onValueChange={(value) => handleSelectChange("serviceType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="limpeza">Limpeza</SelectItem>
                          <SelectItem value="encanador">Encanador</SelectItem>
                          <SelectItem value="eletricista">Eletricista</SelectItem>
                          <SelectItem value="pintor">Pintor</SelectItem>
                          <SelectItem value="jardineiro">Jardineiro</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Sobre mim</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descreva sua experiência e serviços oferecidos"
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Sua cidade"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Estado"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
