import { useState } from 'react';

import { NotificationType } from '../App';
import {
  AccountAction,
  AccountBalance,
  Button,
  HomeViewWrapper,
} from '../components';

export enum ActionType {
  VIEW_BALANCE = 'viewBalance',
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
}

type HomeViewProps = {
  accountPin: string;
  handleShowNotification: (message: string, type: NotificationType) => void;
};

export const HomeView: React.FC<HomeViewProps> = ({
  accountPin,
  handleShowNotification,
}) => {
  const [actionType, setActionType] = useState<ActionType | undefined>(
    undefined
  );

  const handleUnsetActionType = (): void => {
    setActionType(undefined);
  };

  if (actionType === ActionType.VIEW_BALANCE) {
    return (
      <HomeViewWrapper>
        <AccountBalance
          handleUnsetActionType={handleUnsetActionType}
          pin={accountPin}
        />
      </HomeViewWrapper>
    );
  }

  if (actionType === ActionType.WITHDRAW) {
    return (
      <HomeViewWrapper>
        <AccountAction
          handleShowNotification={handleShowNotification}
          handleUnsetActionType={handleUnsetActionType}
          helperText='3K Daily Limit'
          pin={accountPin}
          type={ActionType.WITHDRAW}
        />
      </HomeViewWrapper>
    );
  }
  if (actionType === ActionType.DEPOSIT) {
    return (
      <HomeViewWrapper>
        <AccountAction
          handleShowNotification={handleShowNotification}
          handleUnsetActionType={handleUnsetActionType}
          pin={accountPin}
          type={ActionType.DEPOSIT}
        />
      </HomeViewWrapper>
    );
  }

  return (
    <HomeViewWrapper>
      <Button
        displayText='View Account Balance'
        handleClick={() => {
          setActionType(ActionType.VIEW_BALANCE);
          console.log('view account balance');
        }}
      />
      <Button
        displayText='Withdraw'
        handleClick={() => {
          setActionType(ActionType.WITHDRAW);
          console.log('withdraw');
        }}
      />
      <Button
        displayText='Deposit'
        handleClick={() => {
          setActionType(ActionType.DEPOSIT);
          console.log('deposit');
        }}
      />
    </HomeViewWrapper>
  );
};
