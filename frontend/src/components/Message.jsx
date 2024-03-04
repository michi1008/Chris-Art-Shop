import React from 'react';
import './Message.css';

const Message = ({ children, variant }) => {
  return <div className={`message ${variant}`}>{children}</div>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
