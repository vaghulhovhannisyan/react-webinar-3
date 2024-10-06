import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import { Link } from 'react-router-dom';

function Sign() {
  const list = JSON.parse(localStorage.getItem('user'))
  return (
    <PageLayout>
      <div style={{display:'flex', marginLeft:'79%'}}>
        <a style={{marginTop:'10px', marginBottom:'10px'}} href=''>{list.profile.name}</a>
        <Link to='/'><button style={{marginLeft:'50px', marginTop:'10px', marginBottom:'10px'}} onClick={()=>{localStorage.clear();localStorage.setItem('signState', 0)}}>Выход</button></Link>
      </div>
      <Head title={'Магазин'}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <div style={{paddingTop:'20px', paddingLeft:'20px'}}>
        <p style={{fontSize:'20px'}}><b>Профиль</b></p>
        <p>Имя: <b>{list.profile.name}</b></p>
        <p>Телефон: <b>{list.profile.phone}</b></p>
        <p>email: <b>{list.email}</b></p>
      </div>
    </PageLayout>
  );
}

export default memo(Sign);
