import { memo, useCallback, useState } from 'react';
import useStore from '../../store/use-store';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool'

function Link(props) {
  const store = useStore();
  const[title,titleState]=useState()
  const[description,descriptionState]=useState()
  const[country,countryState]=useState()
  const[str,strState]=useState()
  const[date,dateState]=useState()
  const[price,priceState]=useState()

  async function linkitem() {
    const response = await fetch('/api/v1/articles/'+props.link+'?fields=*,madeIn(title,code),category(title)');
    const json = await response.json();
    descriptionState(json.result.description)
    titleState(json.result.title)
    countryState(json.result.madeIn.title+' ('+json.result.madeIn.code+')')
    strState(json.result.category.title)
    dateState(json.result.edition)
    priceState(json.result.price)
  }
  linkitem()
  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(props.link), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };
return(
<PageLayout>
  <Head title={title} />
  <BasketTool onOpen={callbacks.openModalBasket} amount={Number(props.amount)} sum={Number(props.sum)}/>
  <div style={{display:'block', paddingLeft:'50px', width:'90%'}}>
    <p>{description}</p>
    <p>Страна производитель: <b>{country}</b></p>
    <p>Категория: <b>{str}</b></p>
    <p>Год выпуска: <b>{date}</b></p>
    <p style={{fontSize:'20px'}}><b>Цена: {price} ₽</b></p>
    <button>Добавить</button>
  </div>
  </PageLayout>
  );
}
export default memo(Link);
