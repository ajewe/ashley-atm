import { useState } from 'react';

const App: React.FC = () => {
  const [accountPin, setAccountPin] = useState<string>('');

  return (
    <div className='h-screen'>
      <div className='w-full flex justify-between p-4 bg-gray-200'>
        <div>ATM</div>
        <div>Inactivate</div>
      </div>
      <div className='container flex flex-col justify-center items-center bg-green-300 mx-auto h-full'>
        Start!
        {accountPin ? <div>Has account pin!</div> : <div>No account pin!</div>}
      </div>
    </div>
  );
};

export default App;
