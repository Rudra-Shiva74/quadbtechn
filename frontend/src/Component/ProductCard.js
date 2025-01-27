import React, { useState } from "react";
import "../styles/ProductCard.css";
import { isUserLogin } from "../User/Auth";
import { isAdminLogin } from "../Admin/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { incrementproduct } from '../Redux/CounterSlice'
import defaultimage from '../Images/default.avif'
import axios from "axios";
const ProductCard = (props) => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState(0); // State to track the image index for each product
  const navigate = useNavigate();
  const updateImageIndex = (indexChange) => {
    const product = props.product;
    const newIndex = imgIndex + indexChange;

    // Ensure the new index is within bounds
    if (newIndex >= 0 && newIndex < product.image.length) {
      setImgIndex(newIndex);
    }
  };
  const showproduct = (id) => {
    if (isAdminLogin()) {
      props.changecontent(5, id);
    }
    else {
      navigate(`/showproduct/${id}`)
    }
  }
  const addToCart = async (id) => {
    if (!isUserLogin()) {
      toast.warning(`Login First`, {
        position: "top-center",
        autoClose: 504,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate('/signin');
      }, 1000)
    } else {
      const cart = { email: isUserLogin() && isUserLogin().email, pid: id, count: 1 }
      try {
        const resp = await axios.post(`${props.envvariable.apiUrl}addtocard`, { cart }, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${props.envvariable.apiKey}`
          },
        })
      } catch (error) {
        console.log(error)
      }
      dispatch(incrementproduct(1));
    }
  }

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <span
          className="slider-icon left"
          onClick={() => updateImageIndex(-1)}
        >
          &lt;
        </span>
        <img onClick={() => !isAdminLogin() && showproduct(props.product._id)} style={{ cursor: "pointer", height: "253px", width: "400px" }}
          src={(props.product.image && props.product.image.length > 0) ? (props.envvariable.imgUrl + props.product.image[imgIndex].filename) : defaultimage}
          alt={props.product.name}
        />
        <span
          className="slider-icon right"
          onClick={() => updateImageIndex(1)}
        >
          &gt;
        </span>
      </div>

      <div className="product-details">
        <h3>{props.product.name}</h3>
        <p className="price">
          <span className="current-price">₹{props.product.price}</span>
          {props.product.originalPrice && (
            <span className="original-price">₹{props.product.originalPrice}</span>
          )}
        </p>
      </div>

      {isUserLogin() && <button onClick={() => addToCart(props.product._id)}>Add to Cart</button>}
      {isAdminLogin() && <button onClick={() => showproduct(props.product._id)}>Edit Product</button>}
    </div>
  );
};

export default ProductCard;
