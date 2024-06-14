import { ReactElement } from 'react';

type PinCharacterProps = {
  children: ReactElement | string;
};

export const PinCharacter: React.FC<PinCharacterProps> = ({ children }) => {
  return (
    <div className='flex justify-center items-center w-1/4 text-center text-6xl'>
      {children}
    </div>
  );
};
