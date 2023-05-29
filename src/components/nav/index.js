import {memo} from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Nav() {

  return <Link to='/' className='Nav'>Главная</Link>
}

export default memo(Nav);
