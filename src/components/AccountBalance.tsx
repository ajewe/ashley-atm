import { useEffect, useState } from 'react';

import { fetchAccountBalance } from '../api';
import { NotificationType } from '../types';
import { Button } from './Button';
import { Spinner } from './Spinner';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetchAccountBalance(pin)
      .then((res) => {
        setIsLoading(false);
        setAccountBalance(res.accountBalance);
        handleShowNotification(res.message, NotificationType.SUCCESS);
      })
      .catch((err) => {
        setIsLoading(false);
        handleShowNotification(err.message, NotificationType.ERROR);
        handleUnsetActionType();
      });
  }, []);

  return (
    <>
      <h1 className='text-2xl inline'>
        Account Balance:{' '}
        {isLoading ? (
          <div className='pt-2'>
            <Spinner />
          </div>
        ) : (
          '$' + accountBalance
        )}
      </h1>
      <Button handleClick={handleUnsetActionType}>Back</Button>
    </>
  );
};
