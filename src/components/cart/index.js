import React from 'react';
import PropTypes, {object} from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart({ cart, openModal }) {
  const cn = bem("Cart");

  return (
    <div className={cn()}>
      В корзине:&nbsp;
      <b>
        {cart.items.length === 0
          ? "пусто"
          : `${cart.items.length} / ${cart.totalPrice.toLocaleString()} ₽`}
      </b>
      <div className={cn("action")}>
        <button onClick={openModal} className={cn("button")}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.object,
  openModal: PropTypes.func,
};

Cart.defaultProps = {
  openModal: () => {},
};

export default React.memo(Cart);
