import { memo, useState } from 'react';
import './style.css';
import PageLayout from '../page-layout';
import Head from '../head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import { Link } from 'react-router-dom';

function Password() {
  const[login,StateLogin]=useState('')
  const[password,StatePassword]=useState('')
  const logininput = (event) => {
    StateLogin(event.target.value);
  }  
  const passwordinput = (event) => {
    StatePassword(event.target.value);
  }
  async function load() {
    const response = await fetch(`/api/v1/users/`,);
    const json = await response.json();
    let error = 0
    let i = 0
    while(i<10){
      if (json.result.items[i].username==login) {
        error = 1
        localStorage.setItem('user', JSON.stringify(json.result.items[i]))
        localStorage.setItem('signState', 1)
        window.location.assign('/profile')
      }
      i++
    }
    if(error==0){
      document.getElementById('error').innerHTML = 'Текст ошибки от сервера'
    }
  }

  return (
    <PageLayout>
    <Link to='/login'><button style={{marginLeft:'950px', marginTop:'10px', marginBottom:'10px'}}>Вход</button></Link>
    <Head title={'Магазин'}>
      <LocaleSelect />
    </Head>
    <Navigation />
    <div className='Password'>
      <p className='title'><b>Вход</b></p>
      <p className='login'>Логин</p>
      <input value={login} onChange={logininput}/>
      <p className='password'>Пароль</p>
      <input value={password} onChange={passwordinput} type='password'/>
      <p style={{color:'red'}} id='error'></p>
      <button onClick={load}>Войти</button>
    </div>
    </PageLayout>
  );
}

export default memo(Password);
