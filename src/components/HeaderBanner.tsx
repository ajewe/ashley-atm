import leaveSessionIcon from '../assets/leaveSession.svg';

type HeaderBannerProps = {
  handleEndSession: () => void;
};

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  handleEndSession,
}) => {
  return (
    <div className='w-full flex justify-between py-4 px-8 bg-violet-300'>
      <div className='flex align-center text-2xl font-extrabold tracking-widest'>
        <img src='/favicon.svg' className='h-7 pr-4' /> ATM
      </div>
      <button onClick={handleEndSession} title='Leave session'>
        <img src={leaveSessionIcon} className='w-8 h-8' />
      </button>
    </div>
  );
};
