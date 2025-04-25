import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { CustomNotifications } from "../../components";

export enum NotificationStatus {
	ERROR = "error",
	SUCCESS = "success",
}

interface Notification {
	id: string;
	message: string;
	type: NotificationStatus;
}

interface NotificationContextProps {
	notifications: Array<Notification>;
	showNotification: (message: string, type: NotificationStatus) => void;
}

const NotificationContext = createContext<NotificationContextProps>({} as NotificationContextProps);

const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
	const [notifications, setNotifications] = useState<Array<Notification>>([]);
	const notificationId = useRef(0);

	const showNotification = (message: string, type: NotificationStatus) => {
		const id = `notification-${notificationId.current++}`;
		const newNotification: Notification = {
			id,
			message,
			type,
		};

		setNotifications((prevNotifications) => [...prevNotifications, newNotification].slice(-5));
	};

	const removeNotification = (id: string) => {
		setNotifications((prevNotifications) =>
			prevNotifications.filter((notification) => notification.id != id)
		);
	};

	const store: NotificationContextProps = useMemo(
		() => ({ notifications, showNotification }),
		[notifications, showNotification]
	);

	return (
		<NotificationContext.Provider value={store}>
			{notifications.map((notification, index) => (
				<CustomNotifications
					key={notification.id}
					message={notification.message}
					type={notification.type}
					bottom={20 + (20 + 30) * index}
					onClose={() => removeNotification(notification.id)}
				></CustomNotifications>
			))}
			{children}
		</NotificationContext.Provider>
	);
};

export { NotificationProvider, useNotification };
