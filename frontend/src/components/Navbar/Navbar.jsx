import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/logoshikha.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaUser, FaHeart, FaBars } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import UserContext from "../../context/UserContext";
import axios from "axios";
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 3,
    name: "Bracelets",
    link: "/#",
  },
  {
    id: 4,
    name: "Earrings",
    link: "/#",
  },
  {
    id: 5,
    name: "Necklace Sets",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Jewellary",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

export default function Navbar({ handleOrderPopup }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggles dropdown visibility
  };

  const [isOpen, setIsOpen] = useState(false); // Hamburger menu toggle

  // Function to toggle hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let navigation = useNavigate()
  let {auth, logout} = useContext(UserContext)
  const [inp, setInp] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState([]);
  async function getCategory() {
    let result = await axios.get('https://actl.co.in/sikha/categoryget')
    setCategory(result.data)
}
useEffect(() => {
    getCategory()
}, [])

useEffect(()=>{
if(inp){
  navigation(`/find/${inp}`)
}
},[inp])
function handlelogout(){
  logout()
  window.location.reload()
}
async function getData(){
  if(auth.username){
    let user = auth.username.email
    let result = await axios.get(`https://actl.co.in/sikha/getOrderByEmail/${user}`)
    setOrder(result.data)
  }
}

useEffect(()=>{
  getData()
},[])
// console.log(category)
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img
                src={Logo}
                alt="Logo"
                className="absolute w-12 top-0 md:bottom-6 md:h-20 md:w-28"
              />
            </a>
          </div>

          {/* Hamburger Icon */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-3xl text-primary dark:text-white"
            >
              <FaBars />
            </button>
          </div>

          {/* Search bar with icons, visible only on larger screens */}
          <div className="hidden sm:flex justify-between items-center gap-4">
            <div className="relative group flex items-center gap-4">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                value={inp}
                onChange={(e)=>setInp(e.target.value)}
              />
              {auth.username ? <div className='flex items-center gap-6'><span className='uppercase text-2xl font-bold flex items-center gap-2'> <FaUser className="text-primary dark:text-white text-2xl cursor-pointer" /> {auth.username.name}</span><button className='p-2 rounded-lg bg-primary text-white font-[600]' onClick={handlelogout}>Logout</button></div> :  <Link to="/signinsignup" className="text-gray-800 hover:text-blue-600">
              Sign In/Sign Up
            </Link>}
             
              {/* <FaHeart className="text-secondary dark:text-red-400 text-2xl cursor-pointer" /> */}
            </div>

            {/* Order button */}
            <Link
            to="/cart"
              // onClick={handleOrderPopup} // Directly call the function
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center py-2">
        <ul className="sm:flex hidden items-center gap-4">
        <Link to='/' className="inline-block px-4 hover:text-primary duration-200">Home</Link>
        {category &&
            category.map((item)=>(
              <Link to={`/view/${item.categoryName}`} className="inline-block px-4 hover:text-primary duration-200">{item.categoryName}</Link>
            ))
        }
        <Link to={`/`} className="inline-block px-4 hover:text-primary duration-200">About</Link>

          {/* {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))} */}

          {/* Simple Dropdown and Links */}
          {/* <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li> */}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } sm:hidden bg-white dark:bg-gray-900 p-4 w-full transition-all duration-300`}
      >
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="search"
            className="w-full rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
          />

          <FaUser className="text-primary dark:text-white text-2xl cursor-pointer" />
          <FaHeart className="text-secondary dark:text-red-400 text-2xl cursor-pointer" />

          <button
            onClick={handleOrderPopup} // Directly call the function
            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
          >
            Order
            <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
          </button>

          <ul className="flex flex-col items-center gap-2">
            {Menu.map((data) => (
              <li key={data.id}>
                <a
                  href={data.link}
                  className="inline-block px-4 hover:text-primary duration-200"
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile dropdown */}
          <li className="relative cursor-pointer">
            <a
              href="#"
              className="flex items-center gap-[2px] py-2"
              onClick={toggleDropdown} // Toggling dropdown on click
            >
              Trending Products
              <span>
                <FaCaretDown
                  className={`transition-all duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`} // Rotates the icon when dropdown is open
                />
              </span>
            </a>

            {/* Conditionally rendering the dropdown */}
            {isDropdownOpen && (
              <div className="absolute w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {DropdownLinks.map((data) => (
                    <li key={data.id}>
                      <a
                        href={data.link}
                        className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      >
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </div>
      </div>
    </div>
  );
}
