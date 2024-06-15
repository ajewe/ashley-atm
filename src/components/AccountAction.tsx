import { useState } from 'react';

import { updateBalance } from '../api';
import { ActionType } from '../views';
import { Button } from './Button';

import { NotificationType } from '../App';

type AccountActionProps = {
  handleShowNotification: (message: string, type: NotificationType) => void;
  handleUnsetActionType: () => void;
  pin: string;
  type: ActionType.DEPOSIT | ActionType.WITHDRAW;
};

export const AccountAction: React.FC<AccountActionProps> = ({
  handleShowNotification,
  handleUnsetActionType,
  pin,
  type,
}) => {
  const [input, setInput] = useState<string>('');

  const handleOnChange = (input: string): void => {
    // TODO format amount on send back to 2 dec maybe on unfocus or w/e
    setInput(input);
  };

  const handleBalanceUpdate = async (): Promise<void> => {
    updateBalance(input, pin, type)
      .then((res) => {
        console.log(res);
        handleUnsetActionType();
        handleShowNotification(res.message, NotificationType.SUCCESS);
      })
      .catch((err) => {
        handleShowNotification(err.message, NotificationType.ERROR);
      });
  };

  return (
    <>
      <div>
        <span>{type.charAt(0).toUpperCase() + type.slice(1)} Amount: </span>
        <input
          type='text'
          name={type + '-input-element'}
          value={input}
          className='border border-gray-500 rounded-md p-2'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e.target.value)
          }
        />
      </div>
      <div className='w-full flex p-4'>
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
    </>
  );
};
