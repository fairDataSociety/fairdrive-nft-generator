import { FC } from 'react';
import prettyBytes from 'pretty-bytes';

import { GalleryItemDropdown } from '@components/Dropdowns';

import shortenString from '@utils/shortenString';
import formatDate from '@utils/formatDate';

interface DriveTableItemProps {
  type: 'folder' | 'file';
  data: {
    name: string;
    size: string;
    creation_time: string;
  };
  onClick: () => void;
}

const DriveTableItem: FC<DriveTableItemProps> = ({ type, data, onClick }) => {
  const tableDataClasses = 'pl-4 font-normal text-main-purple text-left';

  return (
    <tr
      className="w-full h-14 even:bg-color-shade-dark-3-day odd:bg-color-shade-dark-4-day border border-color-shade-black-day shadow-sm cursor-pointer"
      onClick={onClick}
    >
      <td className={`${tableDataClasses} `}>
        {shortenString(data.name.split('.').shift(), 24)}
      </td>
      <td className={`${tableDataClasses}`}>
        {type === 'file' ? data.name.split('.').pop().toUpperCase() : '-'}
      </td>
      <td className={`${tableDataClasses}`}>
        {type === 'file' ? prettyBytes(parseInt(data?.size)) : '-'}
      </td>
      <td className={`${tableDataClasses}`}>
        {formatDate(data?.creation_time, false)}
      </td>
      <td className="text-center">
        <GalleryItemDropdown type={type} data={data} openClick={onClick} />
      </td>
    </tr>
  );
};

export default DriveTableItem;
