import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import defaultHouseImg from "../assets/images/house.png";

function House() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/rentanevent/property")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched properties:", data);
        setProperties(Array.isArray(data) ? data : data.properties || []);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties.");
      });
  }, []);
  
  return (
    <>
      <Nav />
      <div className="bg-blue-50 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Property Listings
          </h2>

          {error && (
            <p className="text-red-500 text-center bg-red-100 p-2 rounded-lg">
              {error}
            </p>
          )}

          {properties.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No properties available</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.uid}
                  className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col justify-between"
                >
                  {/* Default Image */}
                  <img 
                    src={defaultHouseImg} 
                    alt="House" 
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-800">
                      {property.headline}
                    </h3>
                    <p className="text-gray-600 mt-2">{property.description}</p>
                    <p className="text-gray-800 font-medium mt-3">
                      📍 {property.city}, {property.state}, {property.country}
                    </p>
                    <p className="text-gray-700 mt-2">🛏 Sleeps: {property.sleeps}</p>
                    <p className="text-blue-700 font-semibold mt-2">
                      💰 {property.baseRate} {property.currency}/night
                    </p>
                    <p className="text-gray-700 mt-2">
                      📅 Available: 
                      <span className="font-medium text-blue-600">
                        {new Date(property.startDate).toLocaleDateString()}
                      </span> - 
                      <span className="font-medium text-blue-600">
                        {new Date(property.endDate).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  
                  {/* Book Now Button */}
                  <div className="bg-blue-100 p-4 text-center">
                    <button
                      onClick={() => navigate("/booking", { state: property })} // ✅ FIXED
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default House;
