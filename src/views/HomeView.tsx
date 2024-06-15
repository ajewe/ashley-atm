import { useState } from 'react';

import { ActionType, NotificationType } from '../types';
import {
  AccountAction,
  AccountBalance,
  Button,
  HomeViewWrapper,
} from '../components';

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
          handleShowNotification={handleShowNotification}
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
        handleClick={() => {
          setActionType(ActionType.VIEW_BALANCE);
        }}
      >
        View Account Balance
      </Button>
      <Button
        handleClick={() => {
          setActionType(ActionType.WITHDRAW);
        }}
      >
        Withdraw
      </Button>
      <Button
        handleClick={() => {
          setActionType(ActionType.DEPOSIT);
        }}
      >
        Deposit
      </Button>
    </HomeViewWrapper>
  );
};
