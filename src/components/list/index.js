import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import List2 from '../list2';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { plural } from '../../utils';

function List({ list, list2, onAddItem,store }) {
  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
  }
  let price = 0
  list2.forEach(element => {
    price = price + element.price*element.sum
  });
  const [lgShow, setLgShow] = useState(false);
  return (
    <div className="List">
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <b>Корзина</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List2
            list2={list2}
            onDeleteItem={callbacks.onDeleteItem}
          />
        </Modal.Body>
      </Modal>
      <div className='ItemBox'>
        {list2.length>0
          ? <div className='ItemText'>В корзине: <b>{list2.length} {plural(list2.length, {one: 'товар',few: 'товара',many: 'товаров',})} / {price} ₽</b></div>
          : <div className='ItemText'>В корзине: <b>пусто</b></div>
        }
        <div className="Item-actions">
          <button onClick={() => setLgShow(true)}>Перейти</button>
        </div>
      </div>
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onAdd={onAddItem}/>
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAddItem: PropTypes.func,
};

List.defaultProps = {
  onAddItem: () => {},
};

export default React.memo(List);
