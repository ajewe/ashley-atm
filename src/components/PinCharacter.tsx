import { ReactElement } from 'react';

type PinCharacterProps = {
  children: ReactElement | any; // TODO
};

export const PinCharacter: React.FC<PinCharacterProps> = ({ children }) => {
  return <div className='w-1/4 text-center'>{children}</div>;
};
