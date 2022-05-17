import { FC, ReactChild } from 'react';

import { MainNavigationBar } from '@components/NavigationBars';

interface AuthenticationLayoutProps {
  children: ReactChild | ReactChild[];
}

const AuthenticationLayout: FC<AuthenticationLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-start w-screen h-screen bg-white">
      <div className="fixed top-0 left-0 w-full h-16">
        <MainNavigationBar hideComponents={true} />
      </div>

      <div className="w-full pt-36 overflow-scroll no-scroll-bar">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationLayout;
