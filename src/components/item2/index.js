import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item2(props) {
  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };
  return (
    <div className='Item'>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} ₽</div>
      <div className="Item-sum">{props.item.sum} шт</div>
      <div className="Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

Item2.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

Item2.defaultProps = {
  onDelete: () => {},
};

export default React.memo(Item2);
