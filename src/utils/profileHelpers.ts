
import { supabase } from "@/integrations/supabase/client";

export const uploadAvatar = async (userId: string, avatarFile: File | null, currentAvatarUrl: string | null): Promise<string | null> => {
  if (!avatarFile) return currentAvatarUrl;
  
  try {
    // Create a unique file path
    const filePath = `${userId}/${Date.now()}-${avatarFile.name}`;
    
    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile);
    
    if (uploadError) throw uploadError;
    
    // Get the public URL
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

export const serviceTypeOptions = [
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
