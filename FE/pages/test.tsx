import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { actions, RESET_TEXT } from '../reducers/testReducer';

const Test = () => {
  const { no, text } = useSelector((state: RootState) => state.testReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: RESET_TEXT,
    });
  }, []);

  const addTextHandler = () => {
    const value = 'world';

    dispatch(actions.addText({ no: 10, text: value }));
  };

  return (
    <>
      <p>no: {no}</p>
      <p>text: {text || ''}</p>
      <div>
        <button onClick={addTextHandler}>버튼</button>
      </div>
    </>
  );
};

export default Test;
