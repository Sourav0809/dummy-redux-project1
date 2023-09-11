import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const Cart = (props) => {
  const { showCart, cartItems } = useSelector((state) => state.cart);

  return (
    <>
      {showCart && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <ul>
            {cartItems.length <= 0 && <p style={{ textAlign: 'center' }}>Cart Empty </p>}
            {cartItems.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}
          </ul>
        </Card>
      )}
    </>
  );
};

export default Cart;
