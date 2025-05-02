"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

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

const TestimonialCard = ({ person, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut"
    }}
    viewport={{ once: true }}
    className="px-2"
  >
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="rounded-xl bg-white shadow-lg relative overflow-hidden"
    >
      <motion.img
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        src={person.img}
        alt={person.name}
        className="w-full h-40 sm:h-60 object-cover rounded-t-xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="p-4 text-center bg-gradient-to-b from-black to-green-900 text-white rounded-b-xl"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="font-semibold text-lg"
        >
          {person.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-xs mt-2 mb-4"
        >
          {person.description}
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.3 }}
          className="inline-block p-2 bg-white text-green-900 rounded-full"
        >
          <FaPlay />
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
);

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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full min-h-screen flex flex-col items-center justify-center py-12"
    >
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-white text-2xl my-4 md:my-8 font-[family-name:var(--font-caviar-dreams)]"
      >
        What They Are Saying About Us
      </motion.h1>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl w-full px-4"
      >
        <Slider {...settings}>
          {people.map((person, index) => (
            <TestimonialCard key={index} person={person} index={index} />
          ))}
        </Slider>
      </motion.div>
    </motion.div>
  );
}
