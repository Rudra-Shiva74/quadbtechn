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
          {Array.from({ length: 67 }, (_, i) => {
            const start = i * 300;
            const end = start + 300;
            return (
              <option key={start} value={`${start}-${end}`}>
                ₹{start} - ₹{end}
              </option>
            );
          })}
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
