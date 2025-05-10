
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Database } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import ProviderInfoForm from "@/components/profile/ProviderInfoForm";
import { uploadAvatar, serviceTypeOptions } from "@/utils/profileHelpers";

type UserRole = Database["public"]["Enums"]["user_role"];

const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [providerDetails, setProviderDetails] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
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
    averagePrice: "",
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
            setAvatarUrl(providerData.profile_picture_url);
            setFormData(prevData => ({
              ...prevData,
              city: providerData.city || "",
              state: providerData.state || "",
              zipCode: providerData.zip_code || "",
              address: providerData.address || "",
              serviceType: providerData.service_type || "",
              description: providerData.description || "",
              averagePrice: providerData.average_price || "",
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Upload avatar if changed
      let profilePictureUrl = avatarUrl;
      if (avatarFile) {
        profilePictureUrl = await uploadAvatar(user.id, avatarFile, avatarUrl);
      }
      
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
              profile_picture_url: profilePictureUrl,
              average_price: formData.averagePrice,
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
              profile_picture_url: profilePictureUrl,
              average_price: formData.averagePrice,
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
            <PersonalInfoForm 
              userData={{
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                avatarUrl
              }}
              isLoading={isLoading}
              onAvatarChange={handleAvatarChange}
              onFormChange={handleChange}
              onSubmit={handleSubmit}
            />
          </TabsContent>
          
          {userDetails?.role === "prestador" && (
            <TabsContent value="provider">
              <ProviderInfoForm 
                providerData={{
                  city: formData.city,
                  state: formData.state,
                  zipCode: formData.zipCode,
                  address: formData.address,
                  serviceType: formData.serviceType,
                  description: formData.description,
                  averagePrice: formData.averagePrice
                }}
                isLoading={isLoading}
                serviceTypeOptions={serviceTypeOptions}
                onFormChange={handleChange}
                onSelectChange={handleSelectChange}
                onSubmit={handleSubmit}
              />
            </TabsContent>
          )}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
