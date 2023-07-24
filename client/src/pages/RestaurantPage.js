/* 
import Review1 from "../components/review1.jpg";
import Review2 from "../components/review2.jpg";
*/

/* React Components */
import MenuViewer from "../components/MenuViewer";
import SideMenu from "../components/SideMenu";
import RestaurantCard from "../components/RestaurantCard";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RestaurantPage = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/restaurants/${restaurantId}`)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [backendUrl, restaurantId]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#365b6d] min-h-screen">
      <div>
        <img
          src={restaurant.bannerUrl}
          alt="Restaurant Banner"
          className="w-full "
        />
        <SideMenu />
      </div>

      <h1 className="text-white text-7xl p-10 font-bold">{restaurant.name}</h1>

      <div className="container px-10 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Restaurant Card */}
          <div className="flex-grow">
            <RestaurantCard restaurant={restaurant} />
          </div>
          {/* Menu Viewer */}
          <div className="">
            <MenuViewer menu={restaurant.menuUrl} />
          </div>
        </div>
      </div>

      {/* Reviews */}

      {/*<div className="flex">
        <h3 className="text-4xl my-8 mx-auto font-bold text-decoration-line: underline">
          Reviews
        </h3>
      </div>

      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8">
        <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-white text-black">
          <img
            src={Review1}
            alt="/"
            className="w-40 mx-auto mt-[-3rem] bg-white rounded-lg text-black"
          />
          <h2 className="text-2xl font-bold text-center py-8">Little Jep</h2>
          <p className="text-center text-4xl font-bold">
            Best Ham n Cheese Toasties I've eaten!!
          </p>
          <div className="text-center font-medium">
            <p className="py-2 border-b mx-8  mt-8">
              The crispy seafood basket was too spicy for me...
            </p>
            <p className="py-2 border-b mx-8 ">
              My dad's pesto pasta was so good!
            </p>
            <p className="py-2 border-b mx-8 ">I love the hot chocolate :D</p>
          </div>
        </div>

        <div className="w-full shadow-xl bg-white text-black flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            src={Review2}
            alt="/"
            className="w-40 mx-auto mt-[-3rem] bg-transparent rounded-lg"
          />
          <h2 className="text-2xl font-bold text-center py-8">Jefferson</h2>
          <p className="text-center text-4xl font-bold">
            The carbonara here is great!
          </p>
          <div className="text-center font-medium">
            <p className="py-2 border-b mx-8  mt-8">
              Would definitely reccomend the crab mee goreng as well
            </p>
            <p className="py-2 border-b mx-8 ">
              The honey lemon soothers are worth a try too!
            </p>
            <p className="py-2 mx-8 ">
              However, one of the staff was really impatient and we did not have
              the best service...
            </p>
          </div>
        </div>
  </div>*/}
    </div>
  );
};

export default RestaurantPage;
