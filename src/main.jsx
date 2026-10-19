import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./website/Pages/Home"
import TermsAndConditions from './website/Pages/TermsAndConditions';
import PrivacyPolicy from './website/Pages/PrivacyPolicy';
import ReturnsRefunds from './website/Pages/ReturnsRefunds';
import About from './website/Pages/About';
import ContactUs from './website/Pages/ContactUs';
import Faq from './website/Pages/Faq';
import Namkeens from './website/Pages/Namkeens';
import Pickels from './website/Pages/Pickels';
import Pappads from './website/Pages/Pappads';
import Sweets from './website/Pages/Sweets';
import Powders from './website/Pages/Powders';
import PaymentSuccess  from './website/Pages/PaymentSuccess';
import TestPage from './website/Pages/TestPage';
import Rosted from './website/Pages/Rosted';
import ProductDetails from './website/Pages/ProductDetails';
import Signup from './website/components/Signup';
import Login from './website/components/Login';
import Cart from './website/Pages/Cart';
import Checkout from './website/Pages/Checkout';
import CategoryPage from './website/Pages/CategoryPage';
import RouterWrapper from "./RouterWrapper";

import LayoutWrapper from "./LayoutWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "returns-refunds", element: <ReturnsRefunds /> },
      { path: "about", element: <About /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "faq", element: <Faq /> },
      { path: "namkeens", element: <Namkeens /> },
      { path: "pickels", element: <Pickels /> },
      { path: "pappads", element: <Pappads /> },
      { path: "sweets", element: <Sweets /> },
      { path: "powders", element: <Powders /> },
      { path: "test", element: <TestPage /> },
      { path: "rosted", element: <Rosted /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "category/:slug", element: <CategoryPage /> },
      { path: "/payment-success", element: <PaymentSuccess  /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);