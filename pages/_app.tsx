import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import React from 'react';
import { IPetitionMap } from 'lib/hooks/usePetitions/types';
import { PetitionsContext } from 'lib/hooks/usePetitions';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'styles/theme';
import Loading from 'components/Loading/Loading';

const client = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
})

type PetitionsValueType = IPetitionMap | ((prev: IPetitionMap) => IPetitionMap);
type LoadingType = string | null;

interface ILoadingContext{
  value: LoadingType;
  setter: (_value: LoadingType | ((prev: LoadingType) => LoadingType)) => void;
}

export const LoadingContext = React.createContext<ILoadingContext>({ value: null, setter: (_value: LoadingType | ((prev: LoadingType) => LoadingType)) => {} });

function MyApp({ Component, pageProps }: AppProps) {
  const setPetitionsValue = (_value: PetitionsValueType) => {
    if (typeof _value === 'function') setPetitions(prev => ({ ...prev, value: _value(prev.value)}));
    else setPetitions(prev => ({...prev, value: _value }));
  };

  const [petitions, setPetitions] = React.useState({
    value: {},
    setter: setPetitionsValue,
  });
  
  const setLoadingValue =  (_value: LoadingType | ((prev: LoadingType) => LoadingType)) => {
    if (typeof _value === 'function') setLoading(prev => ({ ...prev, value: _value(prev.value)}));
    else setLoading(prev => ({...prev, value: _value }));
  };
  const [loading, setLoading] = React.useState<ILoadingContext>({
    value: null,
    setter: setLoadingValue,
  });

  return (
    <PetitionsContext.Provider value={petitions} >
      <LoadingContext.Provider value={loading}>
        <ThemeProvider theme={defaultTheme}>
          <WagmiConfig client={client}>
              <Component {...pageProps} />
          </WagmiConfig>
        </ThemeProvider>
      </LoadingContext.Provider>
    </PetitionsContext.Provider>
  );
}

export default MyApp
