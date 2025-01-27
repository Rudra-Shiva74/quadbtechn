import React from 'react'
import '../styles/FeaturesSection.css'
export default function FeaturesSection() {
    const features = [
        { title: 'Free Shipping', description: 'Order above ₹200', icon: '🚚' },
        { title: 'Money-back', description: '30 days guarantee', icon: '💰' },
        { title: 'Secure Payments', description: 'Secured by Stripe', icon: '🔒' },
        { title: '24/7 Support', description: 'Phone and Email support', icon: '📞' }
      ];
    
      return (
        <section className="features">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <span>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </section>
      );
}
