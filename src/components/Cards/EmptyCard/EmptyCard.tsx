import { FC } from 'react';

import InfoDarkIcon from '@media/UI/info.svg';

const EmptyCard: FC = () => {
  return (
    <div className="flex justify-center items-center w-full pt-10">
      <div className="flex flex-col justify-center items-center w-80 h-72 text-center border border-color-shade-black-day shadow-soft-purple rounded-md">
        <span className="py-3 px-4 rounded shadow-soft-purple">
          <InfoDarkIcon className="inline-block" />
        </span>

        <div>
          <h2 className="mt-14 font-semibold text-2xl text-main-purple text-center">
            No Items
          </h2>

          <p className="mt-2 font-normal text-xs text-main-purple text-center">
            This folder has no images
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
