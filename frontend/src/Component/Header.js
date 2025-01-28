import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { isUserLogin } from "../User/Auth";
import { IoIosLogIn } from "react-icons/io";
import { HiOutlineLogin } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { incrementproduct } from "../Redux/CounterSlice";
import axios from "axios";
import { isAdminLogin } from "../Admin/Auth";
import { FiMenu, FiX } from "react-icons/fi";

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const fetchProductsCount = async () => {
    try {
      const resp = await axios.post(
        `${props.envvariable.apiUrl}checktocart`,
        { email: isUserLogin() && isUserLogin().email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${props.envvariable.apiKey}`,
          }
        }
      );
      let data = 0;
      data += resp.data.product.reduce((sum, element) => sum + Number(element.quantity), 0);
      dispatch(incrementproduct(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAdminLogin();
    fetchProductsCount();
    isUserLogin();
  }, [props.envvariable.apiKey]);

  return (
    <header className="header">
      <div className="logo">HOMEDECOR</div>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <Link to={"/"}>Home</Link>
        <Link to={"/shop"}>Shop</Link>
        <a href="#">Product</a>
        <a href="#">Contact Us</a>
      </nav>
      <div className="icons">
        {isUserLogin() ? (
          <IoIosLogIn
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => props.signout(false)}
          />
        ) : (
          <Link to={"/signin"}>
            <HiOutlineLogin size={20} style={{ cursor: "pointer" }} />
          </Link>
        )}
        <Link to={"/user/cart"}>
          <div className="cart-icon">
            <BsCart3 size={20} style={{ cursor: "pointer" }} />
            {isUserLogin() ? <span className="badge">{count}</span> : ""}
          </div>
        </Link>
        <Link to={"/user/dashboard"}>
          <FaRegUserCircle size={20} style={{ cursor: "pointer" }} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
