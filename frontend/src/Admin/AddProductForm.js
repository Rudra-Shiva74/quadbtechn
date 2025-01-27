import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Styled components
const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormHeading = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProductForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    height: "",
    width: "",
    discount: "",
    addistiondetails: "",
    originnalPrice: "",
    qnt: "",
  });
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files.length > 5) {
        alert("You can upload a maximum of 5 images.");
        return;
      }
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

    // Append all fields to formData
    for (const key in formData) {
      if (key === "files") {
        // Handle multiple files
        Array.from(formData[key]).forEach((file) => {
          formDataObj.append("files", file);
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${props.envvariable.apiUrl}create_product`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${props.envvariable.apiKey}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`${response.data.message}`, {
          position: "top-center",
          autoClose: 504,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setFormData({
          name: "",
          price: "",
          category: "",
          height: "",
          width: "",
          discount: "",
          addistiondetails: "",
          originnalPrice: "",
          qnt: "",
        });
      }
      console.log(response);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 504,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };


  return (
    <FormContainer>
      <FormHeading>Add Product</FormHeading>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Name</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </FormField>

        <FormField>
          <Label>Price</Label>
          <Input type="number" name="price" min={1} value={formData.price} onChange={handleChange} required />
        </FormField>

        <FormField>
          <Label>Category</Label>
          <Select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Furniture Type</option>
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
          </Select>
        </FormField>

        <FormField>
          <Label>Image</Label>
          <Input type="file" multiple name="files" accept="image/*" onChange={handleChange} required />
        </FormField>

        <FormField>
          <Label>Discount (%)</Label>
          <Input type="number" min={1} name="discount" value={formData.discount} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label>Height (cm)</Label>
          <Input type="number" name="height" min={1} value={formData.height} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label>width (cm)</Label>
          <Input type="number" name="width" min={1} value={formData.width} onChange={handleChange} />
        </FormField>

        <FormField>
          <Label>Additional Details</Label>
          <TextArea name="addistiondetails" rows="4" value={formData.addistiondetails} onChange={handleChange} />
        </FormField>

        <FormField>
          <Label>Original Price</Label>
          <Input type="number" name="originnalPrice" value={formData.originnalPrice} onChange={handleChange} />
        </FormField>

        <FormField>
          <Label>Quantity</Label>
          <Input type="number" name="qnt" value={formData.qnt} onChange={handleChange} />
        </FormField>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      <ToastContainer />
    </FormContainer>
  );
};

export default ProductForm;
