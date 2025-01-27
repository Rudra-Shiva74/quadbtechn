import React, { use, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Component/Header";
import HeroBanner from "./Component/HeroBanner";
import HeroSection from "./Component/HeroSection";
import FilterBar from "./Component/FilterBar";
import ProductList from "./Component/ProductList";
import Newsletter from "./Component/Newsletter";
import NewArrivals from "./Component/NewArrivals";
import FeaturesSection from "./Component/FeaturesSection";
import Footer from "./Component/Footer";
import CategorySection from "./Component/CategorySection.js";
import UserDashboard from "./User/Dashoboard.js";
import "./styles/global.css";
import { isAdminLogin } from "./Admin/Auth.js";
import Login from './Admin/Login.js'
import SignInPage from "./Component/SignInPage.js";
import SignupPage from "./Component/SignupPage.js";
import PrivateRoute from "./User/PrivateRoute.js";
import Cart from "./User/Cart.js";
import Sidebar from "./Admin/Sidebar.js";
import ProductTable from "./Admin/ProductTable.js";
import Dashoboard from "./Admin/Dashoboard.js";
import { isUserLogin } from "./User/Auth.js";
import AddProductForm from "./Admin/AddProductForm.js";
import ProductPage from "./Component/ProductPage.js";
import Checkout from "./User/Checkout.js";
import OrderConfirm from "./User/OrderConfirm.js";
import EditProduct from "./Admin/EditProduct.js";
function AppContent() {

  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = localStorage.getItem('token');
  const imgUrl = process.env.REACT_APP_IMG_URL
  const envvariable = { apiKey, apiUrl, imgUrl };
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [setcontent, setSetcontent] = useState(0);

  const changecontent = (index, id) => {
    setId(id);
    setSetcontent(index);
  };

  const signout = (flag) => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    if (flag) {
      navigate('/adminlogin');
    }
    else {
      navigate('/signin');
    }
  };

  useEffect(() => {
    isAdminLogin();
    isUserLogin();
  }, [apiKey]);

  return (
    <>
      {isAdminLogin() ? '' :
        <Header envvariable={envvariable} signout={signout} />}
      <Routes>
        <Route path="/adminlogin" element={<Login envvariable={envvariable} />} />
        <Route path="/" element={<>
          {isAdminLogin() ? <div className="app">
            <Sidebar changecontent={changecontent} signout={signout} />
            <div className="container">
              {(setcontent === 0) && <Dashoboard envvariable={envvariable} />}
              {(setcontent === 1) && <ProductList envvariable={envvariable} changecontent={changecontent} />}
              {(setcontent === 2) && <AddProductForm envvariable={envvariable} />}
              {(setcontent === 5) && <EditProduct envvariable={envvariable} id={id} />}
              {(setcontent === 3) && <ProductTable envvariable={envvariable} changecontent={changecontent} />}
            </div>
          </div> : <>
            <HeroSection />
            <CategorySection />
            <NewArrivals envvariable={envvariable} />
            <FeaturesSection />
            <Newsletter />
            <Footer /></>}
        </>} />
        {!isAdminLogin() ?
          <Route exact path="/showproduct/:id" element={<ProductPage envvariable={envvariable} />}></Route> : ''}
        <Route path="/signin" element={<SignInPage envvariable={envvariable} />} />
        <Route path="/shop" element={<>
          <HeroBanner />
          <div className="container1">
            <ProductList envvariable={envvariable} />
          </div> <Newsletter />
          <Footer />
        </>} />
        <Route path="/signup" element={<SignupPage envvariable={envvariable} />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/user/dashboard" element={<UserDashboard envvariable={envvariable} />} />
          <Route exact path="/user/cart" element={<Cart envvariable={envvariable} />} />
          <Route exact path="/user/checkout" element={<Checkout envvariable={envvariable} />} />
          <Route exact path="/user/orderconfirm" element={<OrderConfirm envvariable={envvariable} />} />
        </Route>
        {/* <Route element={<AdminPrivate />}>
          <Route exact path="/admin/editproduct/:id" element={<EditProduct envvariable={envvariable} />} />
        </Route> */}
      </Routes>
    </>
  );
}

function App() {
  // useEffect(() => {
  //   console.log(apiKey);
  // }, [envvariable]);
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;