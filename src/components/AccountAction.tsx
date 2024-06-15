import { useState } from 'react';

import { updateBalance } from '../api';
import { ActionType, NotificationType } from '../types';
import { Button } from './Button';
import { Spinner } from './Spinner';

type AccountActionProps = {
  handleShowNotification: (message: string, type: NotificationType) => void;
  handleUnsetActionType: () => void;
  helperText?: string;
  pin: string;
  type: ActionType.DEPOSIT | ActionType.WITHDRAW;
};

export const AccountAction: React.FC<AccountActionProps> = ({
  handleShowNotification,
  handleUnsetActionType,
  helperText,
  pin,
  type,
}) => {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (value: string): void => {
    if (Number(value) || value === '') {
      setInput(value);
    }
  };

  const handleBalanceUpdate = async (): Promise<void> => {
    if (input) {
      setIsLoading(true);
      const formattedAmount = Number(input).toFixed(2);

      updateBalance(Number(formattedAmount), pin, type)
        .then((res) => {
          const successString = `${res.message} New Account Balance: $${res.accountBalance}.`;

          setIsLoading(false);
          handleUnsetActionType();
          handleShowNotification(successString, NotificationType.SUCCESS);
        })
        .catch((err) => {
          setIsLoading(false);
          handleShowNotification(err.message, NotificationType.ERROR);
        });
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl'>
        {type.charAt(0).toUpperCase() + type.slice(1)} Amount:{' '}
      </h1>
      <input
        type='text'
        name={type + '-input-element'}
        value={input}
        className='border border-gray-500 rounded-md p-2'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange(e.target.value)
        }
      />
      {helperText ? <span className='self-end'>{helperText}</span> : null}
      <div className='w-full flex p-4 gap-3'>
        <Button handleClick={handleUnsetActionType} isDestructive={true}>
          Cancel
        </Button>
        <Button
          disabled={!input || isLoading}
          handleClick={handleBalanceUpdate}
        >
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </div>
    </div>
  );
};
