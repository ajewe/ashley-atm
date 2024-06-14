import { useEffect, useState } from 'react';

import { Button } from './Button';
import { fetchAccountBalance } from '../api';

type AccountBalanceProps = {
  handleUnsetActionType: () => void;
  pin: string;
};

export const AccountBalance: React.FC<AccountBalanceProps> = ({
  handleUnsetActionType,
  pin,
}) => {
  const [accountBalance, setAccountBalance] = useState<number | undefined>();

  useEffect(() => {
    // fetch on mount
    fetchAccountBalance(pin)
      .then((res) => {
        console.log(res);
        setAccountBalance(res.accountBalance);
        // TODO noti?
      })
      .catch((err) => {
        console.log('err', err.message);
        // TODO - set a noti
        // TODO - just nav back if err
      });
  }, []);
  return (
    <>
      <div>Account Balance: {accountBalance}</div>
      <Button displayText='Back' handleClick={handleUnsetActionType} />
    </>
  );
};
