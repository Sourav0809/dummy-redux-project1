import { onAddToCartAction } from '../../store/actions/cartActions'
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const dispatch = useDispatch()


  const onAddToCart = () => {
    const addedItem = {
      title: title,
      price: price,
      quantity: 1,
      description: description,
      id: id
    }
    dispatch(onAddToCartAction(addedItem))
  }



  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={onAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
