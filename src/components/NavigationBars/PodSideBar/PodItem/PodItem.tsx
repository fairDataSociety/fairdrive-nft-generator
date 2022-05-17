import { FC } from 'react';

import ArrowRight from '@media/UI/arrow-right.svg';

interface PodItemProps {
  podName: string;
  isActivePod: boolean;
  onClick: () => void;
}

const PodItem: FC<PodItemProps> = ({ podName, isActivePod, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${
        isActivePod
          ? 'bg-white border-r-3 border-color-accents-purple-heavy shadow-active-pod-item'
          : 'shadow-sm'
      } flex justify-between items-center w-full py-5 px-4 cursor-pointer`}
    >
      <span
        className={`text-main-purple ${
          isActivePod ? 'font-semibold' : 'font-normal'
        }`}
      >
        {podName}
      </span>

      <span>
        <ArrowRight className="inline-block ml-2" />
      </span>
    </div>
  );
};

export default PodItem;
