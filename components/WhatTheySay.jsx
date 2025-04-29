"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlay } from "react-icons/fa";

const people = [
  {
    name: "Sarah Chen",
    description:
      "The AI-powered token creation feature saved me countless hours of development time. Absolutely revolutionary!",
    img: "https://images.pexels.com/photos/4347368/pexels-photo-4347368.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Marcus Rodriguez",
    description:
      "Real-time analytics helped me identify potential risks in token distribution. A must-have for serious developers.",
    img: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Emma Thompson",
    description:
      "The automated security checks give me peace of mind when launching new tokens on Hedera.",
    img: "https://images.pexels.com/photos/4855373/pexels-photo-4855373.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "David Park",
    description:
      "Smart contract generation is seamless. This platform has transformed how I approach token development.",
    img: "https://images.pexels.com/photos/4484071/pexels-photo-4484071.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Aisha Patel",
    description:
      "The integration with Hedera's network is flawless. Best platform for creating and managing HTS tokens.",
    img: "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function WhatTheySay() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-white text-2xl my-4 md:my-8 font-[family-name:var(--font-caviar-dreams)]">
        What They Are Saying About Us
      </h1>
      <div className="max-w-6xl w-full px-4">
        <Slider {...settings}>
          {people.map((person, index) => (
            <div key={index} className="px-2">
              <div className="rounded-xl bg-white shadow-lg relative">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-40 sm:h-60 object-cover rounded-t-xl"
                />
                <div className="p-4 text-center bg-gradient-to-b from-black to-green-900 text-white rounded-b-xl">
                  <h3 className="font-semibold text-lg">{person.name}</h3>
                  <p className="text-xs mt-2 mb-4">{person.description}</p>
                  <div className="inline-block p-2 bg-white text-green-900 rounded-full">
                    <FaPlay />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
