import { FC } from 'react';

import DropdownMenuIcon from '@media/UI/dropdown-menu.svg';

interface DriveItemDropdownToggleProps {
  onClickHandler: () => void;
}

const DriveItemDropdownToggle: FC<DriveItemDropdownToggleProps> = ({
  onClickHandler,
}) => {
  return (
    <button
      className="py-2 px-4 cursor-pointer"
      onClick={() => onClickHandler()}
    >
      <DropdownMenuIcon />
    </button>
  );
};

export default DriveItemDropdownToggle;
