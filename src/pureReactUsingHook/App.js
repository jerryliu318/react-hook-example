import React, { useState, useEffect, useCallback } from 'react';
import uuidv4 from 'uuid/v4';

import SwitchRole from './SwitchRole';
import AddMessage from './AddMessage';
import Message from './Message';

export default function App() {
  const [role, setRole] = useState('user1');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMessages([{ id: uuidv4(), role, text: 'mock fetch data', replies: [] }]);
    }, 3000);
  }, [role]);

  const onChangeRole = useCallback((r) => {
    setRole(r);
  }, []);

  const onAddMessage = useCallback((text) => {
    const newMessages = [...messages];
    newMessages.push({ id: uuidv4(), role, text, replies: [] });
    setMessages(newMessages);
  }, [messages, role]);

  const onDeleteMessage = useCallback((messageId) => {
    const newMessages = messages.filter((obj) => obj.id !== messageId);
    setMessages(newMessages);
  }, [messages]);

  const onAddReply = useCallback((messageId, text) => {
    const newMessages = [...messages];
    const foundIndex = newMessages.findIndex((obj) => obj.id === messageId);
    if (foundIndex > -1) {
      newMessages[foundIndex].replies.push({ id: uuidv4(), role, text });
      setMessages(newMessages);
    }
  }, [role, messages]);

  const onDeleteReply = useCallback((messageId, replyId) => {
    const newMessages = [...messages];
    const foundIndex = newMessages.findIndex((obj) => obj.id === messageId);
    if (foundIndex > -1) {
      const newReplies = newMessages[foundIndex].replies.filter((obj) => obj.id !== replyId);
      newMessages[foundIndex].replies = newReplies;
      setMessages(newMessages);
    }
  }, [messages]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <SwitchRole role={role} onChangeRole={onChangeRole} />
          <AddMessage onAddMessage={onAddMessage} />
          <hr />
          {
            messages.map((message) => {
              const { id } = message;
              return (
                <Message
                  key={`message_${id}`}
                  role={role}
                  message={message}
                  onDeleteMessage={onDeleteMessage}
                  onAddReply={onAddReply}
                  onDeleteReply={onDeleteReply}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
