import { FC } from 'react';

import { FileResponse } from '@api/files';

import { FolderCard, ImageCard } from '@components/Cards';

interface GalleryGridViewProps {
  folders: FileResponse[];
  images: FileResponse[];
  folderOnClick: (folderName: string) => void;
  imageOnClick: (data: FileResponse) => void;
}

const GalleryGridView: FC<GalleryGridViewProps> = ({
  folders,
  images,
  folderOnClick,
  imageOnClick,
}) => {
  return (
    <div className="pb-20">
      <div className="flex flex-wrap h-auto">
        {folders?.map((folder) => (
          <FolderCard
            key={folder.name}
            data={folder}
            onClick={() => folderOnClick(folder.name)}
          />
        ))}
      </div>

      <div className="flex flex-wrap mt-5 pb-24">
        {images?.map((image) => (
          <ImageCard
            key={image.name}
            data={image}
            onClick={() => imageOnClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryGridView;
