
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}

const ServiceCard = ({ title, icon, description, link }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <Link to={link} className="block">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-md text-brand-blue">
              {icon}
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
