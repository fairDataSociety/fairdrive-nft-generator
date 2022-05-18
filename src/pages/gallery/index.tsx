/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect } from 'react';

import PodContext from '@context/PodContext';
import SearchContext from '@context/SearchContext';

import { getFilesAndDirectories } from '@api/pod';
import { FileResponse } from '@api/files';

import { MainLayout } from '@components/Layouts';
import { MainHeader, GalleryHeader } from '@components/Headers';
import { GalleryGridView, GalleryListView } from '@components/Views';
import { EmptyDirectoryCard } from '@components/Cards';

import SearchResultsIcon from '@media/UI/search-results.svg';
import Lightbox from '@components/Lightbox/Lightbox';

const Gallery: FC = () => {
  const { activePod, openPods, directoryName, setDirectoryName } =
    useContext(PodContext);
  const { search, updateSearch } = useContext(SearchContext);

  const [folders, setFolders] = useState(null);
  const [images, setImages] = useState(null);

  const [galleryView, setGalleryView] = useState<'grid' | 'list'>('grid');
  const [gallerySort, setGallerySort] = useState('a-z');

  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activePod) handleFetchDrive();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [activePod, directoryName, openPods]);

  useEffect(() => {
    updateSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchDrive = async () => {
    getFilesAndDirectories(activePod, directoryName || 'root')
      .then((response) => {
        setImages(response.files);
        setFolders(response.dirs);
      })
      .catch(() => console.log('Error: Could not fetch folders or images!'));
  };

  const handleToggleView = () => {
    if (galleryView === 'grid') {
      setGalleryView('list');
    } else {
      setGalleryView('grid');
    }
  };

  const handleToggleSort = () => {
    if (gallerySort === 'a-z') {
      setGallerySort('z-a');
    } else {
      setGallerySort('a-z');
    }
  };

  const handleSort = (data: { name: string }[]): any[] => {
    return data?.sort((a, b) =>
      (gallerySort === 'a-z' ? a.name > b.name : a.name < b.name) ? 1 : -1
    );
  };

  const handleFilterImages = (image: FileResponse) => {
    const imageTypes = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

    const imageExtension = image.name.split('.').pop();

    return imageTypes.includes(imageExtension);
  };

  const handleSearchFilter = (driveItem: FileResponse) => {
    return driveItem.name.toLowerCase().includes(search.toLocaleLowerCase());
  };

  const handleFolderOnClick = (newDirectoryName: string) => {
    if (!loading) {
      setLoading(true);

      if (directoryName !== 'root') {
        setDirectoryName(directoryName + '/' + newDirectoryName);
      } else {
        setDirectoryName(newDirectoryName);
      }

      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  };

  const handleImageOnClick = (image: FileResponse) => {
    setLightboxImage(image);
    setShowLightbox(true);
  };

  return (
    <MainLayout>
      <MainHeader
        title={`${activePod} | ${directoryName}`}
        galleryView={galleryView}
        toggleView={handleToggleView}
        toggleSort={handleToggleSort}
      />

      <GalleryHeader />

      {search.length > 0 ? (
        <div className="flex justify-start items-center mt-10 mb-5">
          <span>
            <SearchResultsIcon className="inline-block mr-2" />
          </span>

          <span className="text-2xl font-semibold text-color-accents-grey-lavendar">
            {search}
          </span>
        </div>
      ) : null}

      {folders?.length || images?.length ? (
        <div>
          {galleryView === 'grid' ? (
            <GalleryGridView
              folders={handleSort(folders?.filter(handleSearchFilter))}
              images={handleSort(
                images?.filter(handleFilterImages).filter(handleSearchFilter)
              )}
              folderOnClick={handleFolderOnClick}
              imageOnClick={handleImageOnClick}
            />
          ) : null}

          {galleryView === 'list' ? (
            <GalleryListView
              folders={handleSort(folders?.filter(handleSearchFilter))}
              images={handleSort(
                images?.filter(handleFilterImages).filter(handleSearchFilter)
              )}
              folderOnClick={handleFolderOnClick}
              imageOnClick={handleImageOnClick}
            />
          ) : null}
        </div>
      ) : (
        <EmptyDirectoryCard />
      )}

      {showLightbox ? (
        <Lightbox
          showLightbox={showLightbox}
          closeLightbox={() => setShowLightbox(false)}
          image={lightboxImage}
        />
      ) : null}
    </MainLayout>
  );
};

export default Gallery;
