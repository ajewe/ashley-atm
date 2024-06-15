import { useState } from 'react';

import { HomeView, InitiateSessionView } from './views';

// TODO - put in types file
type Notification = {
  isOpen: boolean;
  message: string;
  type: NotificationType | undefined;
};

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
}

const App: React.FC = () => {
  const [accountPin, setAccountPin] = useState<string>('');
  const [notification, setNotification] = useState<Notification>({
    isOpen: false,
    message: '',
    type: undefined,
  });

  const handleAccountPin = (newPin: string): void => {
    setAccountPin(newPin);
  };
  const handleNotificationClose = (): void => {
    setNotification((prevState) => {
      return {
        ...prevState,
        isOpen: false,
      };
    });
  };
  const handleShowNotification = (
    message: string,
    type: NotificationType
  ): void => {
    setNotification({
      isOpen: true,
      message,
      type,
    });

    setTimeout(handleNotificationClose, 2000);
  };

  return (
    <div className='h-screen bg-gray-900'>
      <div className='w-full flex justify-between p-4 bg-gray-200'>
        <div>ATM</div>
        <button onClick={() => handleAccountPin('')}>Inactivate</button>
      </div>

      {notification.isOpen ? (
        <div
          className={`w-full flex justify-between ${
            notification.type === NotificationType.ERROR
              ? 'bg-red-500'
              : 'bg-green-500'
          } px-4 py-1`}
        >
          <span className='inline-block'>{notification.message}</span>
          <button onClick={handleNotificationClose}>X</button>
        </div>
      ) : null}

      <div className='container flex flex-col justify-center items-center mx-auto h-full'>
        {accountPin ? (
          <HomeView
            accountPin={accountPin}
            handleShowNotification={handleShowNotification}
          />
        ) : (
          <InitiateSessionView
            handleAccountPin={handleAccountPin}
            handleShowNotification={handleShowNotification}
          />
        )}
      </div>
    </div>
  );
};

export default App;
