import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isAdminLogin } from "./Auth";
import { useNavigate } from "react-router-dom";
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

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 12px;
  }
`;

const EditProduct = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id || props.id
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
        files: [],
        existingImages: [],
    });

    useEffect(() => {
        if (!isAdminLogin()) {
            navigate('/adminlogin');
        }
        // Fetch product details to populate the form
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `${props.envvariable.apiUrl}get_products/${id}`,
                    {
                        headers: {
                            Authorization: `${props.envvariable.apiKey}`,
                        },
                    }
                );
                const product = response.data;
                setFormData({
                    ...formData,
                    ...product,
                    existingImages: product.image || [],
                });
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, []);

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

    const handleRemoveImage = (index) => {
        const updatedImages = [...formData.existingImages];
        updatedImages.splice(index, 1);
        setFormData({ ...formData, existingImages: updatedImages });
        console.log(formData)
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
            } else if (key !== "existingImages") {
                formDataObj.append(key, formData[key]);
            }
        }

        // Append existing images if any
        try {
            const response = await axios.put(
                `${props.envvariable.apiUrl}update_product/${id}`,
                formDataObj,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `${props.envvariable.apiKey}`,
                    },
                }
            );
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
            console.error(error);
        }
    };

    return (
        <FormContainer>
            <FormHeading>Edit Product</FormHeading>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField>
                    <Label>Original Price</Label>
                    <Input
                        type="number"
                        name="originnalPrice"
                        value={formData.originnalPrice}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>Discount (%)</Label>
                    <Input
                        type="number"
                        min={1} max={90}
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>Price</Label>
                    <Input
                        type="number"
                        name="price" min={1}
                        value={parseInt(parseInt(formData.originnalPrice) - (parseInt(formData.originnalPrice) * (formData.discount / 100)))}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField>
                    <Label>Category</Label>
                    <Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required>
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

                {/* <FormField>
                    <Label>Existing Images</Label>
                    <ImagePreviewContainer>
                        {formData.existingImages.map((image, index) => (
                            <ImagePreview key={index}>
                                <img src={props.envvariable.imgUrl + image.filename} alt={`Product Image ${index + 1}`} />
                                <button type="button" onClick={() => handleRemoveImage(index)}>
                                    &times;
                                </button>
                            </ImagePreview>
                        ))}
                    </ImagePreviewContainer>
                </FormField> */}

                <FormField>
                    <Label>Upload New Images</Label>
                    <Input
                        type="file"
                        multiple
                        name="files"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>Height (cm)</Label>
                    <Input
                        type="number"
                        name="height"
                        min={1}
                        value={formData.height}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>Width (cm)</Label>
                    <Input
                        type="number"
                        name="width"
                        min={1}
                        value={formData.width}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>Additional Details</Label>
                    <TextArea
                        name="addistiondetails"
                        rows="4"
                        value={formData.addistiondetails}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>Quantity</Label>
                    <Input
                        type="number"
                        name="qnt"
                        value={formData.qnt}
                        onChange={handleChange}
                    />
                </FormField>

                <SubmitButton type="submit">Update Product</SubmitButton>
            </form>
            <ToastContainer />
        </FormContainer>
    );
};

export default EditProduct;
