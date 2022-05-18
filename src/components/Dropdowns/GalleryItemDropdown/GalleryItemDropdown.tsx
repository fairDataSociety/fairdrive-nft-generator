import { FC, useContext, useState } from 'react';
import FileSaver from 'file-saver';

import PodContext from '@context/PodContext';

import { downloadFile } from '@api/files';

import { GalleryItemDropdownToggle } from '@components/Buttons';

interface DriveItemDropdownProps {
  type: 'folder' | 'file';
  data: {
    name: string;
  };
  openClick: () => void;
}

const DriveDropdown: FC<DriveItemDropdownProps> = ({
  type,
  data,
  openClick,
}) => {
  const { activePod, directoryName } = useContext(PodContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenClick = () => {
    setShowDropdown(false);
    openClick();
  };

  const handleDownloadClick = () => {
    setShowDropdown(false);

    downloadFile({
      filename: data?.name,
      directory: directoryName,
      podName: activePod,
    })
      .then((response) => {
        FileSaver.saveAs(response, data?.name);
      })
      .catch(() => {
        console.log('File could not be downloaded!');
      });
  };

  return (
    <div
      className="relative cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <GalleryItemDropdownToggle onClickHandler={handleToggleDropdown} />

      {showDropdown ? (
        <div className="absolute -left-32 w-48 p-5 bg-color-shade-dark-1-day text-left rounded-md shadow z-30">
          <h4 className="mb-3 pb-3 font-semibold text-color-shade-white-day text-base border-b-2 border-color-shade-light-1-day">
            Preview
          </h4>

          <div className="space-y-4">
            <span
              className="block w-auto font-normal text-color-shade-white-day text-base cursor-pointer"
              onClick={handleOpenClick}
            >
              Open
            </span>

            {type === 'file' ? (
              <span
                className="block w-auto font-normal text-color-shade-white-day text-base cursor-pointer"
                onClick={handleDownloadClick}
              >
                Download
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DriveDropdown;
