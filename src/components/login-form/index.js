import { useState } from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function LoginForm({callback, error}) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const cn = bem('Login-form');

  const onSubmit = (e) => {
    e.preventDefault();
    callback({login, password});
  }

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <legend className={cn('Title')}>Вход</legend>
      <label className={cn('Label')}>
        Логин
        <input value={login} onChange={e => setLogin(e.target.value)} type="text" />
      </label>
      <label className={cn('Label')}>
        Пароль
        <input value={password} onChange={e => setPassword(e.target.value)} type="text" />
      </label>
      {error && <span className={cn('Error')}>{error}</span>}
      <button className={cn('Btn')}>Войти</button>
    </form>
  );
}

LoginForm.propTypes = {
  callback: PropTypes.func,
  error: PropTypes.string,
}

LoginForm.defaultProps = {
  callback: () => {},
  error: '',
};



export default LoginForm;
