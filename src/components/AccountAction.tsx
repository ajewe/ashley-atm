import { useState } from 'react';

import { updateBalance } from '../api';
import { ActionType } from '../views';
import { Button } from './Button';

import { NotificationType } from '../App';

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

  const handleOnChange = (value: string): void => {
    if (Number(value) || value === '') {
      setInput(value);
    }
  };

  const handleBalanceUpdate = async (): Promise<void> => {
    if (input) {
      const formattedAmount = Number(input).toFixed(2);

      updateBalance(Number(formattedAmount), pin, type)
        .then((res) => {
          handleUnsetActionType();
          handleShowNotification(res.message, NotificationType.SUCCESS);
        })
        .catch((err) => {
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
        <Button
          displayText='Cancel'
          handleClick={handleUnsetActionType}
          isDestructive={true}
        />
        <Button
          disabled={!input}
          displayText='Submit'
          handleClick={handleBalanceUpdate}
        />
      </div>
    </div>
  );
};
