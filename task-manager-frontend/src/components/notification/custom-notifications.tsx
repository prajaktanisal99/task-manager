import { useEffect, useState } from "react";
import "./notification.css";
import { NotificationStatus } from "../../context";
interface CustomNotificationsProps {
	message: string;
	type: NotificationStatus;
	onClose: () => void;
	bottom?: number;
}
export const CustomNotifications = ({
	message,
	type,
	onClose,
	bottom = 20,
}: CustomNotificationsProps): React.ReactNode => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		setIsVisible(true);

		const timer = setTimeout(() => {
			setIsVisible(false);

			setTimeout(() => {
				onClose();
			}, 500);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`notification ${type} ${isVisible ? "show" : "hide"}`}
			style={{ bottom: `${bottom}px` }}
		>
			{message}
		</div>
	);
};
