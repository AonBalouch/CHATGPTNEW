import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className={`notification_error`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Notification;
