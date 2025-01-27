import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isUserLogin } from "./Auth";
const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  border-bottom: ${(props) => (props.active ? "2px solid green" : "2px solid #ccc")};
  color: ${(props) => (props.active ? "green" : "#aaa")};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FormWrapper = styled.div`
  flex: 2;
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SummaryWrapper = styled.div`
  flex: 1;
  background: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1rem;

  h4 {
    margin: 0;
  }
`;

const Total = styled.h3`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const InputGroupHalf = styled.div`
  flex: 1;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const Checkout = (props) => {
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState("free");
  const [discount, setDiscount] = useState(0);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [streataddress, setStreataddress] = useState('');
  const [country, setCountry] = useState('');
  const [towncity, setTowncity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const shippingCost = shippingMethod === "free" ? 0 : shippingMethod === "express" ? 15 : 21;

  const subtotal = 100; // Example subtotal value
  const total = subtotal - discount + shippingCost;

  const place_order = async () => {
    const now = new Date();
    const timestamp = Date.now(); // Current timestamp
    const order_id = `ORD-${timestamp}`;
    const checkout = { user: isUserLogin() && isUserLogin().email, order_id, fname, lname, email, phone, streataddress, country, towncity, state, pincode, payment: "COD", cartid: sessionStorage.getItem('_id'), date: now.toString(), price: sessionStorage.getItem('price') }
    try {
      const response = await axios.post(
        `${props.envvariable.apiUrl}checkoutdetails`,
        checkout,
        {
          headers: {
            "Content-Type": "application/json", 'Authorization': `${props.envvariable.apiKey}`
          },
        }
      );
      sessionStorage.setItem('order_id', order_id);
      sessionStorage.setItem('time', now.toString());
      toast.success(`${response.data.message}`, {
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
        navigate('/user/orderconfirm');
      }, 2000);
    } catch (error) {
      console.log(error.response.data.message)
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
    }
  }
  useEffect(() => {
    if (sessionStorage.getItem('price') == 0) {
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
        <Step active={false}>2. Checkout Details</Step>
        <Step active={false}>3. Order Complete</Step>
      </ProgressBar>

      <ContentWrapper>
        <FormWrapper>
          <h2>Contact Information</h2>
          <Row>
            <InputGroupHalf>
              <label>First Name</label>
              <input type="text" onChange={(e) => setFname(e.target.value)} value={fname} placeholder="Enter your Frist Name" />
            </InputGroupHalf>
            <InputGroupHalf>
              <label>Last Name</label>
              <input type="text" onChange={(e) => setLname(e.target.value)} value={lname} placeholder="Enter your Last Name" />
            </InputGroupHalf>
          </Row>
          <Row>
            <InputGroupHalf>
              <label>Phone Number *</label>
              <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Enter your phone number" />
            </InputGroupHalf>
            <InputGroupHalf>
              <label>Email Address</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email address" />
            </InputGroupHalf>
          </Row>

          <h2>Shipping Address</h2>
          <Row>
            <InputGroupHalf>
              <label>Streat Address *</label>
              <input type="text" onChange={(e) => setStreataddress(e.target.value)} value={streataddress} placeholder="Enter recipient's full name" />
            </InputGroupHalf>
            <InputGroupHalf>
              <label>Country *</label>
              <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} placeholder="Enter street address" />
            </InputGroupHalf>
          </Row>
          <Row>
            <InputGroupHalf>
              <label>Town/City *</label>
              <input type="text" onChange={(e) => setTowncity(e.target.value)} value={towncity} placeholder="Enter city" />
            </InputGroupHalf>
            <InputGroupHalf>
              <label>State *</label>
              <input type="text" onChange={(e) => setState(e.target.value)} value={state} placeholder="Enter state" />
            </InputGroupHalf>
          </Row>
          <Row>
            <InputGroupHalf>
              <label>Postal Code *</label>
              <input type="text" onChange={(e) => setPincode(e.target.value)} value={pincode} placeholder="Enter postal code" />
            </InputGroupHalf>
          </Row>

          <h2>Payment Method</h2>
          <InputGroup>
            <label>Select Payment Method</label>
            <select>
              <option value="free">Cash On Delivery</option>
            </select>
          </InputGroup>
        </FormWrapper>

        <SummaryWrapper>
          <h2>Order Summary</h2>
          <SummaryItem>
            <h4>Subtotal:</h4>
            <p>₹{0}</p>
          </SummaryItem>
          <SummaryItem>
            <h4>Shipping:</h4>
            <p>₹{shippingCost.toFixed(2)}</p>
          </SummaryItem>
          <SummaryItem>
            <h4>Discount:</h4>
            <p>-₹{discount.toFixed(2)}</p>
          </SummaryItem>
          <Total>
            <h3>Total:</h3>
            <p>₹{sessionStorage.getItem('price')}</p>
          </Total>
          <Button onClick={place_order}>Place Order</Button>
        </SummaryWrapper>
      </ContentWrapper>
      <ToastContainer />
    </CheckoutContainer>
  );
};

export default Checkout;
