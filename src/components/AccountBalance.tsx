import { useEffect, useState } from 'react';

import { Button } from './Button';
import { fetchAccountBalance } from '../api';

import { NotificationType } from '../App';

type AccountBalanceProps = {
  handleShowNotification: (message: string, type: NotificationType) => void;
  handleUnsetActionType: () => void;
  pin: string;
};

export const AccountBalance: React.FC<AccountBalanceProps> = ({
  handleShowNotification,
  handleUnsetActionType,
  pin,
}) => {
  const [accountBalance, setAccountBalance] = useState<number | undefined>();

  useEffect(() => {
    fetchAccountBalance(pin)
      .then((res) => {
        setAccountBalance(res.accountBalance);
        handleShowNotification(res.message, NotificationType.SUCCESS);
      })
      .catch((err) => {
        handleShowNotification(err.message, NotificationType.ERROR);
        handleUnsetActionType();
      });
  }, []);
  return (
    <>
      <h1 className='text-2xl'>Account Balance: ${accountBalance}</h1>
      <Button displayText='Back' handleClick={handleUnsetActionType} />
    </>
  );
};
