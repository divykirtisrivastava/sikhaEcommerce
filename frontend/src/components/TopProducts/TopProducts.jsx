import React, { useEffect, useState } from "react";
import Img1 from "../../assets/shirt/myfot2.jfif";
import Img2 from "../../assets/shirt/myfoto.jfif";
import Img3 from "../../assets/shirt/myfoto2.jfif";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Necklace Sets",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Img2,
    title: "Earrings",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Img3,
    title: "Bracelets",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
export default function TopProducts({handleOrderPopup}){
  const [subcategory, setsubCategory] = useState([]);
  async function getsubCategory() {
    let result = await axios.get('https://actl.co.in/shop/subcategoryget')
    setsubCategory(result.data)
    // console.log(result)
}

useEffect(() => {
    getsubCategory()
}, [])
console.log(subcategory)
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-24 flex flex-col justify-center items-center">
  <p data-aos="fade-up" className="text-sm text-primary">
  ELEVATE YOUR STYLE WITH OUR VERSATILE COLLECYION
  </p>
  <h1 data-aos="fade-up" className="text-3xl font-bold">
  
  Shop via Category
  </h1>
</div>

        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
  {subcategory.map((data, index) => (
    <div
      data-aos="zoom-in"
      className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-[300px]"
      key={data.id}
    >
      {/* image section */}
      <div className="h-[100px]">
        <img
          src={`https://actl.co.in/uploads/${data.subcategoryImage}`}
          alt=""
          className={`block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md rounded-md w-[120px] h-[150px]`}
        />
      </div>
      {/* details section */}
      <div className="p-4 text-center flex flex-col gap-1">
        {/* star rating */}
        <div className="w-full flex items-center justify-center gap-2">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
        </div>
        <h1 className="text-xl font-bold">{data.subcategoryName}</h1>
        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
          {data.description}
        </p>
        <a
        href={`/view/${data.categoryName}`}
          className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full group-hover:bg-white group-hover:text-primary"
          onClick={handleOrderPopup}
        >
          Order Now
        </a>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};


