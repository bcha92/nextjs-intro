import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

export default function Layout(props) {
    const notificiationCtx = useContext(NotificationContext);
    const activeNotification = notificiationCtx.notification;

    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
            {activeNotification && (
                <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status}
                />
            )}
        </Fragment>
    )
}