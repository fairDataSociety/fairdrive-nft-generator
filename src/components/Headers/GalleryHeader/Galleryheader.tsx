import { FC } from 'react';

import InfoIcon from '@media/UI/info.svg';

const GalleryHeader: FC = () => {
  return (
    <div className="w-full mt-4 mb-6">
      <h2 className="font-semibold text-2xl text-color-accents-purple-black">
        Your images
      </h2>

      <span className="inline-block w-28 my-2 border-b border-main-purple">
        {/* Horizontal Rule */}
      </span>

      <div className="flex justify-start items-center">
        <InfoIcon className="mr-2" />

        <span className="text-xs text-main-purple">
          Content that is in this pod does not include any shared content
        </span>
      </div>
    </div>
  );
};

export default GalleryHeader;
