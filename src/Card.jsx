import React, { useState } from 'react';
import './Card.css';

const ProductCard = () => {
const [count, setCount] = useState(0);
const itemPrice = 99;

const totalPrice = count * itemPrice;

const handleRemove = () => {
  if (count > 0) {
    setCount(count - 1);
  }
};

return (
  <div className="product-card">

    <img className="iphone"src="src/assets/iphone.jpg" alt="" />
    
    <h2 className="product-name">iphone 17 pro max</h2>

    <p className="product-price">Total : ${totalPrice}</p>

    <div className="counter-container">
      <button onClick={() => setCount(count + 1)} className="add-button">Add to Cart</button>

      <span className="cart-count">{count}</span>

      <button onClick={handleRemove} className="remove-button">Remove from Cart</button>
    </div>
    
  </div>
);
}


function Card() {
return (
  <>
    <div className="app-container">
      <ProductCard />
    </div>
  </>
);
}

export default Card;
  
