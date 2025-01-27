import React from "react";
import "../styles/FilterBar.css";

const FilterBar = (props) => {
  return (
    <div className="filter-bar">
      <div className="filter-category">
        <label>Categories</label>
        <select onChange={(e) => props.onCategoryChange(e.target.value)}>
          <option value="All Furniture">All Furniture</option>
          <option value="Living Room Furniture">Living Room Furniture</option>
          <option value="Bedroom Furniture">Bedroom Furniture</option>
          <option value="Dining Room Furniture">Dining Room Furniture</option>
          <option value="Office Furniture">Office Furniture</option>
          <option value="Entertainment Furniture">Entertainment Furniture</option>
          <option value="Kitchen Furniture">Kitchen Furniture</option>
          <option value="Outdoor Furniture">Outdoor Furniture</option>
          <option value="Storage Furniture">Storage Furniture</option>
          <option value="Kids' Furniture">Kids' Furniture</option>
          <option value="Accent Furniture">Accent Furniture</option>
        </select>
      </div>
      <div className="filter-price">
        <label>Price</label>
        <select onChange={(e) => props.onPriceChange(e.target.value)}>
          <option value="All Price">All Price</option>
          <option value="10-50">₹10 - ₹50</option>
          <option value="50-100">₹50 - ₹100</option>
          <option value="100-150">₹100 - ₹150</option>
          <option value="150-200">₹150 - ₹200</option>
          <option value="200-250">₹200 - ₹250</option>
          <option value="250-300">₹250 - ₹300</option>
          <option value="300-350">₹300 - ₹350</option>
          <option value="350-400">₹350 - ₹400</option>
          <option value="400-450">₹400 - ₹450</option>
          <option value="450-500">₹450 - ₹500</option>
          <option value="500-550">₹500 - ₹550</option>
          <option value="550-600">₹550 - ₹600</option>
          <option value="600-650">₹600 - ₹650</option>
          <option value="650-700">₹650 - ₹700</option>
          <option value="700-750">₹700 - ₹750</option>
          <option value="750-800">₹750 - ₹800</option>
          <option value="800-850">₹800 - ₹850</option>
          <option value="850-900">₹850 - ₹900</option>
          <option value="900-950">₹900 - ₹950</option>
          <option value="950-1000">₹950 - ₹1000</option>
          <option value="1000-1050">₹1000 - ₹1050</option>
          <option value="1050-1100">₹1050 - ₹1100</option>
          <option value="1100-1150">₹1100 - ₹1150</option>
          <option value="1150-1200">₹1150 - ₹1200</option>
          <option value="1200-1250">₹1200 - ₹1250</option>
          <option value="1250-1300">₹1250 - ₹1300</option>
          <option value="1300-1350">₹1300 - ₹1350</option>
          <option value="1350-1400">₹1350 - ₹1400</option>
          <option value="1400-1450">₹1400 - ₹1450</option>
          <option value="1450-1500">₹1450 - ₹1500</option>
          <option value="1500-1550">₹1500 - ₹1550</option>
          <option value="1550-1600">₹1550 - ₹1600</option>
          <option value="1600-1650">₹1600 - ₹1650</option>
          <option value="1650-1700">₹1650 - ₹1700</option>
          <option value="1700-1750">₹1700 - ₹1750</option>
          <option value="1750-1800">₹1750 - ₹1800</option>
          <option value="1800-1850">₹1800 - ₹1850</option>
          <option value="1850-1900">₹1850 - ₹1900</option>
          <option value="1900-1950">₹1900 - ₹1950</option>
          <option value="1950-2000">₹1950 - ₹2000</option>
        </select>
      </div>
      <div className="filter-sort">
        <label>Sort by</label>
        <select onChange={(e) => props.onSortChange(e.target.value)}>
          <option value="Popularity">Popularity</option>
          <option value="PriceLowHigh">Price: Low to High</option>
          <option value="PriceHighLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
