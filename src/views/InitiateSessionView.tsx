import { useState } from 'react';
import { Button, PinCharacter } from '../components';

type InitiateSessionViewProps = {};

export const InitiateSessionView: React.FC<InitiateSessionViewProps> = ({}) => {
  const [pin, setPin] = useState<string>('');

  // add document listener

  return (
    // TODO : screen reader?
    <div className='flex flex-col items-center w-3/5 min-w-72 py-12 gap-8 bg-purple-50'>
      <div className='w-1/2 flex bg-slate-200 min-w-60'>
        {pin.split('').map((char, i) => {
          return <PinCharacter key={`pin-${char}-${i}`}>*</PinCharacter>;
        })}
        {pin.length < 4 ? <PinCharacter>_</PinCharacter> : null}
      </div>
      <div className='w-full flex p-4'>
        <Button
          displayText='Clear'
          handleClick={() => console.log('Clear!')}
          isDestructive
        />
        <Button
          displayText='Submit'
          handleClick={() => console.log('Submit!')}
        />
      </div>
    </div>
  );
};
