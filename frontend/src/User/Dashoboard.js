// App.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isUserLogin } from "./Auth";
import axios from "axios";

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #1a202c;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const OrderCard = styled.div`
  background: ${(props) => {
    if (props.status === "Delivered") return "#C6F6D5"; // Green for Delivered
    if (props.status === "Cancel") return "#FED7D7"; // Red for Canceled
    return "#ffffff"; // Default White
  }};
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const OrderTitle = styled.h2`
  font-size: 1.4rem;
  color: #2d3748;
`;

const OrderId = styled.span`
  font-size: 0.9rem;
  color: #718096;
`;

const OrderDetail = styled.div`
  font-size: 1rem;
  color: #4a5568;
  margin-top: 10px;
  line-height: 1.6;

  ul {
    margin: 10px 0 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 5px;
  }
`;

const Price = styled.span`
  font-weight: bold;
  color: #2c7a7b;
`;

const CancelButton = styled.button`
  background-color: #e53e3e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #c53030;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

// Main Component
const Dashboard = (props) => {
  const [orders, setOrders] = useState([]);
  const [cancelling, setCancelling] = useState(false);

  const orderlist = async () => {
    try {
      const resp = await axios.get(`${props.envvariable.apiUrl}getorderdetails/${isUserLogin() && isUserLogin().email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${props.envvariable.apiKey}`,
        },
      });
      setOrders(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const cancelOrder = async (orderId) => {
    setCancelling(true);
    try {
      const resp = await axios.post(
        `${props.envvariable.apiUrl}updateorderstatus`,
        { orderId, status: "Cancel" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${props.envvariable.apiKey}`,
          },
        }
      );
      console.log(resp)
      orderlist()
    } catch (error) {
      console.log(error.response);
    } finally {
      setCancelling(false);
    }
  };

  useEffect(() => {
    orderlist();
  }, []);

  return (
    <Container>
      <Title>Order Details</Title>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order.id} status={order.status}>
            <OrderHeader>
              <OrderTitle>{order.name}</OrderTitle>
              <OrderId>Order ID: {order.order_id}</OrderId>
            </OrderHeader>
            <OrderDetail>
              <div>
                <strong>Items:</strong>
                <ul>
                  {order.cartid.product.map((item, index) => (
                    <li key={index}>
                      {item.pid && item.pid.name} (Quantity: {item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Total:</strong> <Price>₹{order.price}</Price> <br />
                <strong>Status:</strong> <Price>{order.status}</Price>
              </div>
            </OrderDetail>
            {!((order.status === 'Cancel') || (order.status === 'Delivered')) &&
              <CancelButton
                onClick={() => cancelOrder(order._id)}
                disabled={cancelling}
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </CancelButton>}
          </OrderCard>
        ))
      ) : (
        <p>No orders available</p>
      )}
    </Container>
  );
};

export default Dashboard;
