import { useState } from 'react';

import { Button, HomeViewWrapper } from '../components';

export enum ActionType {
  VIEW_BALANCE = 'viewBalance',
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
}

export const HomeView: React.FC = () => {
  const [actionType, setActionType] = useState<ActionType | undefined>(
    undefined
  );

  if (actionType === ActionType.VIEW_BALANCE) {
    return (
      <HomeViewWrapper>
        <>
          <div>Account Balance</div>
        </>
      </HomeViewWrapper>
    );
  }

  if (actionType === ActionType.WITHDRAW) {
    return (
      <HomeViewWrapper>
        <>
          <div>Withdraw</div>
        </>
      </HomeViewWrapper>
    );
  }
  if (actionType === ActionType.DEPOSIT) {
    return (
      <HomeViewWrapper>
        <>
          <div>Deposit</div>
        </>
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