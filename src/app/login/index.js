import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import Password from '../../components/password'
import Sign from '../../components/sign'
import { Link } from 'react-router-dom';

function Login() {
  const { t } = useTranslate();  
  return (
    <PageLayout>
      {localStorage.getItem('signState')=='1'
      ? <Sign/>
      : <Password />
      }
      
    </PageLayout>
  );
}

export default memo(Login);
