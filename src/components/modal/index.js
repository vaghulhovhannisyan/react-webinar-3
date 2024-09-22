import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import List2 from '../list2';


function ItemModal(list2, store) {
  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
  };

  return (
    <div className='Modal'>
      <dialog id="modal" className='Modal'>
        <div className='ModalTitle'>
          <h1><b>Корзина</b></h1>
          <button className='ModalButton' onClick={() => {document.getElementById("modal").close()}}>Закрыть</button>
        </div>
        <List2
            list2={list2}
            onDeleteItem={callbacks.onDeleteItem}
          />
      </dialog>
      <div className='ItemBox'>
        {list2.length>0
          ? <div className='ItemText'>В корзине: <b>{list2.length} {plural(list2.length, {one: 'товар',few: 'товара',many: 'товаров',})} / {price} ₽</b></div>
          : <div className='ItemText'>В корзине: <b>пусто</b></div>
        }
        <div className="ItemButton">
          <button onClick={() => {document.getElementById("modal").showModal()}}>Перейти</button>
        </div>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemModal.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ItemModal);
