import React from "react";
import styled from "styled-components";
import sales from "../Images/image.png";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 1rem 2rem;
`;

const SaleText = styled.p`
  color: #0070f3;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
`;

const Sales = () => {
    return (
        <Container>
            <LeftSection>
                <Image
                    src={sales} // Replace with your image path
                    alt="Living Room"
                />
            </LeftSection>
            <RightSection>
                <SaleText>SALE UP TO 35% OFF</SaleText>
                <Title>HUNDREDS of New lower prices!</Title>
                <Description>
                    It’s more affordable than ever to give every room in your home a
                    stylish makeover.
                </Description>
                <Link to={'/shop'} style={{}}>Shop Now →</Link>
            </RightSection>
        </Container>
    );
};

export default Sales;
