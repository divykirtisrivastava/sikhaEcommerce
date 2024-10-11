import React from "react";

import AOS from "aos";
import "aos/dist/aos.css";

// import Popup from "./components/Popup/Popup";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import TopProducts from "./TopProducts/TopProducts";
import Banner from "./Banner/Banner";
import Subscribe from "./Subscribe/Subscribe";
import Testimonials from "./Testimonials/Testimonials";

export default function Home() {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
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
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Hero  />
      <Products />
      <TopProducts  />
      <Banner />
      <Subscribe />
      
      <Testimonials />
      {/* <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> */}
    </div>
  );
};

