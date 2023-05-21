import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';


const variants = {
  one: 'товар',
  few: 'товара',
  many: 'товаров',
}

function Cart({ cart, openModal }) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      В корзине:&nbsp;
      <b>
        {cart.items.length === 0
          ? 'пусто'
          : `${cart.length} ${plural(cart.length, variants)} / ${cart.totalPrice.toLocaleString()} ₽`}
      </b>
      <div className={cn('action')}>
        <button onClick={openModal} className={cn('button')}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.object,
  openModal: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  openModal: () => {},
};

export default React.memo(Cart);
