import React, { useEffect, useState } from "react";
import "../styles/ProductPage.css";
import { useParams } from "react-router-dom";
import { isAdminLogin } from "../Admin/Auth";
import { incrementproduct, decrementProduct } from "../Redux/CounterSlice";
import { useSelector, useDispatch } from "react-redux";
import NewArrival from "./NewArrivals.js";
import axios from "axios";
import { isUserLogin } from "../User/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductPage = (props) => {
    const dispatch = useDispatch();
    const param = useParams();
    const [quantity, setQuantity] = useState(0);
    const [products, setProducts] = useState({});
    const id = param.id || props.id
    const fetchproductdetail = async () => {
        try {
            const response = await axios.post(`${props.envvariable.apiUrl}getoneproductqnt`, { email: isUserLogin() && isUserLogin().email, pid: id }, {
                headers: {
                    "Content-Type": "application/json", 'Authorization': `${props.envvariable.apiKey}`
                },
            })
            if (response.data.productqnt)
                setQuantity(response.data.productqnt.quantity)
            setProducts(response.data.product)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const updateQuantity = async (opr) => {
        if (!isUserLogin()) {
            toast.error(`You have to login first..!`, {
                position: "top-center",
                autoClose: 504,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        const cart = { email: isUserLogin() && isUserLogin().email, pid: id, count: 1 }
        if (opr) {
            try {
                const resp = await axios.post(`${props.envvariable.apiUrl}removeonefromcard`, { cart }, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `${props.envvariable.apiKey}`
                    },
                })
                console.log(resp)
            } catch (error) {
                console.log(error)
            }
            dispatch(decrementProduct(1));
            setQuantity(quantity - 1)

        }
        else {
            try {
                const resp = await axios.post(`${props.envvariable.apiUrl}addtocard`, { cart }, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `${props.envvariable.apiKey}`
                    },
                })
                console.log(resp);
            } catch (error) {
                console.log(error)
            }
            dispatch(incrementproduct(1));
            setQuantity(quantity + 1)
        }
    };
    useEffect(() => {
        fetchproductdetail();
    }, [id])
    return (<>
        <div className="product-page">
            <div className="left-section">
                <div className="image-gallery">
                    <div className="image-gallery">
                        {products.image && products.image.map((image, index) => (
                            <img
                                key={index}
                                src={props.envvariable.imgUrl + image.filename}
                                alt={`Product ${index + 1}`}
                                style={{ height: !isAdminLogin() && "400px", width: !isAdminLogin() && "400px" }}
                            />
                        ))}
                    </div>

                </div>
            </div>
            <div className="right-section">
                <h1>{products.name}</h1>
                <div className="reviews">★ ★ ★ ★ ☆ (11 Reviews)</div>
                <p className="price">
                    {/* ₹{products.price.toFixed(2)}{" "} */}
                    {/* <span className="original-price">₹{products.originalPrice.toFixed(2)}</span> */}
                </p>
                <p className="measurements">Measurements: {products.height}cm X {products.width}cm</p>
                {/* <div className="color-options">
                    <p>Choose Color:</p>
                    {product.colors.map((color) => (
                        <button
                            key={color}
                            className={`color-button ${selectedColor === color ? "selected" : ""
                                }`}
                            onClick={() => handleColorChange(color)}
                        >
                            {color}
                        </button>
                    ))}
                </div> */}
                {isUserLogin() && <div className="quantity">
                    {quantity > 1 ? <button onClick={() => updateQuantity(1)}>-</button> : <button>-</button>}
                    <span>{quantity}</span>
                    <button onClick={() => updateQuantity(0)}>+</button>
                </div>}
                <div className="actions">
                    {/* <button className="wishlist-button">♡ Wishlist</button> */}
                    {!isUserLogin() && <button onClick={updateQuantity} className="add-to-cart-button">Add to Cart</button>}
                </div>
                {/* <p>SKU: {products.sku}</p> */}
                <p>Category: {products.category}</p>
                <div className="accordion">
                    <details>
                        <summary>Additional Info</summary>
                        <p>{products.addistiondetails}</p>
                        {/* <p>{products.packaging}</p> */}
                    </details>
                    <details>
                        <summary>Questions</summary>
                        <p>No questions available.</p>
                    </details>
                    <details>
                        <summary>Reviews</summary>
                        <p>No reviews available.</p>
                    </details>
                </div>
            </div>
        </div><div className="new-arrival-section">
            <h2>You May Also Like</h2>
        </div>
        <ToastContainer />
        <NewArrival envvariable={props.envvariable} like={true} />
    </>
    );
};

export default ProductPage;
