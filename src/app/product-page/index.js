import {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';

import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

function ProductPage() {
  const cn = bem('ProductPage');
  const {id} = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    id: state.product._id,
    name: state.product.name,
    madeIn: state.product.madeIn,
    description: state.product.description,
    category: state.product.category,
    edition: state.product.edition,
    price: state.product.price,
  }));

  const callbacks = {
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
  }

  useEffect(() => {
    store.actions.product.load(id);

    return () => store.actions.product.initState()
  }, [id]);

  return (
    <div className={cn()}>
      <span>{select.description}</span>
      <span>Страна производитель: <b>{select.madeIn}</b></span>
      <span>Категория: <b>{select.category}</b></span>
      <span>Год выпуска: <b>{select.edition}</b></span>
      <b>Цена: {select.price} ₽</b>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </div>
  )
}

export default ProductPage;
