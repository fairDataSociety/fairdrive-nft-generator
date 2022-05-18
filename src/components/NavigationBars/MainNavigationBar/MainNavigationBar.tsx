import { FC, useState } from 'react';
import Link from 'next/link';

import Logo from '@media/branding/logo.svg';
import { SearchBar } from '@components/Inputs';
import { UserDropdownToggle } from '@components/Buttons';
import UserDropdown from './UserDropdown/UserDropdown';

interface MainNavigationBarProps {
  hideComponents?: boolean;
}

const MainNavigationBar: FC<MainNavigationBarProps> = ({ hideComponents }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <nav>
      <div className="flex justify-between items-center w-full h-16 px-6 bg-button-blue shadow-lg">
        <Link href="/">
          <a className="font-semibold text-3xl text-main-purple">
            NFT Generator
          </a>
        </Link>

        {hideComponents ? null : (
          <div className="flex justify-between items-center mr-4">
            <UserDropdownToggle
              onClickHandler={() => setShowUserDropdown(true)}
            />
          </div>
        )}
      </div>

      <UserDropdown
        showDropdown={showUserDropdown}
        setShowDropdown={setShowUserDropdown}
      />
    </nav>
  );
};

export default MainNavigationBar;
