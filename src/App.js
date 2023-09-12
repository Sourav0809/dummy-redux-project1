import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { fetchdataAction } from './store/actions/cartActions';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchdataAction())
  }, [])


  return (


    <Layout>
      <Cart />
      <Products />
    </Layout>
  );
}

export default App;
