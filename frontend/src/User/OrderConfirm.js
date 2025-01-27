import React, { useEffect } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Styled Components
const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 30px;
  max-width: 600px;
  text-align: center;
`;

const ThankYouMessage = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const OrderMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 30px;
  color: #666;
`;


const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const OrderDetails = styled.div`
  margin-bottom: 30px;
  text-align: left;

  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  & span {
    font-weight: bold;
  }
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
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
  border-bottom: ${(props) => (props.active ? "2px solid green" : "2px solid #ccc")};
  color: ${(props) => (props.active ? "green" : "#aaa")};
`;
const OrderConfirm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem('price') === 0) {
      toast.error(`User Cart is not found`, {
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
    }
  }, [])
  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      <ProgressBar>
        <Step active={true}>1. Shopping Cart</Step>
        <Step active={true}>2. Checkout Details</Step>
        <Step active={false}>3. Order Complete</Step>
      </ProgressBar>
      <PageContainer>
        <Card>
          <ThankYouMessage>
            Thank you! 🎉
          </ThankYouMessage>
          <OrderMessage>Your order has been received</OrderMessage>
          <OrderDetails>
            <div>
              <span>Order code:</span> <span>{sessionStorage.getItem('order_id')}</span>
            </div>
            <div>
              <span>Date:</span> <span>{sessionStorage.getItem('time').split(' ').slice(0, 4).join(' ')}</span>
            </div>
            <div>
              <span>Total:</span> <span>₹{sessionStorage.getItem('price')}</span>
            </div>
            <div>
              <span>Payment method:</span> <span>COD</span>
            </div>
          </OrderDetails>
          <Button onClick={() => navigate('/user/dashboard')}>Purchase history</Button>
        </Card>
      </PageContainer>
      <ToastContainer />
    </CheckoutContainer>
  );
};

export default OrderConfirm;
