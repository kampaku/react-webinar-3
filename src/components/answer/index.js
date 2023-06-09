import { memo } from 'react'
import PropTypes from 'prop-types';
import NoAnswer from '../no-answer'
import AnswerForm from '../answer-form';

function Answer({exist, type, onCancel, onSend}) {
  if (exist) {
    return <AnswerForm onSend={onSend} onCancel={onCancel} type={type}/>
  } else {
    return <NoAnswer type={type} onCancel={onCancel}/>
  }
}

export default memo(Answer);

Answer.propTypes = {
  exist: PropTypes.bool,
  type: PropTypes.oneOf(['comment', 'article']),
  onSend: PropTypes.func,
  onCancel: PropTypes.func,
};

Answer.defaultProps = {
  exist: false,
  type: 'article',
  onSend: () => {},
  onCancel: () => {},
}
