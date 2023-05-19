import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({list, onBtnClick, buttonText}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          {!item.amount ?
            <Item item={item} onBtnClick={onBtnClick} buttonText={buttonText} />
          : <Item item={item} onBtnClick={onBtnClick} buttonText={buttonText}
            render={() => (
              <span>{item.amount}&nbsp;шт</span>
            )}/>}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onBtnClick: PropTypes.func,
  buttonText: PropTypes.string
};

List.defaultProps = {
  onBtnClick: () => {},
}

export default React.memo(List);
