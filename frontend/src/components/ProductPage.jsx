import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import UserContextProvider from '../context/UserContextProvider';
import UserContext from '../context/UserContext';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
const ProductPage = () => {
  let { code } = useParams();
  let navigation = useNavigate()
  const [data, setData] = useState('');
  const [alldata, setAllData] = useState('');
  const [star, setStar] = useState('');
  const [size, setSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // For large view of the image
  const [mainImage, setMainImage] = useState(''); // For the main image display
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
let {auth} = useContext(UserContext)
  async function getProfile() {
    try {
      let result = await axios.get(`https://actl.co.in/shop/getProductByCode/${code}`);
      if (result) {
        let x = '';
        for (let i = 1; i <= result.data[0].productRating; i++) {
          x += '⭐';
        }
        setStar(x);
        const final = result.data.map(item => {
          if ((typeof item.productImages === 'string') && (typeof item.productSize === 'string')) {
            return { ...item, productImages: JSON.parse(item.productImages), productSize: JSON.parse(item.productSize) };
          }
          return item;
        });
        setData(final[0]);
        setMainImage(`https://actl.co.in/uploads/${final[0].productImages[0]}`); // Set the main image initially
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getProfile();
  }, [code]);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl); // Set the clicked thumbnail as the main image
  };


  async function getAllProfile() {
    try {
      let result = await axios.get('https://actl.co.in/shop/getProduct');
      if(result){
        const final = result.data.map(item => {
          if ((typeof item.productImages === 'string') && (typeof item.productSize === 'string')) {
            return { ...item, productImages: JSON.parse(item.productImages),productSize: JSON.parse(item.productSize)  };
          }   
           return item;
        });
       setAllData(final)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getAllProfile();
  }, []);

 async function addCart(data){
  // if(size){
    if(auth.username){
      let cartdata = {...data, productSize:size, productImages:mainImage}
    let user =  auth.username.email.split('@')[0]+'_simran_cart'
    // console.log(user)
    await axios.post(`https://actl.co.in/shop/cartSave/${user}`,cartdata)
    navigation('/cart')
    }else{
      navigation('/signinsignup')
    }
    // console.log(cartdata)
  // }else{
  //   alert("Please Select Product-Size to AddCart")
  // }
  }

  return (
    <>
    <div className="container mx-auto p-4">
      {/* Main product page wrapper */}
      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Section: Product Image */}
          <div className="lg:col-span-1 flex justify-center lg:block">
            <img
              className="w-full max-w-xs md:max-w-sm lg:max-w-full cursor-pointer"
              src={mainImage}
              alt="Product"
              onClick={() => openImageModal(mainImage)} // Open modal on click of the main image
            />
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {/* Thumbnail images */}
              {data.productImages.map((image, index) => (
                <img
                  key={index}
                  className="w-12 h-12 md:w-16 md:h-16 object-cover border cursor-pointer"
                  src={`https://actl.co.in/uploads/${image}`}
                  alt={`Product Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(`https://actl.co.in/uploads/${image}`)} // Set image as main on click
                />
              ))}
            </div>
          </div>

          {/* Middle Section: Product Information */}
          <div className="lg:col-span-2 space-y-4">
            {/* Product Title */}
            <h1 className="text-xl md:text-2xl font-semibold">{data.productTitle}</h1>

            {/* Product Rating and Reviews */}
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">{star}</span>
              <p className="text-sm md:text-base">({data.productRating} Star Rating)</p>
            </div>

            {/* Product Price */}
            <div className="text-2xl md:text-3xl font-semibold text-red-600">
              ₹{Math.ceil(data.productPrice - (data.productPrice * data.productDiscount) / 100)}{' '}
              <span className="text-gray-500 line-through text-base md:text-lg">₹{data.productPrice}</span>
            </div>
            <p className="text-green-600 font-semibold text-sm md:text-base">
              You save ₹{Math.ceil((data.productPrice * data.productDiscount) / 100)} ({data.productDiscount}%)
            </p>

            {/* Product Description */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <p className="text-gray-700 text-sm md:text-base">{data.productDetail}</p>
            </div>
            {/* <div className='flex text-xl gap-4 items-center'>
            <h3 className="font-semibold mb-2">Product Size:-</h3><br />
                {data.productSize.map((item)=>(
                 <div className='flex items-center gap-2'>
                  <input type="radio" id={item} name='productSize' value={item} onChange={(e)=>setSize(e.target.value)}/>
                  <label htmlFor={item} name='productSize' value={item} onChange={(e)=>setSize(e.target.value)}>{item}</label>
                  </div>
                  ))}
                </div> */}
            {/* Add to Cart / Wishlist */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button onClick={()=>addCart(data)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto">
                Add to Cart
              </button>
              {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto">
                Add to Wishlist
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        'Not Found'
      )}

      {/* Additional Information Section */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Other Product</h2>
      <div className='flex gap-8 flex-wrap justify-center md:justify-start lg:justify-start'>
      {alldata && alldata.map((product) => (
          <Link key={product.id} className="border w-[300px] p-4 rounded-lg" to={`/productpage/${product.productCode}`}>
            <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
         <style>
    {`
      .swiper-button-next, .swiper-button-prev {
        color: gray; /* Your desired color */
      }
      .swiper-button-next::after, .swiper-button-prev::after {
        font-size: 20px; /* Optional: Adjust the arrow size */
      }
    `}
  </style>
        {product.productImages.map(slide => (
          <SwiperSlide key={slide.id}>
            <img
              src={`https://actl.co.in/uploads/${slide}`}
              alt={`Slide ${slide.id}`}
              className="w-full h-72 object-fit"
            />
          </SwiperSlide>
        ))}
      </Swiper>
            <h2 className="text-lg font-semibold">{product.productTitle}</h2>
            <p className="text-red-500">{Math.ceil(product.productPrice -((product.productPrice * product.productDiscount)/100))} Rs.</p>
            <p className="line-through text-gray-400">{product.productPrice} Rs.</p>
          </Link>
        ))}
      </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img src={selectedImage} alt="Large view" className="max-w-full max-h-screen" />
            <button
              className="absolute top-4 right-4 text-white text-xl font-bold"
              onClick={closeModal}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ProductPage;
