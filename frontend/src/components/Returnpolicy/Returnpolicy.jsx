import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import AOS from "aos";
import "aos/dist/aos.css";

export default function Returnpolicy() {
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
    <div>
      <>
      <Navbar/>
      <div className="bg-gray-50 text-gray-800 p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-center transition-transform transform hover:scale-105">
          RETURN & CANCELLATION POLICY
        </h1>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          At Alankaar The Art of Beads (alankaararts.com), we want you to be completely satisfied with your purchase. We understand that sometimes items may need to be returned or exchanged, and we're here to help make that process as easy as possible.
        </p>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          We assure our customers that we thoroughly check the quality of our products at the time of shipping and also confirm safe packing for and damage-free shipping, yet if you receive any damaged goods, or if you receive an incorrect product, or if you're simply not satisfied with what you've received, we would be happy to give you the following alternatives:
        </p>
        <ul className="list-disc list-inside mb-4 text-lg lg:text-xl transition-opacity duration-300 hover:opacity-80">
          <li>Exchange the goods for an alternative of your choice of equal value.</li>
          <li>Give you a full refund for the price you paid for the goods.</li>
        </ul>
        
        <h2 className="text-2xl lg:text-4xl font-bold mb-4 mt-6">Refund/Replacement Guarantee</h2>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          All products sold at alankaararts.com are covered under our 7 Day Refund/Replacement Guarantee. To be eligible for a return, your item must be unused and in the same condition that you received it with price tags. It must also be in the original packaging. Please note that Gift cards and Jewelry items purchased during sale or under any other offer are totally Non-returnable items.
        </p>
        
        <h3 className="text-lg lg:text-xl font-bold mb-2">For replacing a defective/unused item:</h3>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          Send us a mail at <a href="mailto:shikha.b79@gmail.com" className="text-blue-500 underline">shikha.b79@gmail.com</a>, within 7 days from the date of delivery. Do attach the original receipt as a proof of purchase. We believe in you; however, it is mandatory to make a video of unboxing your order and send us along with your return/replacement request.
        </p>
        
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          For faster replacement, we recommend you to send us a return request with the reason for return instead of a replacement request. We will process your return request, and in the meantime, you can place a new order for the item you want.
        </p>
        
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          The defective/unused product will be recalled, and a replacement will be shipped immediately if available. Return charges are payable by us for domestic (India) shipments and by the customer for international shipments.
        </p>
        
        <h3 className="text-lg lg:text-xl font-bold mb-2">Return Delivery Address:</h3>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          Flat No. 401, 4th Floor, JC Heights 7,<br />
          Plot No. 16-17, Hanuman Vatika 1,<br />
          Heerapura, Nr KD Tower, 200Ft Bypass, Ajmer Road,<br />
          Jaipur, 302021, Rajasthan<br />
          Contact: 9712982168.
        </p>
        
        <h2 className="text-2xl lg:text-4xl font-bold mb-4 mt-6">REFUND:</h2>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          If you are unhappy with your purchase and want a refund/replacement please write us at <a href="mailto:shikha.b79@gmail.com" className="text-blue-500 underline">shikha.b79@gmail.com</a> and Alankaar The Art Of Beads will process your refund within 7 days of receiving the products back at our warehouse. If the item you received is broken or faulty, it is mandatory to send us a picture and a video of unboxing the same product via email communication. We will do our best to process refund requests within 7 working days.
        </p>
        
        <h2 className="text-2xl lg:text-4xl font-bold mb-4 mt-6">SHIPPING CHARGES FOR RETURNS:</h2>
        <h3 className="text-lg lg:text-xl font-bold mb-2">Local Return:</h3>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          If the return location of the shipment is India, Alankaar The Art Of Beads will pay the return shipping.
        </p>
        <h3 className="text-lg lg:text-xl font-bold mb-2">International Return:</h3>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          If the return location of the shipment is outside India, Alankaar The Art Of Beads will not be paying the return shipping charges. We can offer refunds/replacements once products are received back in our warehouse. We strongly recommend that you should choose carefully before making an international order as returns may not be very cost-effective.
        </p>
        
        <h2 className="text-2xl lg:text-4xl font-bold mb-4 mt-6">CANCELLATION:</h2>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          Send us a mail within 24 hours (time taken by us to fulfill your order) of placing your order stating that you are cancelling your order. We will refund your entire amount within 48 hours of cancellation.
        </p>
        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          In case you mail us after 24 hours, then it will be considered as a Return and will be treated under Return and Refund policy.
        </p>

        <p className="text-lg lg:text-xl mb-4 transition-opacity duration-300 hover:opacity-80">
          For more queries on Return, refund, replacement, and cancellation, just drop us a mail at <a href="mailto:shikha.b79@gmail.com" className="text-blue-500 underline">shikha.b79@gmail.com</a>. We would be more than happy to help you in the best possible way.
        </p>
      </div>
    </div>
      <Footer/>
      </>
    </div>
  )
}
