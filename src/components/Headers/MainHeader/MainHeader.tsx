import { FC } from 'react';

import { Button } from '@components/Buttons';

import GalleryViewListIcon from '@media/UI/gallery-view-list.svg';
import GalleryViewGridIcon from '@media/UI/gallery-view-grid.svg';

import Sort from '@media/UI/sort.svg';

interface MainHeaderProps {
  title: string;
  galleryView: 'grid' | 'list';
  toggleView: () => void;
  toggleSort: () => void;
}

const MainHeader: FC<MainHeaderProps> = ({
  title,
  galleryView,
  toggleView,
  toggleSort,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-semibold text-lg text-main-purple">{title}</h2>

        <div>
          <Button
            type="button"
            variant="secondary"
            icon={
              galleryView === 'grid' ? (
                <GalleryViewListIcon />
              ) : (
                <GalleryViewGridIcon />
              )
            }
            className="mx-1"
            padding="p-3"
            onClick={toggleView}
          />

          <Button
            type="button"
            variant="secondary"
            icon={<Sort />}
            className="mx-1"
            padding="p-3"
            onClick={toggleSort}
          />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
