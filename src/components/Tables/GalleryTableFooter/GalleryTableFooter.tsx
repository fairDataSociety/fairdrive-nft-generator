import { FC } from 'react';

import { Select } from '@components/Inputs';

import PageUpIcon from '@media/UI/page-up.svg';
import PageDownIcon from '@media/UI/page-down.svg';

interface GalleryTableFooterProps {
  page: number;
  rowsPerPage: number;
  totalGalleryItems: number;
  updateRowsPerPage: (newRows: number) => void;
  pageUp: () => void;
  pageDown: () => void;
}

const GalleryTableFooter: FC<GalleryTableFooterProps> = ({
  page,
  rowsPerPage,
  totalGalleryItems,
  updateRowsPerPage,
  pageUp,
  pageDown,
}) => {
  const rowsPerPageOptions = [
    {
      value: '10',
      label: '10',
    },
    {
      value: '20',
      label: '20',
    },
    {
      value: '50',
      label: '50',
    },
    {
      value: '100',
      label: '100',
    },
  ];

  const handleUpdateRowsPerPage = (value: string) => {
    updateRowsPerPage(parseInt(value));
  };

  return (
    <div className="flex justify-end items-center w-full h-16 pr-4 font-medium text-color-accents-plum-black dark:text-color-shade-light-1-night bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night shadow">
      <div className="px-5">
        <span className="inline-block mr-2">Rows per page:</span>

        <Select
          name="Rows Per Page"
          options={rowsPerPageOptions}
          updateValue={handleUpdateRowsPerPage}
        />
      </div>

      <div className="px-5">
        {`
        ${page * rowsPerPage + 1}-${
          page * rowsPerPage + rowsPerPage > totalGalleryItems
            ? totalGalleryItems
            : page * rowsPerPage + rowsPerPage
        } of
        ${totalGalleryItems}`}
      </div>

      <div className="px-5">
        <span className="inline-block mr-3 cursor-pointer" onClick={pageDown}>
          <PageDownIcon />
        </span>
        <span className="inline-block ml-3 cursor-pointer" onClick={pageUp}>
          <PageUpIcon />
        </span>
      </div>
    </div>
  );
};

export default GalleryTableFooter;
