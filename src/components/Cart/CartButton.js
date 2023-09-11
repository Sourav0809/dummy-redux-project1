import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { showCart } from '../../store/actions/cartActions';

const CartButton = (props) => {
  const dispatch = useDispatch()



  const hideCartContainer = () => {
    dispatch(showCart())
  }
  return (
    <button className={classes.button} onClick={hideCartContainer}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
