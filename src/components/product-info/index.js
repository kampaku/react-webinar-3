import { memo } from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductInfo({product, onAddToBasket}) {
  const cn = bem('Product-Info');

  return (
    <div className={cn()}>
      <span>{product.description}</span>
      <span>Страна производитель: <b>{product.madeIn}</b></span>
      <span>Категория: <b>{product.category}</b></span>
      <span>Год выпуска: <b>{product.edition}</b></span>
      <span className={cn('price')}>Цена: {product.price} ₽</span>
      <button onClick={onAddToBasket}>Добавить</button>
    </div>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number
  }),
  onAddToBasket: PropTypes.func
}
export default memo(ProductInfo);
