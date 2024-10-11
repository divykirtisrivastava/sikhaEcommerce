import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Hero from "./components/Hero/Hero.jsx";
import AboutUs from "./components/About/About.jsx";
import Layout from "./Layout.jsx";
import Returnpolicy from "./components/Returnpolicy/Returnpolicy.jsx";
import Shipping from "./components/Shipping/Shipping.jsx";
import Contact from "./components/contact/Contact.jsx";
import ProductPage from "./components/ProductPage.jsx";
import CategoryFilterPage from "./components/CategoryFilterPage.jsx";
import NavbarFilter from "./components/NavbarFilter.jsx";
import FindProduct from "./components/FindProduct.jsx";
import Protected from "./components/Protected.jsx";
import Cart from "./components/Cart.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import SignInSignUpModal from "./components/SignInSignUpModal.jsx";
import Checkout from "./components/Checkout.jsx";
import YourOrder from "./components/YourOrder.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";

let router = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* <Route path="/" element={<App/>}/>
    <Route path="/about" element={<AboutUs/>}/>
    <Route path="/return" element={<Returnpolicy/>}/>
    <Route path="/shipping" element={<Shipping/>}/>
    <Route path="/contact" element={<Contact/>}/> */}
    

        <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path='/productpage/:code' element={<ProductPage/>}/>
        <Route path='/view/:categoryName/:subcategoryName' element={<CategoryFilterPage/>}/>
        <Route path='/view/:categoryName' element={<NavbarFilter/>}/>
        <Route path='/find/:inp' element={<FindProduct/>}/>
        <Route path='/cart' element={<Protected>
          <Cart/>
        </Protected>}/>
        <Route path='/signinsignup' element={<SignInSignUpModal/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/yourorder' element={<YourOrder/>}/>
        <Route path='/payment_seccess' element={<PaymentSuccess/>}/>
        </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
