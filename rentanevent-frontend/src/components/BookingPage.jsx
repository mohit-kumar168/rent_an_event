import { useLocation } from "react-router-dom";
import BookingForm from "./BookingForm";
import Nav from "./Nav";

const BookingPage = () => {
  const location = useLocation();
  const property = location.state;

  console.log("Received property:", property);

  if (!property) {
    return (
      <p className="text-red-500 text-center">
        ❌ Error: No property details found. Please select a property.
      </p>
    );
  }

  return (
    <>
    <Nav />
    <div className="p-5 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-blue-600">{property.headline}</h2>
      <p>📅 Available: {new Date(property.startDate).toLocaleDateString()} - {new Date(property.endDate).toLocaleDateString()}</p>
      <p>📍 {property.city}, {property.state}, {property.country}</p>
      <p>💰 Price: {property.baseRate} {property.currency}/night</p>

      {/* Include the Booking Form */}
      <BookingForm />
    </div>
    </>
  );
};

export default BookingPage;
