// src/components/SliderComponent.jsx
import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import house1 from '../assets/images/house.png';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autocompleteSpeed: 3000,
  };

  const slides = [
    { src: house1, alt: 'House Rental System', title: 'House Rental' },
    { src: house1, alt: 'Luxury Houses for Rent', title: 'Luxury Houses for Rent' },
    { src: house1, alt: 'Rent Houses at Affordable Price', title: 'Rent Houses at Affordable Price' },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <img src={slide.src} alt={slide.alt} className="w-full h-96 object-cover rounded-lg" />
              <p className="text-center text-xl font-semibold mt-2">{slide.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderComponent;