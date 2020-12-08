import React from 'react';

const ContextNotification = React.createContext({
    notifications: [],
    countNotifications: 0,
    setNotifications: () => {
    },
    setCountNotifications: () => {
    },
});

export default ContextNotification;
