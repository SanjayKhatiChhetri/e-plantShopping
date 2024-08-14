import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        return total + parseFloat(item.cost.replace("$", "")) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.replace("$", "")) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="cart-item-quantity">
              <button
                className="cart-item-button"
                onClick={() => handleDecrement(item)}
              >
                -
              </button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button
                className="cart-item-button"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>
            <div className="cart-item-total">
              Total: ${calculateTotalCost(item)}
            </div>
            <button
              className="cart-item-delete"
              onClick={() => handleRemove(item)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">Total: ${calculateTotalAmount()}</div>
      <button className="continue-shopping" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
      <button className="checkout" onClick={handleCheckoutShopping}>
        Checkout
      </button>
    </div>
  );
};

export default CartItem;
