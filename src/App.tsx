import { useState } from 'react';

import { HeaderBanner, Notification } from './components';
import { NotificationData, NotificationType } from './types';
import { HomeView, InitiateSessionView } from './views';

const App: React.FC = () => {
  const [accountPin, setAccountPin] = useState<string>('');
  const [noti, setNoti] = useState<NotificationData>({
    isOpen: false,
    message: '',
    type: undefined,
  });

  const handleAccountPin = (newPin: string): void => {
    setAccountPin(newPin);
  };
  const handleClearNotification = (): void => {
    setNoti({
      isOpen: false,
      message: '',
      type: undefined,
    });
  };
  const handleShowNotification = (
    message: string,
    type: NotificationType
  ): void => {
    setNoti({
      isOpen: true,
      message,
      type,
    });

    setTimeout(handleClearNotification, 2000);
  };

  return (
    <div className='h-screen bg-violet-950 font-mono'>
      <HeaderBanner handleEndSession={() => handleAccountPin('')} />
      {noti.isOpen ? (
        <Notification
          handleClearNotification={handleClearNotification}
          message={noti.message}
          type={noti.type as NotificationType}
        />
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
