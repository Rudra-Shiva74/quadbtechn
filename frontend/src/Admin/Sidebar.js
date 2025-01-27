import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import Admin from '../Images/Admin.png'
import { isAdminLogin } from "./Auth";
const sidemenu = ["Dashboard", "Products", "Add Products", "Product Stock"]
function Sidebar(props) {
  const [active, setActive] = useState(0);
  const sidemenuclick = (index) => {
    props.changecontent(index);
    setActive(index);
  }
  useEffect(() => {
    isAdminLogin();
  }, [])
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src={Admin} alt="profile" />
        <p>Admin</p>
      </div>
      <ul className="menu">
        {sidemenu.map((value, index) => {
          return (
            <li key={index} className={`menu-item ${active === index ? 'active' : ''}`} onClick={() => sidemenuclick(index)}>{value}</li>
          )
        })}
      </ul>
      <div className="settings">
        <ul>
          <li className="menu-item" onClick={() => props.signout(true)}>Logout</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
