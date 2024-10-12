import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

export default function Checkout() {
    let {auth} = useContext(UserContext)
    const [cartData, setCartData] = useState([])
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    let email = auth.username.email
    const [paymentMethod, setPaymentMethod] = useState('Online Method')
    let navigate = useNavigate()
    // Load cart data from localStorage
    useEffect(() => {
        const storedCartData = JSON.parse(localStorage.getItem('cartData'))
        if (storedCartData) {
            setCartData(storedCartData)
        }
    }, [])

    const handleSubmit = async () => {

        // Create order object
        const orderData = {
            items: cartData,
            customerDetails: {
                address,
                phone,
                email,
                paymentMethod
            },
            totalPrice: cartData.reduce((total, item) => total + item.totalPrice, 0)
        }
// console.log(orderData)
        try {
            // Post order data to backend
            const response = await axios.post('https://actl.co.in/sikha/createOrder', orderData)
            console.log('Order created:', response.data)

            // Clear cart after order is placed
            localStorage.removeItem('cartData')

            // Redirect to order success page or display success message
            navigate('/order-success')
        } catch (error) {
            console.error('Error creating order:', error)
            // Handle error (e.g., show an error message)
        }
    }

    const handlePayment = async (event) => {
        const amount = cartData.reduce((total, item) => total + item.totalPrice, 0)+100;
        const currency = 'INR';
        const receiptId = '1234567890';
    
        const response = await fetch('https://actl.co.in/sikha/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount,
            currency,
            receipt: receiptId
          })
        })
    
          const order = await response.json();
          console.log('order', order);
    
    
          var option = {
            key:"rzp_test_GJHHBFZE4O8Ub6",
            amount,
            currency,
            name:"Techxpert",
            description: "Test Transaction",
            image:"https://i.ibb.co/5Y3m33n/test.png",
            order_id:order.id,
            handler: async function(response) {
              
              const body = {...response,}
    
              const validateResponse = await fetch('https://actl.co.in/sikha/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
    
              })
    
              const jsonResponse = await validateResponse.json();
              
              console.log('jsonResponse', jsonResponse);
              if(jsonResponse == true){
                await handleSubmit()
                navigate('/payment_seccess')
              }else{
                alert("Payement Rejected")
              }
              
            },
            prefill: {
              name: "Techxpert", 
              email: "Techxpert@example.com",
              contact: "9000000000", 
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          }
    
          var rzp1 = new Razorpay(option);
          rzp1.on("payment.failed", function(response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          })
    
          rzp1.open();
          event.preventDefault();
      };

      console.log(cartData)
    return (
        <div className="container mx-auto py-12">
            <h2 className="text-2xl text-center font-bold mb-6">Checkout</h2>
            <div className='flex w-full justify-center gap-6 flex-col px-5'>

                <div className='w-full p-5 border-gray-200 rounded-xl border-2'>
                    <form  className="space-y-4">
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Shipping Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={auth.username.email}
                                // onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                       

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Payment Method</label>
                            <select
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                {/* <option>Cash on Delivery</option> */}
                                <option>Online Payment</option>
                                {/* <option>UPI</option> */}
                            </select>
                        </div>


                    </form>
                </div>

                <div className='w-full p-5 border-gray-200 rounded-xl border-2'>
                    <h3 className="text-xl font-bold mt-8">Order Summary</h3>
                    <ul className="divide-y divide-gray-300">
                        {cartData.map((item) => (
                            <li key={item.productId} className="py-4 flex justify-between">
                                <span><img class="h-20 w-20 dummy:hidden" src={`${item.productImages}`} alt="product image" /></span>
                                <span>{item.productTitle} x {item.quantity}</span>
                                <span>₹{item.totalPrice}</span>
                            </li>
                        ))}
                    </ul>
                    <h1 className='text-xl'>Delivery charges:- ₹100</h1>
                    <div className="text-2xl font-bold mt-4">
                        Total: ₹{cartData.reduce((total, item) => total + item.totalPrice, 0)+100}
                    </div>
                    <button
                        onClick={handlePayment}
                        className="block mt-6 w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    )
}
