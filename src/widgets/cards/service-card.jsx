
import { Avatar, Typography, Button } from "@material-tailwind/react";

const ServiceCard = ({ partner }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="p-4">
        <div className="flex justify-center">
          <Avatar
            src={partner.image ? `http://businessboosters.club/public/images/user_images/${partner.image}` : "/img/default-avatar.png"}
            alt={partner.name}
            variant="circular"
            className="h-24 w-24"
          />
        </div>
        <Typography variant="h6" color="blue-gray" className="mt-4 text-center">
          {partner.name}
        </Typography>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outlined" color="blue-gray" size="sm">
            View
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;