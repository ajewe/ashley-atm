import { useState } from 'react';

import { InitiateSessionView } from './views';

const App: React.FC = () => {
  const [accountPin, setAccountPin] = useState<string>('');

  return (
    <div className='h-screen'>
      <div className='w-full flex justify-between p-4 bg-gray-200'>
        <div>ATM</div>
        <div>Inactivate</div>
      </div>
      <div className='container flex flex-col justify-center items-center mx-auto h-full'>
        {accountPin ? <div>Has account pin!</div> : <InitiateSessionView />}
      </div>
    </div>
  );
};

export default App;
