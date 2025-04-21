import React from 'react';

interface NotificationProps {
  message: string | null;
  type: 'success' | 'error' | null;
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  if (message === null || type === null) {
    return null;
  }

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
