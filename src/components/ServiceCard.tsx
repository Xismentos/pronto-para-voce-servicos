
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon,
  description,
  link,
}) => {
  return (
    <Link to={link} className="service-card block">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-md text-brand-blue">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
};

export default ServiceCard;
