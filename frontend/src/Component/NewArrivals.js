import React, { useState, useEffect } from "react";
import "../styles/NewArrivals.css";
import axios from "axios";
import { isUserLogin } from '../User/Auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { data, useNavigate } from "react-router-dom";
import { incrementproduct } from '../Redux/CounterSlice'
import defaultimage from '../Images/default.avif'
import loader from '../Images/Loading.gif'
export default function NewArrivals(props) {
  const [imgIndexes, setImgIndexes] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const productlist = async () => {
    try {
      const response = await axios.get(`${props.envvariable.apiUrl}get_products`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': `${props.envvariable.apiKey}`
        },
      })
      setProducts(response.data);
    } catch (error) {
      console.log(error.response)
    }
  }
  const updateimage = (indexChange, pid) => {
    const product = products.find((item) => item._id === pid);
    if (!product || !product.image) return; // Guard clause for undefined product or images

    setImgIndexes((prev) => {
      const currentIndex = prev[pid] || 0; // Default to 0 if not set
      const newIndex = currentIndex + indexChange;

      // Ensure the new index is within bounds
      if (newIndex >= 0 && newIndex < product.image.length) {
        return { ...prev, [pid]: newIndex };
      }
      return prev; // No change if out of bounds
    });
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

  useEffect(() => {
    productlist();
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRight = () => {
    if (currentIndex < products.length - getVisibleCount()) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const slideLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getVisibleCount = () => {
    if (window.innerWidth >= 1024) return 4; // Show 4 items on large screens
    if (window.innerWidth >= 768) return 3; // Show 3 items on tablets
    return 1; // Show 1 item on mobile
  };

  const showproduct = (id) => {
    navigate(`/showproduct/${id}`)
  }
  return (
    <section className="new-arrivals">
      {!props.like &&
        <h2>New Arrivals</h2>}
      <div className="slider-container">
        <button className="slider-btn left" onClick={slideLeft}>
          &#8249;
        </button>
        <div className="product-wrapper">
          <div
            className="product-grid"
            style={{
              transform: `translateX(-${currentIndex * (100 / getVisibleCount())}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {(products.length > 0) ? products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <span
                    className="slider-icon left"
                    onClick={() => updateimage(-1, product._id)}
                  >
                    &lt;
                  </span>
                  <img onClick={() => showproduct(product._id)} style={{ cursor: "pointer", height: "253px", width: "400px" }}
                    src={(product.image.length > 0 && product.image) ?
                      props.envvariable.imgUrl +
                      product.image[(imgIndexes[product._id] || 0)].filename : defaultimage
                    }
                    alt={product.name}
                  />
                  <span
                    className="slider-icon right"
                    onClick={() => updateimage(1, product._id)}
                  >
                    &gt;
                  </span>
                </div>
                <h4>{product.name}</h4>
                <p>₹ {product.price}</p>
                <button onClick={() => addToCart(product._id)}>Add to cart</button>
              </div>
            )) : <div className="loader-wrapper">
              <img className="loader-image" src={loader} alt="Loading..." />
            </div>}
          </div>
        </div>
        <button className="slider-btn right" onClick={slideRight}>
          &#8250;
        </button>
      </div>
      <ToastContainer />
    </section>
  );
}
