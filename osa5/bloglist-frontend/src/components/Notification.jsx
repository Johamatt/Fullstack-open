import { TYPEMSG } from "../App";

const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null;
  }

  return (
    <div style={{
      color: notificationType === TYPEMSG.ERROR ? "red" : "green",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    }}>
      {message}
    </div>
  );
};
export default Notification;