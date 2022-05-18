import { FC, useContext, useState, useEffect } from 'react';

import PodContext from '@context/PodContext';

import { getFilesAndDirectories } from '@api/pod';
import { downloadFile, FileResponse } from '@api/files';

import shortenString from '@utils/shortenString';
import formatDate from '@utils/formatDate';

import NoImageIcon from '@media/UI/no-image.svg';

interface FolderCardProps {
  data: {
    name: string;
    creation_time: string;
  };
  onClick: () => void;
}

const FolderCard: FC<FolderCardProps> = ({ data, onClick }) => {
  const { activePod, directoryName } = useContext(PodContext);

  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    getFilesAndDirectories(
      activePod,
      directoryName === 'root' ? data.name : directoryName + '/' + data.name
    )
      .then((response) => {
        const files = response.files as unknown as FileResponse[];

        const imageTypes = ['png', 'jpg', 'jpeg', 'gif'];

        const firstImage = files.find((file) => {
          return imageTypes.includes(file.name.split('.').pop());
        });

        if (firstImage) {
          downloadFile({
            filename: firstImage.name,
            directory:
              directoryName === 'root'
                ? data.name
                : directoryName + '/' + data.name,
            podName: activePod,
          })
            .then((response) =>
              setImageSource(window.URL.createObjectURL(response))
            )
            .catch(() => {
              setImageSource(null);
            });
        }
      })
      .catch(() => console.log('Error: Could not fetch folders or images!'));
  }, []);

  return (
    <div className="w-80 h-80 mx-5 mb-14 cursor-pointer" onClick={onClick}>
      {imageSource ? (
        <img
          src={imageSource}
          alt={data.name}
          className="block w-80 h-72 rounded-lg hover:shadow-2xl"
        />
      ) : (
        <div className="flex justify-center items-center w-80 h-72 bg-button-blue rounded-lg hover:shadow-2xl">
          <NoImageIcon />
        </div>
      )}

      <div className="pt-3 pl-2">
        <span className="block font-medium text-base text-main-purple">
          {shortenString(data.name, 24)}
        </span>
        <span className="block font-normal text-xs text-main-purple">
          {formatDate(data?.creation_time, false)}
        </span>
      </div>
    </div>
  );
};

export default FolderCard;
