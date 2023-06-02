import { useCallback } from 'react';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import UserBar from '../../containers/user-bar';
import { Navigate } from 'react-router';

function LoginPage() {
  const store = useStore()
  const {t} = useTranslate();

  const callbacks = {
    login: useCallback((login, password) => store.actions.user.authorize(login, password), [])
  }

  const select = useSelector(state => ({
    error: state.user.error,
    isLogin: state.user.isLogin
  }));

  const onSubmit = async (data) => {
    callbacks.login(data.login, data.password)
  }

  if(select.isLogin) {
    return <Navigate to={'/profile'} replace={true}/>
  }

  return (
    <PageLayout>
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm callback={onSubmit} error={select.error}/>
    </PageLayout>
  );
}

export default LoginPage;
