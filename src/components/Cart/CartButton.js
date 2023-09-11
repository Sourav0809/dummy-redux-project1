import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { showCart } from '../../store/actions/cartActions';

const CartButton = (props) => {
  const { cartItems } = useSelector(state => state.cart)

  const dispatch = useDispatch()

  const hideCartContainer = () => {
    dispatch(showCart())
  }

  let totalItem = 0
  cartItems.forEach((val) => {
    totalItem += val.quantity
  })



  return (
    <button className={classes.button} onClick={hideCartContainer}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItem}</span>
    </button>
  );
};

export default CartButton;
