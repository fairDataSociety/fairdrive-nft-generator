import { AppProps } from 'next/app';

import { UserProvider } from '@context/UserContext';
import { PodProvider } from '@context/PodContext';
import { SearchProvider } from '@context/SearchContext';

import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <PodProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </PodProvider>
    </UserProvider>
  );
}

export default MyApp;
