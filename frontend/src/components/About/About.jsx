import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AOS from "aos";
import "aos/dist/aos.css";


export default function About() {
    React.useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
      }, []);
  return (
    <>
    <Navbar/>
    <div className="min-h-screen lg:h-[80vh] transition-all duration-700 ease-in-out shadow-lg bg-gradient-to-r from-black via-yellow-800 to-red-950">
      <div className="h-32 flex items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4 hover:text-yellow-300 transition duration-300 ease-in-out"
        >
          Who We Are
        </motion.h2>
      </div>

      {/* Container for the content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        
        {/* Image Section - two images on the left side */}
        <div className="md:w-1/2 flex flex-col space-y-4 md:space-y-8 overflow-hidden">
          <motion.img
            src="https://img.grouponcdn.com/deal/3cNassrMgFWYb39wxt4QvbzDuFxU/3c-1452x871/v1/t600x362.webp"
            alt="Indian Rasoi Dish 1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="rounded-lg shadow-lg w-full h-auto max-h-48 object-cover mx-auto md:mx-0"
          />
          <motion.img
            src="https://c0.wallpaperflare.com/preview/308/461/142/indian-food-indian-kitchen-meal-cooking.jpg"
            alt="Indian Rasoi Dish 2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="rounded-lg shadow-lg w-full h-auto max-h-48 object-cover mx-auto md:mx-0"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Welcome to Indian Rasoi Curry House and Pizzeria
          </motion.h1>

          <div className="space-y-4"> {/* Add space between paragraphs */}
            {[
              "Indian Rasoi Curry House and Pizzeria was founded with a passion for bringing authentic Indian flavors and delicious pizza to the Abbotsford community",
              "Our chefs are dedicated to preparing each dish with the finest ingredients and traditional spices, ensuring a genuine taste of India in every bite. Whether you're craving pizza or traditional Indian cuisine, we have something for everyone!",
              "We also serve Indian favorites such as butter chicken and vegetable biryani, crafted with traditional spices for authentic flavors.",
              "We cater to diverse dietary needs, offering Halal and gluten-free options so everyone can enjoy our meals.",
              "Planning an event? We offer catering services for all occasions!",
            ].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 + index * 0.3 }} // Add staggered delay
                className="text-yellow-200 leading-relaxed mb-4"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </div>

<Footer/>
    
    </>
  );
}
