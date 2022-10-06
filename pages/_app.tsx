import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import React from 'react';
import { IPetitionMap } from 'lib/hooks/usePetitions/types';
import { PetitionsContext } from 'lib/hooks/usePetitions';

const client = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
})

type IPetitionsValue = IPetitionMap | ((prev: IPetitionMap) => IPetitionMap);

function MyApp({ Component, pageProps }: AppProps) {
  const setPetitionsValue = (_value: IPetitionsValue) => {
    if (typeof _value === 'function') setPetitions(prev => ({ ...prev, value: _value(prev.value)}));
    else setPetitions(prev => ({...prev, value: _value }));
  };

  const [petitions, setPetitions] = React.useState({
    value: {},
    setter: setPetitionsValue,
  });

  return (
    <PetitionsContext.Provider value={petitions} >
      <WagmiConfig client={client}>
          <Component {...pageProps} />
      </WagmiConfig>
    </PetitionsContext.Provider>
  );
}

export default MyApp
