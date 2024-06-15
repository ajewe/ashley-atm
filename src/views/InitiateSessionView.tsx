import { useEffect, useState } from 'react';

import { validateSession } from '../api';
import asteriskIcon from '../assets/asterisk.svg';
import { Button, PinCharacter, Spinner } from '../components';
import { NotificationType } from '../types';

type InitiateSessionViewProps = {
  handleAccountPin: (accountPin: string) => void;
  handleShowNotification: (message: string, type: NotificationType) => void;
};

export const InitiateSessionView: React.FC<InitiateSessionViewProps> = ({
  handleAccountPin,
  handleShowNotification,
}) => {
  const [pin, setPin] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePinClear = (): void => {
    setPin('');
  };

  const handleValidateSession = async (): Promise<void> => {
    setIsLoading(true);
    validateSession(pin)
      .then((res) => {
        setIsLoading(false);
        handleAccountPin(pin);
        handleShowNotification(res.message, NotificationType.SUCCESS);
      })
      .catch((err) => {
        setIsLoading(false);
        handleShowNotification(err.message, NotificationType.ERROR);
        handlePinClear();
      });
  };

  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      const eventKey = event.key;

      if (Number(eventKey) || eventKey === '0') {
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
    <div className='flex flex-col items-center w-3/5 min-w-72 py-12 gap-8 bg-violet-50 rounded'>
      <div className='h-24 w-1/2 flex bg-violet-200 min-w-60'>
        {pin.split('').map((char, i) => {
          return (
            <PinCharacter key={`pin-${char}-${i}`}>
              <img src={asteriskIcon} className='h-1/2' />
            </PinCharacter>
          );
        })}
        {pin.length < 4 ? <PinCharacter>_</PinCharacter> : null}
      </div>
      <div className='w-full flex p-4 gap-3'>
        <Button disabled={isLoading} handleClick={handlePinClear} isDestructive>
          Clear
        </Button>
        <Button disabled={isLoading} handleClick={handleValidateSession}>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </div>
    </div>
  );
};
