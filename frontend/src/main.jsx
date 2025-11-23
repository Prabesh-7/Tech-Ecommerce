import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FrontendLayout from "./Layout/FrontendLayout.jsx";
import LoginLayout from "./Layout/LoginLayout.jsx";
import RegisterLayout from "./Layout/RegisterLayout.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AdminPanel from "../src/pages/AdminPanel.jsx";
import AdminPanelLayout from "./Layout/AdminPanelLayout.jsx";
import AdminViewProduct from "./pages/AdminViewProduct.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import Payment from "./pages/Payment.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailure from "./pages/PaymentFailure.jsx";
import ViewUsers from "./pages/ViewUsers.jsx";
import AdminViewOrders from "./pages/AdminViewOrders.jsx";
import AdminSettings from "./pages/adminSettings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontendLayout />,

    children: [
      { index: true, element: <Home /> },

      { path: "contact", element: <Contact /> },
      { path: "product", element: <Product /> },
      { path: "cart", element: <Cart /> },
      { path: "profile", element: <UserProfile /> },
      { path: "adminDashboard", element: <AdminPanel /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "payment", element: <Payment /> },
      { path: "paymentFailure", element: <PaymentFailure /> },
      { path: "paymentSuccess", element: <PaymentSuccess /> },
    ],
  },

  {
    path: "/login",
    element: <LoginLayout />,

    children: [{ index: true, element: <Login /> }],
  },

  {
    path: "/register",
    element: <RegisterLayout />,

    children: [{ index: true, element: <Register /> }],
  },

  {
    path: "/admin",
    element: <AdminPanelLayout />,

    children: [
      { index: true, element: <AdminPanel /> },
      { path: "addProduct", element: <AddProduct /> },
      { path: "viewProduct", element: <AdminViewProduct /> },
      { path: "viewUsers", element: <ViewUsers /> },
      { path: "viewOrders", element: <AdminViewOrders /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
