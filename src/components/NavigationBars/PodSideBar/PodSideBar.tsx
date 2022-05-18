/* eslint-disable react-hooks/exhaustive-deps */

import { FC, useContext, useEffect } from 'react';

import PodContext from '@context/PodContext';
import UserContext from '@context/UserContext';

import { getPods, openPod } from '@api/pod';

import PodItem from '@components/NavigationBars/PodSideBar/PodItem/PodItem';

import sortAlphabetically from 'src/utils/sortAlphabetically';

const DriveSideBar: FC = () => {
  const {
    pods,
    setPods,
    activePod,
    setActivePod,
    openPods,
    setOpenPods,
    setDirectoryName,
  } = useContext(PodContext);
  const { password } = useContext(UserContext);

  useEffect(() => {
    if (!pods) {
      handleFetchPods();
    }
  }, []);

  const handleFetchPods = () => {
    getPods()
      .then((response) => {
        setPods(response);
      })
      .catch(() => console.log('Error: Pods could not be fetched!'));
  };

  const handleOpenPod = (podName: string) => {
    if (!openPods.includes(podName)) {
      openPod(podName, password)
        .then(() => {
          setOpenPods([...openPods, podName]);
        })
        .catch(() => console.log('Error: Pod could not be opened!'));
    }

    setActivePod(podName);
    setDirectoryName('root');
  };

  return (
    <div className="w-56 h-full px-5 bg-white shadow-xl overflow-scroll no-scroll-bar">
      <h2 className="my-6 font-semibold text-2xl text-main-purple">
        Your Pods
      </h2>

      <div className="mt-5 mb-16 text-center shadow-pod-item">
        {sortAlphabetically(pods?.pod_name).map((pod: string) => (
          <PodItem
            key={pod}
            podName={pod}
            isActivePod={pod === activePod}
            onClick={() => handleOpenPod(pod)}
          />
        ))}
      </div>
    </div>
  );
};

export default DriveSideBar;
