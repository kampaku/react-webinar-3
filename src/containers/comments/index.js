import { memo, useCallback } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import { useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";
import CommentsContainer from '../../components/comments-container';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import useSelector from "../../hooks/use-selector";

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
    dispatch(commentsActions.setAnswer(params.id, 'article'));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      comments: state.comments.comments,
      answerId: state.comments.answer.id,
      answerType: state.comments.answer.type,
    }),
    shallowequal
  );

  const session = useSelector(state => ({
    exists: state.session.exists,
    userId: state.session.user._id
  }));

  const callbacks = {
    cancelAnswer: useCallback(() => {
      dispatch(commentsActions.setAnswer(params.id, 'article'))
    }, []),
    setAnswer: useCallback((id) => {
      dispatch(commentsActions.setAnswer(id, 'comment'))
    }),
    sendComment: useCallback((text) => {
      dispatch(commentsActions.sendComment(text, select.answerId, select.answerType))
    }, [select.answerId, select.answerType])
  }

  return (
    <CommentsContainer
      count={select.comments.count}
      comments={treeToList(listToTree(select.comments.items), (item, level) => {
        return { ...item, level };
      })}
      exist={session.exists}
      show={params.id === select.answerId}
      id={select.answerId}
      onCancel={callbacks.cancelAnswer}
      onAnswer={callbacks.setAnswer}
      onSend={callbacks.sendComment}
    />
  );
}

export default memo(Comments);
