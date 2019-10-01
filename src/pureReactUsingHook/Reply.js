
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

export default function Reply({ reply, role, onDeleteReply }) {
  const onClickDeleteReply = useCallback((e) => {
    e.stopPropagation();
    if (reply.role === role) {
      onDeleteReply(reply.id);
    } else {
      alert('刪除失敗！');
    }
  }, [onDeleteReply, reply.id, reply.role, role]);

  return (
    <div className="container-fluid my-2">
      <div className="row align-middle">
        <div className="col-9 offset-1 pr-0">
          <div className="border-bottom rounded p-2 text-break">
            {`${reply.role}: ${reply.text}`}
          </div>
        </div>
        <button type="button" className="close" aria-label="Close" onClick={onClickDeleteReply}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
