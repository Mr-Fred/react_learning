import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = ( ) => {
  const {message, type} = useSelector(state => state.notification)

  if (message === null) {
    return null;
  }

  return (
    <div className="container">
      {(message &&
        <Alert variant={type}> 
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;