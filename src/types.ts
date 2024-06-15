export enum ActionType {
  VIEW_BALANCE = 'viewBalance',
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
}

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export type NotificationData = {
  isOpen: boolean;
  message: string;
  type: NotificationType | undefined;
};
