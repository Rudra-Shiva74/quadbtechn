import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { isUserLogin } from "./Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { incrementproduct, decrementProduct } from "../Redux/CounterSlice";
import { useNavigate } from "react-router-dom";

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const CartContent = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const CartItems = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const ItemPrice = styled.div`
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #100e0e;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CartSummary = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 20px;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }

  .summary-details {
    margin-bottom: 20px;

    p {
      font-size: 18px;
      color: #333;
    }

    h3 {
      font-size: 24px;
      font-weight: bold;
      color: black;
    }
  }
`;

const ShippingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    color: #555;
    cursor: pointer;

    input[type="radio"] {
      accent-color: #007bff;
    }

    &:hover {
      color: #007bff;
    }
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004080;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;


const Step = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  border-bottom: ${(props) => (props.active ? "2px solid #000" : "2px solid #ccc")};
  color: ${(props) => (props.active ? "#000" : "#aaa")};
`;

// Main Cart Component
const Cart = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  const checkoutHandler = () => {
    navigate('/user/checkout');
  }

  const fetchUsers = async () => {
    try {
      const resp = await axios.get(`${props.envvariable.apiUrl}getcartdetails/${isUserLogin() && isUserLogin().email}`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': `${props.envvariable.apiKey}`
        },
      }
      );
      sessionStorage.setItem('_id', resp.data._id);
      setCartItems(resp.data.product);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
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
        navigate('/shop')
      }, 1500);
      console.log(error.response)
    }
  };
  // State for shipping option
  const [shipping, setShipping] = useState("Free shipping");

  // Update quantity of a cart item
  const updateQuantity = async (id, opr) => {
    const cart = { email: isUserLogin() && isUserLogin().email, pid: id, count: 1 }
    if (opr) {
      try {
        const resp = await axios.post(`${props.envvariable.apiUrl}removeonefromcard`, { cart }, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${props.envvariable.apiKey}`
          },
        })
      } catch (error) {
        console.log(error)
      }
      dispatch(decrementProduct(1));
    }
    else {
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
    fetchUsers();
  };

  // Remove item from cart
  const removeItem = async (id, remove) => {
    const cart = { email: isUserLogin() && isUserLogin().email, pid: id }
    try {
      const resp = await axios.post(`${props.envvariable.apiUrl}removetocard`, { cart }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${props.envvariable.apiKey}`
        },
      })
    } catch (error) {
      console.log(error.response)
    }
    dispatch(decrementProduct(remove));
    fetchUsers();
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.pid.price * item.quantity, 0);

  // Calculate total based on shipping option
  const calculateTotal = () => {
    if (shipping === "Express shipping") {
      sessionStorage.setItem('price', subtotal + 15);
      return subtotal + 15;
    }
    if (shipping === "Pick Up") {
      sessionStorage.setItem('price', subtotal * 1.21);
      return subtotal * 1.21;
    }
    sessionStorage.setItem('price', subtotal);
    return subtotal;
  };
  const showproduct = (id) => {
    navigate(`/showproduct/${id}`)
  }

  useEffect(() => {
    fetchUsers();
  }, [])
  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      <ProgressBar>
        <Step active={true}>1. Shopping Cart</Step>
        <Step active={false}>2. Checkout Details</Step>
        <Step active={false}>3. Order Complete</Step>
      </ProgressBar>
      <CartContent>
        <CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.pid._id}>
              <ItemDetails>
                <ItemImage onClick={() => showproduct(item.pid._id)} style={{ cursor: "pointer" }}
                  src={(item.pid.image.length > 0 && item.pid.image) ? props.envvariable.imgUrl + item.pid.image[0].filename : ''}
                  alt={item.name}
                />
                <p>{item.pid.name}</p>
              </ItemDetails>
              <ItemQuantity>
                {item.quantity > 1 ? <button onClick={() => updateQuantity(item.pid._id, 1)} style={{ color: "black" }}>-</button> : <button style={{ color: "black" }}>-</button>}
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.pid._id, 0)} style={{ color: "black" }}>+</button>
              </ItemQuantity>
              <ItemPrice>₹{item.pid.price && item.pid.price}</ItemPrice>
              <ItemPrice>₹{item.pid.price * item.quantity}</ItemPrice>
              <RemoveButton onClick={() => removeItem(item.pid._id, item.quantity)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>
        <CartSummary>
          <h2>Cart Summary</h2>
          <ShippingOptions>
            <label>
              <input
                type="radio"
                name="shipping"
                value="Free shipping"
                checked={shipping === "Free shipping"}
                onChange={(e) => setShipping(e.target.value)}
              />
              Free shipping (₹0.00)
            </label>
            <label>
              <input
                type="radio"
                name="shipping"
                value="Express shipping"
                checked={shipping === "Express shipping"}
                onChange={(e) => setShipping(e.target.value)}
              />
              Express shipping (₹15.00)
            </label>
            <label>
              <input
                type="radio"
                name="shipping"
                value="Pick Up"
                checked={shipping === "Pick Up"}
                onChange={(e) => setShipping(e.target.value)}
              />
              Pick Up (21% tax)
            </label>
          </ShippingOptions>
          <div className="summary-details">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
          </div>
          <CheckoutButton onClick={checkoutHandler}>Checkout</CheckoutButton>
        </CartSummary>
      </CartContent>
      <ToastContainer />
    </CheckoutContainer>
  );
};

export default Cart;
