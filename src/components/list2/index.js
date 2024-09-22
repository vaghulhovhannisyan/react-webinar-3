import React from 'react';
import PropTypes from 'prop-types';
import Item2 from '../item2';
import './style.css';

function List2({list2, onDeleteItem}) {
  let price = 0
  list2.forEach(element => {
    price = price + element.price*element.sum
  });
  return (
    <div className="List">
      {list2.map(item => (
        <div key={item.code} className="List-item">
          <Item2 item={item} onDelete={onDeleteItem}/>
        </div>
      ))}
      <div className='res-item'>
        <div className='res-text'><b>Итого</b></div>
        <div className='res'><b>{price} ₽</b></div>
      </div>
    </div>
  );
}

List2.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

List2.defaultProps = {
  onDeleteItem: () => {},
};
export default React.memo(List2);
