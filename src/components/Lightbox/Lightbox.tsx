import '@babel/polyfill';
import { FC, useContext, useState, useEffect } from 'react';
import FileSaver from 'file-saver';

import PodContext from '@context/PodContext';

import { downloadFile, FileResponse } from '@api/files';

import CloseIcon from '@media/UI/close.svg';
import { Button } from '@components/Buttons';
import SwarmNFT from 'swarm-nft/SwarmNFT.min';
import { Bee } from '@ethersphere/bee-js';
import { providers } from 'ethers';
declare let window: any;
const bee = new Bee('https://gateway-proxy-bee-8-0.gateway.ethswarm.org');

interface LightboxProps {
  showLightbox: boolean;
  closeLightbox?: () => void;
  image: FileResponse;
}

const Lightbox: FC<LightboxProps> = ({
  showLightbox,
  closeLightbox,
  image,
}) => {
  const { activePod, directoryName } = useContext(PodContext);

  const [imageResponse, setImageResponse] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [userAdress, setUserAdress] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    downloadFile({
      filename: image.name,
      directory: directoryName || 'root',
      podName: activePod,
    })
      .then((response) => {
        setImageResponse(response);
        setImageSource(window.URL.createObjectURL(response));
      })
      .catch(() => {
        setImageSource(null);
      });
  }, []);

  const handleDownloadClick = async () => {
    try {
      setDisableButton(true);
      const provider = new providers.Web3Provider(window.ethereum, 'any');
      const signer = provider.getSigner();
      const instance = new SwarmNFT(bee, provider, signer, {
        erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469',
      });
      instance.setGatewayPostageBatchId();
      instance.setGatewayUrlTemplate(
        'https://gateway-proxy-bee-8-0.gateway.ethswarm.org/bzz/{reference}/'
      );
      const addresses = await provider.send('eth_requestAccounts', []);
      setUserAdress(addresses[0]);
      const file = new File([imageResponse], 'image.jpg');
      const result = await instance.uploadNFT(file, '.jpg', {
        title: image?.name,
      });
      const nftResult = await instance.mintNFT(addresses[0], result.metaUrl);
      await nftResult.wait();
      setDisableButton(false);
      return nftResult;
    } catch (error) {
      console.log(error);
      setDisableButton(false);
      return error;
    }
  };

  return (
    <>
      {showLightbox ? (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-50 overflow-hidden"
          onClick={closeLightbox}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-main-purple opacity-50 z-40">
            {/* Background Overlay */}
          </div>

          <div
            className="fixed top-5 right-5 z-50 w-10 h-10 cursor-pointer"
            onClick={closeLightbox}
          >
            <CloseIcon className="inline-block" />
          </div>

          <div className="absolute flex justify-center items-center w-full h-full z-50">
            <div onClick={(e) => e.stopPropagation()}>
              <div
                className={`flex flex-col w-108 h-auto p-6 text-color-accents-purple-black  bg-color-shade-dark-4-day effect-style-small-button-drop-shadow z-50 rounded`}
              >
                <div className="flex justify-between items-center mb-5 pb-4">
                  <h5 className="font-semibold text-xl">{image?.name}</h5>

                  <span onClick={closeLightbox} className="cursor-pointer">
                    <CloseIcon className="inline-block" />
                  </span>
                </div>

                {imageSource ? (
                  <div>
                    <img
                      src={imageSource}
                      alt={image.name}
                      className="block w-108 h-auto mb-4"
                    />

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="secondary"
                        label="Mint NFT"
                        onClick={handleDownloadClick}
                        disabled={disableButton}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Lightbox;
