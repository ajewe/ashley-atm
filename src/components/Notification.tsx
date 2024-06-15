import closeIcon from '../assets/close.svg';
import { NotificationType } from '../types';

type NotificationProps = {
  handleClearNotification: () => void;
  message: string;
  type: NotificationType;
};

// TW Recipe: https://v1.tailwindcss.com/components/alerts
export const Notification: React.FC<NotificationProps> = ({
  handleClearNotification,
  message,
  type,
}) => {
  return (
    <div
      className={`w-full flex justify-between border px-4 py-3 rounded relative ${
        type === NotificationType.ERROR
          ? 'bg-rose-100 border-rose-400 text-rose-700'
          : 'bg-emerald-100 border-emerald-400 text-emerald-700'
      }`}
      role='alert'
    >
      <span className='inline-block'>{message}</span>
      <button onClick={handleClearNotification}>
        <img src={closeIcon} className='size-7' />
      </button>
    </div>
  );
};
