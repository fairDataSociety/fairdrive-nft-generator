import { FC, useContext } from 'react';
import router from 'next/router';

import UserContext from '@context/UserContext';
import { logout } from '@api/authentication';

interface UserDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (showModal: boolean) => void;
}

const UserDropdown: FC<UserDropdownProps> = ({
  showDropdown,
  setShowDropdown,
}) => {
  const { user } = useContext(UserContext);

  const disconnect = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <div
        className={`${showDropdown ? 'block' : 'hidden'} inset-0 fixed z-50`}
        onClick={() => setShowDropdown(false)}
      >
        <div className="relative w-full h-20 mx-auto">
          <div
            className="absolute top-14 right-6 w-72 py-4 px-4 bg-button-blue shadow-md rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pb-5 mr-5 mb-5 border-b-2 border-color-shade-light-1-day">
              {user}
            </div>

            <div>
              <div
                className="mb-4 text-color-status-negative-day cursor-pointer"
                onClick={disconnect}
              >
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
