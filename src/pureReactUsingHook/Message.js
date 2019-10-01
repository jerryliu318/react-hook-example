
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Reply from './Reply';
import AddReply from './AddReply';

export default function Message({ message, role, onDeleteMessage, onAddReply, onDeleteReply }) {
  const [isSelected, setIsSelected] = useState(false);
  const messageRef = useRef(null);

  const messageClickFunc = useCallback((e) => {
    if (!messageRef.current) {
      return;
    }
    if (!messageRef.current.contains(e.target)) {
      setIsSelected(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', messageClickFunc);

    return () => {
      window.removeEventListener('click', messageClickFunc);
    };
  }, [messageClickFunc]);

  const onClickMessage = useCallback(() => {
    setIsSelected(!isSelected);
  }, [isSelected]);

  const onClickDeleteMessage = useCallback(() => {
    if (message.role === role) {
      onDeleteMessage(message.id);
    } else {
      alert('刪除失敗！');
    }
  }, [message.id, message.role, onDeleteMessage, role]);

  const onClickAddReply = useCallback((text) => {
    onAddReply(message.id, text);
  }, [message.id, onAddReply]);

  const onClickDeleteReply = useCallback((replyId) => {
    onDeleteReply(message.id, replyId);
  }, [message.id, onDeleteReply]);

  let style = 'input-group';
  if (isSelected) {
    style += ' border border-primary rounded';
  } else {
    style += ' border rounded';
  }

  return (
    <div ref={messageRef}>
      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-12" onClick={onClickMessage}>
            <div className={style}>
              <div className="input-group-prepend">
                <span className="input-group-text">{message.role}</span>
              </div>
              <div className="form-control d-flex justify-content-between align-items-center">
                <span className="p-2 text-break">{message.text}</span>
                <span className="badge badge-primary badge-pill mx-2">{message.replies.length}</span>
              </div>
              <div className="input-group-append">
                <button type="button" className="btn btn-danger" onClick={onClickDeleteMessage}>刪除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={isSelected ? { display: '' } : { display: 'none' }}>
        {
          message.replies.map((reply) => {
            const { id } = reply;
            return <Reply key={`reply_${id}`} role={role} reply={reply} onDeleteReply={onClickDeleteReply} />;
          })
        }
        <AddReply onAddReply={onClickAddReply} />
      </div>
      <hr />
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
  onAddReply: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
};
