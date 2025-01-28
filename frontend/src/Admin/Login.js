import React, { useEffect } from "react";
import styled from "styled-components";
import chair from "../Images/chair.jpeg";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { isAdminLogin } from "./Auth";
import image from '../Images/image.gif'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;
const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;
const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef3f5;

  img {
    max-width: 80%;
    height: auto;
    border-radius: 10px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ffffff;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; /* Adjust width for better responsiveness */
  max-width: 400px; /* Set a maximum width for the form */
`;


const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;


const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0.75rem;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
export default function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const response = await axios.post(
        `${props.envvariable.apiUrl}admin_login`, // Assuming this is the correct endpoint
        {
          email: username, // Send email and password in the request body
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", 'Authorization': `${props.envvariable.apiKey}`
          },
        }
      );
      setLoading(true);
      localStorage.setItem("admin", JSON.stringify(response.data.response));
      localStorage.setItem("token", response.data.token);
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
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(true);
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
  useEffect(() => {
    if (isAdminLogin()) {
      navigate('/')
    }
  }, [])
  return (
    <Container>
      {/* Left Section */}
      <LeftSection>
        <img
          src={chair}
          alt="Chair"
        />
      </LeftSection>

      {/* Right Section */}
      <RightSection>
        <Form onSubmit={handleSubmit}>
          <Title>Sign In</Title>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Admin Email" />
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
            />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </EyeIcon>
          </InputContainer>{loading ?
            <Button type="submit">Sign In</Button> : <Button disabled><img src={image} style={{ height: "20px" }} /></Button>}
        </Form>
      </RightSection>
      <ToastContainer />
    </Container>
  );
}
