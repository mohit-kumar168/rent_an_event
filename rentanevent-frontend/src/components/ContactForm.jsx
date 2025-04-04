import React, { useState } from "react";

const ContactForm = () => {
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
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input 
              type="text" 
              name="first_name" 
              value={formData.first_name} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input 
              type="text" 
              name="last_name" 
              value={formData.last_name} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div>
            <label className="block text-gray-700">E-Mail</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div>
            <label className="block text-gray-700">Contact No.</label>
            <input 
              type="tel" 
              name="contact" 
              value={formData.contact} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div>
            <label className="block text-gray-700">Address</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >SEND</button>
            <button 
              type="reset" 
              onClick={() => setFormData({ first_name: "", last_name: "", email: "", contact: "", address: "" })} 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >RESET</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default ContactForm;