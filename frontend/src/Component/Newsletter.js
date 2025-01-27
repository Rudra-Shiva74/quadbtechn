import React from "react";
import "../styles/Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h2>Join Our Newsletter</h2>
      <p>Sign up for deals, new products, and promotions</p>
      <form>
        <input type="email" placeholder="Email address" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Newsletter;
