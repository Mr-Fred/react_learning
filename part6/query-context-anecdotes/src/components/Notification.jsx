import { useNotificationValue } from '../notifHooks'

const Notification = () => {
  const { message, color } = useNotificationValue();

  if (!message) return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;