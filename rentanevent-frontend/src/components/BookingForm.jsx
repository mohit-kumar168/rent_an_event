import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
      <h3 className="text-xl font-bold mb-4">Your Booking Details</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" className="w-full p-2 border rounded" />
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="w-full p-2 border rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-Mail" className="w-full p-2 border rounded" />
        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" className="w-full p-2 border rounded" />
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Your Address" className="w-full p-2 border rounded"></textarea>
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">BOOK NOW</button>
          <button type="reset" onClick={() => setFormData({ first_name: "", last_name: "", email: "", contact: "", address: "" })} className="bg-gray-500 text-white px-4 py-2 rounded">RESET</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;