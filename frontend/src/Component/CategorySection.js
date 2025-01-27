import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/CategorySection.css";
export default function CategorySection() {
  const categories = [
    { name: 'Living Room', image: 'https://image.made-in-china.com/226f3j00avhqEdcRCnbI/Modern-Style-Design-Sense-Simple-Fabric-Soft-Modern-Wooden-Sofa-Living-Room-Furniture-Home-Furniture-Double-Sofa.webp', link: '#' },
    { name: 'Bedroom', image: ' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7bPzDYQYO5I2ZcPQIQOtAKowhi46-9PRkGA&s', link: '#' },
    { name: 'Kitchen', image: 'https://5.imimg.com/data5/SELLER/Default/2020/8/HL/JN/NL/60115393/new-product.jpeg', link: '#' }
  ];

  return (
    <section className="categories">
      {categories.map((category, index) => (
        <div key={index} className="category">
          <img src={category.image} alt={category.name} />
          <h3>{category.name}</h3>
          <Link to={'/shop'}>Shop Now</Link>
        </div>
      ))}
    </section>
  );
}
