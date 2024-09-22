import React, { useCallback } from 'react';
import List from './components/list';
import List2 from './components/list2';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { plural } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const list2 = store.getState().list2;

  const callbacks = {
    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
  };
  let price = 0
  list2.forEach(element => {
    price = price + element.price*element.sum
  });
  return (
    <div style={{backgroundColor:'#615d5d'}}>
      <PageLayout>
          <Head title='Магазин'/>
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
        <List
          store={store}
          list={list}
          list2={list2}
          onAddItem={callbacks.onAddItem}
        />
      </PageLayout>
    </div>
  );
}

export default App;
