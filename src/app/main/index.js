import { memo, useCallback, useEffect, useState, useContext } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './index.css'
import ReactPaginate from 'react-paginate';

function Main() {
  const store = useStore();
  const [skip, skipState] = useState(0)
  const [id,idstate] = useState()

  useEffect(() => {
    store.actions.catalog.load(skip);
  });

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    LinkItem: useCallback(_id => idstate(_id)),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };
  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} onLink={callbacks.LinkItem}/>;
      },
      [callbacks.addToBasket],
    ),
  };
  const Buttonskip = (id) => {
    skipState(id.selected*10)
  }
  const sum=()=>{
    localStorage.clear()
    localStorage.setItem('sum',select.sum)
    localStorage.setItem('amount',select.amount)
    localStorage.setItem('id', id)}
  
  sum()
  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <ReactPaginate
        previousLabel={null}
        nextLabel={null}
        pageClassName="page-item"
        pageCount={25}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={Buttonskip}
        containerClassName="pagination"
        activeClassName="active"
      />
        </PageLayout>
  );
}

export default memo(Main);
