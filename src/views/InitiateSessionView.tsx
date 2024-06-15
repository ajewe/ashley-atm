import { useEffect, useState } from 'react';
import { validateSession } from '../api';
import { Button, PinCharacter } from '../components';

import asteriskIcon from '../assets/asterisk.svg';
import { NotificationType } from '../App';

type InitiateSessionViewProps = {
  handleAccountPin: (accountPin: string) => void;
  handleShowNotification: (message: string, type: NotificationType) => void;
};

export const InitiateSessionView: React.FC<InitiateSessionViewProps> = ({
  handleAccountPin,
  handleShowNotification,
}) => {
  const [pin, setPin] = useState<string>('');
  // TODO - is loading

  const handlePinClear = (): void => {
    setPin('');
  };

  const handleValidateSession = async (): Promise<void> => {
    validateSession(pin)
      .then((res) => {
        handleAccountPin(pin);
        handleShowNotification(res.message, NotificationType.SUCCESS);
      })
      .catch((err) => {
        handleShowNotification(err.message, NotificationType.ERROR);
        handlePinClear();
      });
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

      // TODO - add enter
    };

    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, []);

  return (
    // TODO : screen reader?
    <div className='flex flex-col items-center w-3/5 min-w-72 py-12 gap-8 bg-purple-50 rounded'>
      <div className='h-24 w-1/2 flex bg-slate-200 min-w-60'>
        {pin.split('').map((char, i) => {
          return (
            <PinCharacter key={`pin-${char}-${i}`}>
              <img src={asteriskIcon} className='h-1/2' />
            </PinCharacter>
          );
        })}
        {pin.length < 4 ? <PinCharacter>_</PinCharacter> : null}
      </div>
      <div className='w-full flex p-4'>
        {/* disasble both buttons if processing session init, disable Submit if not valid 4 digit pin */}
        <Button
          disabled={false}
          displayText='Clear'
          handleClick={handlePinClear}
          isDestructive
        />
        <Button
          disabled={false}
          displayText='Submit'
          handleClick={handleValidateSession}
        />
      </div>
    </div>
  );
};
