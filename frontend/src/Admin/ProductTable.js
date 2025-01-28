import React, { useEffect, useState } from "react";
import "../styles/ProductTable.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import defaultimage from "../Images/default.avif";
import { isAdminLogin } from "./Auth";
import loader from '../Images/Loading.gif'

function ProductTable(props) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  // Fetch Products
  const productlist = async () => {
    try {
      const response = await axios.get(`${props.envvariable.apiUrl}get_products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${props.envvariable.apiKey}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const showproduct = (id) => {
    if (isAdminLogin()) {
      props.changecontent(5, id);
    }
  }

  // Delete Product
  const deleteproduct = async (id) => {
    try {
      await axios.delete(`${props.envvariable.apiUrl}delete_product/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${props.envvariable.apiKey}`,
        },
      });
      productlist();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    productlist();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="products">
      {/* Product Table Section */}
      <h1>Product Stock</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Pieces</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? currentProducts.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={
                    product.image.length > 0 && product.image
                      ? props.envvariable.imgUrl + product.image[0].filename
                      : defaultimage
                  }
                  alt={product.name}
                  width="50"
                  height={50}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹ {product.price.toFixed(2)}</td>
              <td>{product.qnt}</td>
              <td>
                <FaEdit size={20} onClick={() => showproduct(product._id)} />
                <MdDelete
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteproduct(product._id)}
                />
              </td>
            </tr>
          )) : <div className="loader-wrapper">
            <img className="loader-image" src={loader} alt="Loading..." />
          </div>}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default ProductTable;
