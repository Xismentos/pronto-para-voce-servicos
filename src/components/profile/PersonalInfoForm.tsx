
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PersonalInfoFormProps {
  userData: {
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string | null;
  };
  isLoading: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PersonalInfoForm = ({ 
  userData, 
  isLoading, 
  onAvatarChange, 
  onFormChange, 
  onSubmit 
}: PersonalInfoFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Atualize seus dados pessoais</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-gray-200">
                {userData.avatarUrl ? (
                  <AvatarImage src={userData.avatarUrl} alt="Foto de perfil" />
                ) : (
                  <AvatarFallback>{userData.fullName?.charAt(0) || "U"}</AvatarFallback>
                )}
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-brand-blue text-white p-1 rounded-full cursor-pointer"
              >
                <span className="sr-only">Atualizar foto</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16v4h4"/>
                  <path d="M20 8V4h-4"/>
                  <path d="m2 12 6-6a2 2 0 0 1 2.82.01C11.47 6.65 13.8 9 14.5 9.8c.4.5.8.4 1.1.1l.9-.9a2 2 0 0 1 2.82.01L20 12"/>
                </svg>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                className="hidden"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={onFormChange}
              placeholder="Seu nome completo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={userData.email}
              disabled
              placeholder="seu@email.com"
            />
            <p className="text-sm text-gray-500">O email não pode ser alterado</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone/WhatsApp</Label>
            <Input
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={onFormChange}
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
  );
};

export default PersonalInfoForm;
