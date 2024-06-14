import { useEffect, useState } from 'react';
import { Button, PinCharacter } from '../components';

type InitiateSessionViewProps = {};

export const InitiateSessionView: React.FC<InitiateSessionViewProps> = ({}) => {
  const [pin, setPin] = useState<string>('');

  const handlePinClear = (): void => {
    setPin('');
  };

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      const eventKey = event.key;

      if (Number(eventKey)) {
        setPin((prevState) =>
          prevState.length < 4 ? (prevState += eventKey) : prevState
        );
      }

      if (eventKey === 'Backspace' || eventKey === 'Delete') {
        setPin((prevState) => {
          const prevStateArr = prevState.split('');

          prevStateArr.pop();
          return prevStateArr.join('');
        });
      }
    };

    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, []);

  return (
    // TODO : screen reader?
    <div className='flex flex-col items-center w-3/5 min-w-72 py-12 gap-8 bg-purple-50'>
      <div className='w-1/2 flex bg-slate-200 min-w-60'>
        {pin.split('').map((char, i) => {
          return <PinCharacter key={`pin-${char}-${i}`}>*</PinCharacter>;
        })}
        {pin.length < 4 ? (
          <PinCharacter>
            <div className='text-6xl'>_</div>
          </PinCharacter>
        ) : null}
      </div>
      <div className='w-full flex p-4'>
        {/* disasble both buttons if processing session init */}
        <Button
          disabled={true}
          displayText='Clear'
          handleClick={handlePinClear}
          isDestructive
        />
        <Button
          disabled={false}
          displayText='Submit'
          handleClick={() => console.log('Submit!')}
        />
      </div>
    </div>
  );
};
