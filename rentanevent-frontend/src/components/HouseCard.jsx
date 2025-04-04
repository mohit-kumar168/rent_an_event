import React from "react";
import { useNavigate } from "react-router-dom";
import houseImg from "../assets/images/house.png";

const HouseCard = ({ property }) => {
  const navigate = useNavigate();

  if (!property) {
    return <p className="text-red-500">Error: Property data is missing.</p>;
  }

  const handleBooking = () => {
    console.log("Navigating to booking with property:", property); // Debugging
    navigate("/booking", { state: property }); // Ensure correct data is passed
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[420px] flex flex-col">
      {/* Fixed height for image */}
      <img src={houseImg} alt={property.headline} className="w-full h-48 object-cover rounded-t-lg" />
      
      {/* Make text container flexible */}
      <div className="flex flex-col flex-grow mt-2">
        <span className="block font-semibold text-gray-800">{property.headline}</span>
        <span className="block text-sm text-gray-600">📅 Available: {property.startDate} - {property.endDate}</span>
        <span className="block text-sm text-gray-600">📍 {property.city}, {property.state}, {property.country}</span>
      </div>

      {/* Ensure button stays at the bottom */}
      <button
        onClick={handleBooking}
        className="mt-auto w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default HouseCard;
