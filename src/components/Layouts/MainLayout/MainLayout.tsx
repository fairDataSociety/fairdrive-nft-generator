import { FC, ReactChild } from 'react';

import { MainNavigationBar, PodSideBar } from '@components/NavigationBars';

interface MainLayoutProps {
  children: ReactChild | ReactChild[];
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-16">
        <MainNavigationBar />
      </div>

      <div className="flex justify-items-stretch items-stretch w-full h-full mt-16 overflow-hidden">
        <div className="w-68 h-full">
          <PodSideBar />
        </div>

        <div className="w-full pt-10 px-10 overflow-scroll no-scroll-bar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
