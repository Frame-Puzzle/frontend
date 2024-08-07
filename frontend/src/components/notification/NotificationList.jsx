import "./NotificationList.css";
import NotificationItem from "./NotificationItem";

const NotificationList = ({ notifications }) => {
  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.notificationId}
          item={notification}
        />
      ))}
    </div>
  );
};

export default NotificationList;
