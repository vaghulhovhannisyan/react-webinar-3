import { memo, useState } from 'react';
import './style.css';


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
    let i = 0
    while(i<10){
      if (json.result.items[i].username==login) {
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify(json.result.items[i]))
        window.location.assign('/sign')
      } 
      i++
    }
  }
      

  return (
    <div className='Password'>
      <p className='title'><b>Вход</b></p>
      <p className='login'>Логин</p>
      <input value={login} onChange={logininput}/>
      <p className='password'>Пароль</p>
      <input value={password} onChange={passwordinput}/>
      <p></p>
      <button onClick={load}>Войти</button>
    </div>
  );
}

export default memo(Password);
