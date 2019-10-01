
import React from 'react';
import PropTypes from 'prop-types';

import Reply from './Reply';
import AddReply from './AddReply';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
    this.messageRef = React.createRef();
    this.messageClickFunc = null;
  }

  componentDidMount() {
    this.messageClickFunc = (e) => {
      if (!this.messageRef.current) {
        return;
      }
      if (!this.messageRef.current.contains(e.target)) {
        this.setState({ isSelected: false });
      }
    };

    window.addEventListener('click', this.messageClickFunc);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.messageClickFunc);
  }

  onClickMessage = () => {
    const { isSelected } = this.state;
    this.setState({ isSelected: !isSelected });
  }

  onDeleteMessage = () => {
    const { onDeleteMessage, message, role } = this.props;
    if (message.role === role) {
      onDeleteMessage(message.id);
    } else {
      alert('刪除失敗！');
    }
  }

  onAddReply = (text) => {
    const { onAddReply, message } = this.props;
    onAddReply(message.id, text);
  }

  onDeleteReply = (replyId) => {
    const { onDeleteReply, message } = this.props;
    onDeleteReply(message.id, replyId);
  }

  render() {
    const { message, role } = this.props;
    const { isSelected } = this.state;
    const { text, replies, role: createRole } = message;
    let style = 'input-group';
    if (isSelected) {
      style += ' border border-primary rounded';
    } else {
      style += ' border rounded';
    }
    return (
      <div ref={this.messageRef}>
        <div className="container-fluid my-2">
          <div className="row">
            <div className="col-12" onClick={this.onClickMessage}>
              <div className={style}>
                <div className="input-group-prepend">
                  <span className="input-group-text">{createRole}</span>
                </div>
                <div className="form-control d-flex justify-content-between align-items-center">
                  <span className="p-2 text-break">{text}</span>
                  <span className="badge badge-primary badge-pill mx-2">{replies.length}</span>
                </div>
                <div className="input-group-append">
                  <button type="button" className="btn btn-danger" onClick={this.onDeleteMessage}>刪除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={isSelected ? { display: '' } : { display: 'none' }}>
          {
            replies.map((reply) => {
              const { id } = reply;
              return <Reply key={`reply_${id}`} role={role} reply={reply} onDeleteReply={this.onDeleteReply} />;
            })
        }
          <AddReply onAddReply={this.onAddReply} />
        </div>
        <hr />
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
  onAddReply: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
};
