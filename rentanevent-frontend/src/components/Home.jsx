import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav.jsx";
import SliderComponent from "./SliderComponent.jsx";
import Footer from "./Footer.jsx";
import houseImg from "../assets/images/house.png";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/rentanevent/property")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setProperties(Array.isArray(data) ? data : data.properties || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load properties.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Nav />
      <div>{typeof SliderComponent === "function" ? <SliderComponent /> : <p className="text-red-500">Slider failed to load.</p>}</div>

      <main className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Recently Added</h3>

        {loading && <p>Loading properties...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p className="text-gray-600 text-center">No properties available</p>
          ) : (
            properties.map((house) => (
              <div
                key={house.uid}
                className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col justify-between"
              >
                <img src={houseImg} alt="House" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800">{house.headline}</h3>
                  <p className="text-gray-600 mt-2">{house.description}</p>
                  <p className="text-gray-800 font-medium mt-3">📍 {house.city}, {house.state}, {house.country}</p>
                  <p className="text-gray-700 mt-2">🛏 Sleeps: {house.sleeps}</p>
                  <p className="text-blue-700 font-semibold mt-2">💰 {house.baseRate} {house.currency}/night</p>
                  <p className="text-gray-700 mt-2">📅 Available: {house.startDate} - {house.endDate}</p>
                </div>
                <div className="bg-blue-100 p-4 text-center">
                  <button
                    onClick={() => {
                      console.log("Navigating with property:", house); // ✅ Debugging
                      navigate("/booking", { state: house }); // ✅ Pass house correctly
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
