import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import Password from '../../components/password'

function Sign() {
  const { t } = useTranslate();
  const list = JSON.parse(localStorage.getItem('user'))
  console.log(list);
  return (
    <PageLayout>
      <Head title={t('title')}>
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
