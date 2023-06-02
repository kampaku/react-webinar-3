import { useCallback } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import UserBar from '../../containers/user-bar';
import ProfileInfo from '../../components/profile-info';
import { Navigate } from 'react-router';

function Profile() {
  const store = useStore()
  const {t} = useTranslate();

  const callbacks = {
    login: useCallback((login, password) => store.actions.user.authorize(login, password), [])
  }

  const select = useSelector(state => ({
    user: state.user.info,
    isLogin: state.user.isLogin
  }));

  if (select.isLogin === false) {
    return <Navigate to={'/login'} replace={true} />
  }

  return (
    <PageLayout>
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileInfo user={select.user}/>
    </PageLayout>
  );
}

export default Profile;
