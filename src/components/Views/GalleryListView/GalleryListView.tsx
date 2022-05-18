import { FC, useState } from 'react';

import { FileResponse } from '@api/files';

import {
  GalleryTableHeader,
  GalleryTableItem,
  GalleryTableFooter,
} from '@components/Tables';

interface DriveListViewProps {
  folders: FileResponse[];
  images: FileResponse[];
  folderOnClick: (folderName: string) => void;
  imageOnClick: (data: FileResponse) => void;
}

const DriveListView: FC<DriveListViewProps> = ({
  folders,
  images,
  folderOnClick,
  imageOnClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageUp = () => {
    if (
      page + 1 <
      ((folders?.length | 0) + (images?.length | 0)) / rowsPerPage
    ) {
      setPage(page + 1);
    }
  };

  const handlePageDown = () => {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="w-full h-full mb-40">
      <table className="w-full h-auto table-auto shadow">
        <GalleryTableHeader />

        {folders
          ?.slice(page * rowsPerPage, page * rowsPerPage + (rowsPerPage + 1))
          .map((folder) => (
            <GalleryTableItem
              key={folder.name}
              type="folder"
              data={folder}
              onClick={() => folderOnClick(folder.name)}
            />
          ))}

        {images
          ?.slice(page * rowsPerPage, page * rowsPerPage + (rowsPerPage + 1))
          .map((data) => (
            <GalleryTableItem
              key={data.name}
              type="file"
              data={data}
              onClick={() => {
                imageOnClick(data);
              }}
            />
          ))}
      </table>

      <GalleryTableFooter
        page={page}
        rowsPerPage={rowsPerPage}
        totalGalleryItems={(folders?.length | 0) + (images?.length | 0)}
        updateRowsPerPage={(newRows: number) => {
          setRowsPerPage(newRows);
          setPage(0);
        }}
        pageUp={handlePageUp}
        pageDown={handlePageDown}
      />
    </div>
  );
};

export default DriveListView;
