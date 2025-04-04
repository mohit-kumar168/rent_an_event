import React from "react";

const HouseDetails = ({ house }) => {
  if (!house || !house.headline) {
    return <p className="text-red-500">No house selected. Please go back and choose a house.</p>;
  }

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h3 className="text-xl font-bold">{house.headline}</h3>
      <p className="text-gray-600">📅 Available: {house.startDate} - {house.endDate}</p>
      <p className="text-gray-600">📍 {house.city}, {house.state}, {house.country}</p>
      <p className="text-gray-600">🛏 Sleeps: {house.sleeps}, Bedrooms: {house.bedrooms}, Bathrooms: {house.bathrooms}</p>
      <p className="text-gray-600">💰 Price: {house.baseRate} {house.currency}/night</p>
      <p className="text-gray-600">🛠 Amenities: {house.amenities}</p>
      <p className="text-gray-600">📜 Description: {house.description}</p>
    </div>
  );
};

export default HouseDetails;
