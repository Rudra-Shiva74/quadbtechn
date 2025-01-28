import React, { useState } from "react";
import styled from "styled-components";
import { isUserLogin } from "../User/Auth";
import { isAdminLogin } from "../Admin/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { incrementproduct } from "../Redux/CounterSlice";
import defaultimage from "../Images/default.avif";
import axios from "axios";
import { Heart } from "lucide-react"; // For heart icon

const ProductCardWrapper = styled.div`
  background-color: #f9f9f9;
  border: none;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  .badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: linear-gradient(45deg, #ff6f61, #ff3f34);
    color: #fff;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 2; /* Ensure badge stays above image */
  }

  .heart-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 2; /* Ensure heart stays above image */
    background: white;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;

    &:hover {
      background-color: #ff3f34;
      svg {
        color: white;
      }
    }

    svg {
      color: #ff6f61;
      transition: color 0.3s;
    }
  }
`;

const ProductDetails = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
    text-transform: capitalize;
  }

  .price {
    font-size: 18px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .current-price {
      font-weight: bold;
      color: #ff6f61;
      font-size: 20px;
    }

    .original-price {
      text-decoration: line-through;
      font-size: 16px;
      color: #aaa;
      margin-left: 8px;
      font-weight: normal;
    }
  }
`;

const ProductButton = styled.button`
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ff3f34;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(255, 63, 52, 0.5);
  }
`;

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
    } else {
      navigate(`/showproduct/${id}`);
    }
  };

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
        navigate("/signin");
      }, 1000);
    } else {
      const cart = {
        email: isUserLogin() && isUserLogin().email,
        pid: id,
        count: 1,
      };
      try {
        const resp = await axios.post(
          `${props.envvariable.apiUrl}addtocard`,
          { cart },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${props.envvariable.apiKey}`,
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
      dispatch(incrementproduct(1));
    }
  };

  return (
    <ProductCardWrapper>
      <ProductImageWrapper>
        <span className="badge">-{props.product.discount}%</span>
        <div className="heart-icon">
          <Heart size={16} />
        </div>
        <img
          onClick={() => !isAdminLogin() && showproduct(props.product._id)}
          style={{ cursor: "pointer", height: "253px", width: "400px" }}
          src={
            props.product.image && props.product.image.length > 0
              ? props.envvariable.imgUrl +
              props.product.image[imgIndex].filename
              : defaultimage
          }
          alt={props.product.name}
        />
        <span
          className="slider-icon left"
          onClick={() => updateImageIndex(-1)}
        >
          &lt;
        </span>
        <span
          className="slider-icon right"
          onClick={() => updateImageIndex(1)}
        >
          &gt;
        </span>
      </ProductImageWrapper>

      <ProductDetails>
        <h3>{props.product.name}</h3>
        <p className="price">
          <span className="current-price">₹{props.product.price}</span>
          {props.product.originnalPrice && (
            <span className="original-price">₹{props.product.originnalPrice}</span>
          )}
        </p>
      </ProductDetails>

      {isUserLogin() && (
        <ProductButton onClick={() => addToCart(props.product._id)}>
          Add to Cart
        </ProductButton>
      )}
      {isAdminLogin() && (
        <ProductButton onClick={() => showproduct(props.product._id)}>
          Edit Product
        </ProductButton>
      )}
    </ProductCardWrapper>
  );
};

export default ProductCard;
