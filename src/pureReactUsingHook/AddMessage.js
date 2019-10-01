
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import useDebounce from './useDebounce';
import useParsingLink from './useParsingLink';

export default function AddMessage({ onAddMessage }) {
  const [input, setInput] = useState('');

  const debounceInput = useDebounce(input, 1500);
  const parsed = useParsingLink(debounceInput, 5000);

  const onChangeInput = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onClickAddMessage = useCallback(() => {
    onAddMessage(input);
    setInput('');
  }, [input, onAddMessage]);

  let parsedContent = null;
  if (parsed.status === 'loading') {
    parsedContent = (
      <div className="input-group justify-content-center text-info">
        {`parsing url loading: ${parsed.result} ...`}
      </div>
    );
  } else if (parsed.status === 'done') {
    parsedContent = (
      <div className="input-group justify-content-center text-success">
        {`parsing url success: ${parsed.result}`}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="input-group">
            {/* <div className="input-group-prepend">
                <span className="input-group-text">訊息</span>
              </div> */}
            <input id="msg" type="text" className="form-control shadow-none" name="msg" placeholder="寫點東西...." value={input} onChange={onChangeInput} />
            <div className="input-group-append">
              <button type="button" className="btn btn-primary shadow-none" onClick={onClickAddMessage}>送出</button>
            </div>
          </div>
          {parsedContent}
        </div>
      </div>
    </div>
  );
}

AddMessage.propTypes = {
  onAddMessage: PropTypes.func.isRequired,
};
