import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import Link from './link';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name); 
  let id = localStorage.getItem('id')
  let sum = localStorage.getItem('sum')
  let amount = localStorage.getItem('amount')
  return (
    <>  <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/link' element={<Link link={id} sum={sum} amount={amount}/>}/>
      </Routes>
    </Router>
    {activeModal === 'basket' && <Basket />}
    </div>
    </>
  );
}

export default App;
