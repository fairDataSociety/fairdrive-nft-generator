import { FC } from 'react';

const GalleryTableHeader: FC = () => {
  const tableHeadingClasses =
    'pl-4 font-medium text-main-purple text-left text-base';

  return (
    <tr className="relative w-full h-16 bg-color-shade-dark-4-day border border-color-shade-dark-4-day shadow-sm">
      <th className={tableHeadingClasses}>File Name</th>
      <th className={tableHeadingClasses}>File Type</th>
      <th className={tableHeadingClasses}>File Size</th>
      <th className={tableHeadingClasses}>Created</th>
      <th>{/* Empty Table Header for Dropdown Menu */}</th>
    </tr>
  );
};

export default GalleryTableHeader;
