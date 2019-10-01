
import React from 'react';
import PropTypes from 'prop-types';

export default class Reply extends React.Component {
  onDeleteReply = (e) => {
    e.stopPropagation();

    const { reply, onDeleteReply, role } = this.props;
    if (reply.role === role) {
      onDeleteReply(reply.id);
    } else {
      alert('刪除失敗！');
    }
  }

  render() {
    const { reply } = this.props;
    const { text, role } = reply;
    return (
      <div className="container-fluid my-2">
        <div className="row align-middle">
          <div className="col-9 offset-1 pr-0">
            <div className="border-bottom rounded p-2 text-break">
              {`${role}: ${text}`}
            </div>
          </div>
          <button type="button" className="close" aria-label="Close" onClick={this.onDeleteReply}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

Reply.propTypes = {
  reply: PropTypes.object.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
