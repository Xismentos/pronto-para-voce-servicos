
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProviderData {
  city: string;
  state: string;
  zipCode: string;
  address: string;
  serviceType: string;
  description: string;
  averagePrice: string;
}

interface ProviderInfoFormProps {
  providerData: ProviderData;
  isLoading: boolean;
  serviceTypeOptions: Array<{ value: string; label: string }>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProviderInfoForm = ({
  providerData,
  isLoading,
  serviceTypeOptions,
  onFormChange,
  onSelectChange,
  onSubmit
}: ProviderInfoFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil Profissional</CardTitle>
        <CardDescription>Configure seu perfil como prestador de serviços</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceType">Área de Atuação</Label>
            <Select 
              name="serviceType" 
              value={providerData.serviceType} 
              onValueChange={(value) => onSelectChange("serviceType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione sua área de atuação" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Sobre mim</Label>
            <Textarea
              id="description"
              name="description"
              value={providerData.description}
              onChange={onFormChange}
              placeholder="Descreva sua experiência e serviços oferecidos"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="averagePrice">Média de valor a ser cobrado</Label>
            <Input
              id="averagePrice"
              name="averagePrice"
              value={providerData.averagePrice}
              onChange={onFormChange}
              placeholder="R$ (média) - Para mais informações chamar no privado"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={providerData.address}
              onChange={onFormChange}
              placeholder="Rua, número, complemento"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                name="city"
                value={providerData.city}
                onChange={onFormChange}
                placeholder="Sua cidade"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                name="state"
                value={providerData.state}
                onChange={onFormChange}
                placeholder="Estado"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={providerData.zipCode}
                onChange={onFormChange}
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
  );
};

export default ProviderInfoForm;
