import React from 'react';
import List from '../list';
import './style.css';

function ModalCart({ cart, onDelete }) {
  if (cart.items.length < 1) {
    return <div className='Modal-Empty'>Корзина пуста</div>;
  }

  return (
    <div className='Modal-Cart'>
      <List list={cart.items} buttonText='удалить' onBtnClick={onDelete} />
      <span className='Modal-Total'>
        Итого <span className='Modal-Price'>{cart.totalPrice.toLocaleString()}&nbsp;₽</span>
      </span>
    </div>
  );
}
export default ModalCart;
