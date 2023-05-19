import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props){

  const callbacks = {
    onBtnClick: (e) => {
      e.stopPropagation();
      props.onBtnClick(props.item.code);
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{props.item.price.toLocaleString()}&nbsp;₽</div>
      {props.render && <div className='Item-count'>{props.render(props.item.code)}</div>}
      <div className='Item-actions'>
        <button onClick={callbacks.onBtnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onBtnClick: PropTypes.func,
  buttonText: PropTypes.string,
  render: PropTypes.func
};

Item.defaultProps = {
  onBtnClick: () => {},
  buttonText: 'добавить'
}

export default React.memo(Item);
