
import React from 'react';
import uuidv4 from 'uuid/v4';

import SwitchRole from './SwitchRole';
import AddMessage from './AddMessage';
import Message from './Message';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'user1',
      messages: [],
    };
  }

  componentDidMount() {
    // fake fetch
    setTimeout(() => {
      this.setState({ messages: [{ id: uuidv4(), role: 'user1', text: 'mock fetch data', replies: [] }] });
    }, 3000);
  }

  onChangeRole = (role) => {
    this.setState({ role });
  }

  onAddMessage = (text) => {
    const { role, messages } = this.state;
    const newMessages = [...messages];
    newMessages.push({ id: uuidv4(), role, text, replies: [] });
    this.setState({ messages: newMessages });
  }

  onDeleteMessage = (messageId) => {
    const { messages } = this.state;
    const newMessage = messages.filter((obj) => obj.id !== messageId);
    this.setState({ messages: newMessage });
  }

  onAddReply = (messageId, text) => {
    const { role, messages } = this.state;
    const newMessages = [...messages];
    const foundIndex = newMessages.findIndex((obj) => obj.id === messageId);
    if (foundIndex > -1) {
      newMessages[foundIndex].replies.push({ id: uuidv4(), role, text });
      this.setState({ messages: newMessages });
    }
  }

  onDeleteReply = (messageId, replyId) => {
    const { messages } = this.state;
    const newMessages = [...messages];
    const foundIndex = newMessages.findIndex((obj) => obj.id === messageId);
    if (foundIndex > -1) {
      const newReplies = newMessages[foundIndex].replies.filter((obj) => obj.id !== replyId);
      newMessages[foundIndex].replies = newReplies;
      this.setState({ messages: newMessages });
    }
  }

  render() {
    const { role, messages } = this.state;
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <SwitchRole role={role} onChangeRole={this.onChangeRole} />
            <AddMessage onAddMessage={this.onAddMessage} />
            <hr />
            {
              messages.map((message) => {
                const { id } = message;
                return (
                  <Message
                    key={`message_${id}`}
                    role={role}
                    message={message}
                    onDeleteMessage={this.onDeleteMessage}
                    onAddReply={this.onAddReply}
                    onDeleteReply={this.onDeleteReply}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
