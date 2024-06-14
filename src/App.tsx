import { useState } from 'react';

import { HomeView, InitiateSessionView } from './views';

const App: React.FC = () => {
  const [accountPin, setAccountPin] = useState<string>('');

  const handleAccountPin = (newPin: string): void => {
    setAccountPin(newPin);
  };

  return (
    <div className='h-screen bg-gray-900'>
      <div className='w-full flex justify-between p-4 bg-gray-200'>
        <div>ATM</div>
        <button onClick={() => handleAccountPin('')}>Inactivate</button>
      </div>
      <div className='container flex flex-col justify-center items-center mx-auto h-full'>
        {accountPin ? (
          <HomeView />
        ) : (
          <InitiateSessionView handleAccountPin={handleAccountPin} />
        )}
      </div>
    </div>
  );
};

export default App;
