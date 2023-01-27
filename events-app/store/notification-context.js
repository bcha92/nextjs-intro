import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
    notification: null, // { title, message, status }
    showNotification: (notificationData) => { },
    hideNotification: () => { },
});

export const NotificationContextProvider = props => {
    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        if (activeNotification && (
            activeNotification.status === 'success' ||
            activeNotification.status === 'error'
        )) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000)

            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification])

    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    return (
        <NotificationContext.Provider value={{
            notification: activeNotification,
            showNotification: showNotificationHandler,
            hideNotification: hideNotificationHandler,
        }}>
            {props.children}
        </NotificationContext.Provider>
    )
};

export default NotificationContext;