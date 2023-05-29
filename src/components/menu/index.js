import PropTypes from 'prop-types';
import BasketTool from "../basket-tool";
import Nav from "../nav";
import 'styles.css';

function Menu({ onOpen, sum, amount, translate }) {
  return (
    <div className='Menu'>
      <Nav />
      <BasketTool
        onOpen={onOpen}
        sum={sum}
        amount={amount}
        translate={translate}
      />
    </div>
  );
}

Menu.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translate: PropTypes.func,
};

Menu.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  translate: () => null,
};

export default Menu;
