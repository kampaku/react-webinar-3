import {useCallback, useEffect, memo} from 'react';
import {useParams} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductInfo from '../../components/product-info';
import './style.css';

function ProductPage() {
  const cn = bem('Product-Page');
  const {id} = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    product: {
      id: state.product.info?.id,
      name: state.product.info?.name,
      madeIn: state.product.info?.madeIn,
      description: state.product.info?.description,
      category: state.product.info?.category,
      edition: state.product.info?.edition,
      price: state.product.info?.price,
    },
    loading: state.product.loading,
    error: state.product.error
  }));

  const callbacks = {
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
  }

  useEffect(() => {
    store.actions.product.load(id);
    return () => store.actions.product.reset();
  }, [id]);

  return (
    <div className={cn()}>
      {!select.loading &&
        <ProductInfo product={select.product} onAddToBasket={callbacks.addToBasket}/>
      }
    </div>
  )
}

export default memo(ProductPage);
