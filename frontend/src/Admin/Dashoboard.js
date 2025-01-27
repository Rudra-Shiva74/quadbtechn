import React, { useEffect, useState } from 'react';
import sale from '../Images/Sales.png';
import '../styles/Dashboard.css'
import axios from 'axios';

export default function Dashboard(props) {
  const [totalorder, setTotalorder] = useState(0);
  const [users, setUsers] = useState(0);
  const [Pending, setPending] = useState(0);
  const [sell, setSell] = useState(0);

  const orderlist = async () => {
    try {
      const resp = await axios.get(`${props.envvariable.apiUrl}statsdetails`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': `${props.envvariable.apiKey}`
        },
      });
      setTotalorder(resp.data.order);
      setUsers(resp.data.user);
      setPending(resp.data.Pendingorder);
      let price = 0;
      resp.data.Sellorder.map((row) => {
        price += parseFloat(row.price) || 0;
      });
      setSell(price);
    } catch (error) {
      console.log(error);
    }
  };

  const deliverHandler = async (orderId) => {
    try {
      const resp = await axios.post(`${props.envvariable.apiUrl}updateorderstatus`, { orderId, status: 'Delivered' }, {
        headers: {
          "Content-Type": "application/json", 'Authorization': `${props.envvariable.apiKey}`
        }
      });
      orderlist();
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderlist();
  }, []);

  // Function to get the class for row based on status
  const getRowClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'delivered';
      case 'Pending':
        return 'pending';
      case 'Processing':
        return 'processing';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{totalorder.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>₹{sell}</p>
        </div>
        <div className="stat-card">
          <h3>Total Pending</h3>
          <p>{Pending.length}</p>
        </div>
      </div>

      {/* Sales Image */}
      <div className="sales-image">
        <img src={sale} alt="Sales" />
      </div>

      {/* Table Section */}
      <div className="table-section">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {totalorder && totalorder.map((row) => (
              <tr key={row._id} className={getRowClass(row.status)}>
                <td>{row.order_id}</td>
                <td>{row.fname + ` ` + row.lname}</td>
                <td>₹{row.price}</td>
                <td>{row.status}</td>
                <td> {!(row.status==='Delivered')? <button onClick={() => deliverHandler(row._id)}>Deliver</button>:''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
