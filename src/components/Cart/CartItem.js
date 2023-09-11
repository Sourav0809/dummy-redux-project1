import classes from './CartItem.module.css';
import { IncItemAction, decItemAction } from '../../store/actions/cartActions';
import { useDispatch } from 'react-redux';
const CartItem = (props) => {

  const dispatch = useDispatch()
  return (
    <li className={classes.item}>
      <header>
        <h3>{props.title}</h3>
        <div className={classes.price}>
          ${props.price * props.quantity}{' '}
          <span className={classes.itemprice}>${props.price} / Per Item</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.quantity}</span>
        </div>
        <div className={classes.actions}>

          <button onClick={() => { dispatch(IncItemAction(props.id)) }}>+</button>
          <button onClick={() => { dispatch(decItemAction(props.id)) }}>-</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
