import React, { useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';

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
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <List
        store={store}
        list={list}
        list2={list2}
        onAddItem={callbacks.onAddItem}
      />
    </PageLayout>
  );
}

export default App;
