import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { dateFormat } from '../../utils/dateFormat';

import './style.css';

function Comment({comment, component, onAnswer, answerId, userId}) {
  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <div className={cn('branches')}>
        {Array.from({length: comment.level}).map((_, i) => <div className={cn('branch')} key={i}/>)}
      </div>
      <div className={cn('wrapper')}>
        <div className={cn('info')}>
          <div className={cn('username', {active: userId === comment.author._id})}>{comment.author.profile.name}</div>
          <div className={cn('date')}>{dateFormat(new Date(comment.dateCreate))}</div>
          <div className={cn('text')}>{comment.text}</div>
          <button onClick={() => onAnswer(comment._id)} className={cn('answer')}>Ответить</button>
        </div>
        <div>{answerId === comment._id && component}</div>
      </div>
    </div>
  )
}

export default memo(Comment);

Comment.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  component: PropTypes.node,
  show: PropTypes.string
};

Comment.defaultProps = {
  username: 'user',
  date: '2023-04-06',
  text: 'Благодаря компактному размеру гирлянду можно взять с собой и создать праздничную атмосферу в любом месте. Уникальным преимуществом изделия является возможность использовать его при создании декоративных букетов из конфет, фруктов, игрушек, а также живых цветов. Мягкий свет добавит волшебства и сказочности в композицию.',
  answerId: ''
}
