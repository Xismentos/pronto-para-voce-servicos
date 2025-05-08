
import { Link } from "react-router-dom";
import { Star, MapPin, Check } from "lucide-react";

interface ProviderCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  services: string[];
  location: string;
  verified: boolean;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  name,
  image,
  rating,
  reviewCount,
  services,
  location,
  verified,
}) => {
  return (
    <Link to={`/prestador/${id}`} className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover" 
        />
        {verified && (
          <div className="absolute top-2 right-2 bg-white/90 text-brand-blue px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Check size={14} className="mr-1" />
            Verificado
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        
        <div className="flex items-center gap-1 my-2">
          <div className="flex text-yellow-500">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                className={i < Math.floor(rating) ? "" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            {rating.toFixed(1)} ({reviewCount})
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          {location}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {services.slice(0, 3).map((service, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
              +{services.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProviderCard;
