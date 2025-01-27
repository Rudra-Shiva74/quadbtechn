import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import sale from "../Images/product.png";
import "../styles/ProductList.css";
import { isAdminLogin } from "../Admin/Auth";
import FilterBar from "./FilterBar";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Furniture");
  const [selectedPrice, setSelectedPrice] = useState("All Price");
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16; // Number of products per page

  const productlist = async () => {
    try {
      const response = await axios.get(`${props.envvariable.apiUrl}get_products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${props.envvariable.apiKey}`,
        },
      });
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
      setDisplayedProducts(response.data.slice(0, pageSize)); // Show initial page
    } catch (error) {
      console.log(error.response);
    }
  };

  const applyFilters = () => {
    let tempProducts = [...products];

    // Filter by Category
    if (selectedCategory !== "All Furniture") {
      tempProducts = tempProducts.filter((product) => product.category === selectedCategory);
    }

    // Filter by Price
    if (selectedPrice !== "All Price") {
      const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);
      tempProducts = tempProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Sort Products
    if (selectedSort === "PriceLowHigh") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "PriceHighLow") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(tempProducts);
    setDisplayedProducts(tempProducts.slice(0, currentPage * pageSize)); // Reset displayed products based on filters
  };

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    productlist();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedPrice, selectedSort]);

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, currentPage * pageSize));
  }, [currentPage, filteredProducts]);

  return (
    <>
      <h1>Products</h1>
      {isAdminLogin() && (
        <div className="sales-image">
          <img src={sale} alt="Sales" />
        </div>
      )}
      <FilterBar
        onCategoryChange={setSelectedCategory}
        onPriceChange={setSelectedPrice}
        onSortChange={setSelectedSort}
      />
      <div className="product-list">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            envvariable={props.envvariable}
            changecontent={props.changecontent}
          />
        ))}
      </div>
      {/* Show More Button */}
      {displayedProducts.length < filteredProducts.length && (
        <button className="show-more" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </>
  );
};

export default ProductList;
