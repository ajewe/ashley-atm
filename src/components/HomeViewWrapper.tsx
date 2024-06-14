import { ReactElement } from 'react';

type HomeViewWrapperProps = {
  children: ReactElement | ReactElement[];
};

export const HomeViewWrapper: React.FC<HomeViewWrapperProps> = ({
  children,
}) => {
  return (
    <div className='flex flex-col w-3/5 min-w-72 p-12 gap-8 bg-purple-50'>
      {children}
    </div>
  );
};
