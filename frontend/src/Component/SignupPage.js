import React, { useEffect, useState } from "react";
import styled from "styled-components";
import chair from "../Images/chair.jpeg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';  // Import the eye icons
import { isUserLogin } from "../User/Auth";
import image from '../Images/image.gif'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
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
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 1rem;
  color: #333;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  width: 100%;
  margin-bottom: 1rem;
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

const RememberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  label {
    font-size: 14px;
    color: #666;
  }

  a {
    font-size: 14px;
    text-decoration: none;
    color: #00b894;

    &:hover {
      text-decoration: underline;
    }
  }
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

const SignUpText = styled.p`
  font-size: 14px;
  margin-top: 1rem;

  a {
    color: #00b894;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    try {
      const response = await axios.post(
        `${props.envvariable.apiUrl}user_registration`,
        {
          email, username,
          password, email, name
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${props.envvariable.apiKey}`,
          },
        }
      );
      setLoading(true);
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
        navigate('/signin');
      }, 2000);
    } catch (error) {
      setLoading(true);
      console.log(error)
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
    if (isUserLogin()) {
      navigate('/')
    }
  }, [])

  return (
    <Container>
      <LeftSection>
        <img src={chair} alt="Chair" />
      </LeftSection>

      <RightSection>
        <Form onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <SignUpText>
            Already have an account? <Link to={`/signin`}>Sign in</Link>
          </SignUpText>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Your Name"
          />
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Your username"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email Address"
          />
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </EyeIcon>
          </InputContainer>
          <RememberContainer>
            <label>
              <input type="checkbox" /> I agree with <b>Privacy Policy</b> and{" "}
              <b>Term of Use</b>
            </label>
          </RememberContainer>{loading ?
            <Button type="submit">Sign Up</Button> : <Button disabled><img src={image} style={{ height: "20px" }} /></Button>}
        </Form>
      </RightSection>
      <ToastContainer />
    </Container>
  );
};

export default SignupPage;
