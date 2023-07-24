import {
  AiFillEnvironment,
  AiFillPhone,
  AiOutlineFieldTime,
} from "react-icons/ai";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className=" bg-white rounded-lg shadow-md p-4">
      <div className="flex py-1">
        <AiFillEnvironment size={25} className="mx-4" />
        <p className="text-gray-600 mb-2">{restaurant.address}</p>
      </div>
      <div className="flex py-1">
        <AiFillPhone size={25} className="mx-4" />
        <p className="text-gray-600 mb-2">{restaurant.contact}</p>
      </div>
      <div className="flex py-1">
        <AiOutlineFieldTime size={25} className="mx-4" />
        <div>
          <p className="text-gray-600 mb-2">{restaurant.operatingHours}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
