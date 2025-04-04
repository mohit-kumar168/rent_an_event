import React, { useState, useEffect } from "react";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching properties...");

    fetch("http://localhost:3000/rentanevent/property")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched properties:", data);
        setProperties(data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties.");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Property Listings</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {properties.length === 0 ? (
        <p>No properties available</p>
      ) : (
        properties.map((property) => (
          <div
            key={property.uid}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <h3>{property.headline}</h3>
            <p>{property.description}</p>
            <p>
              Location: {property.city}, {property.state}, {property.country}
            </p>
            <p>Price: {property.baseRate} {property.currency}/night</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;
