import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import ProfileDefault from 'assets/images/profile-default.png';
import Image from 'next/image'
import styles from './Wallet.module.css';
import * as constants from './constants';
import { shortenAddress } from './utils';
import { Petitions } from 'components/Petitions/Petitions';

export const Wallet = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return <>
     <div className={styles.walletContainer}>
     {isConnected && address ? <>
        <Image src={ProfileDefault} layout="intrinsic" width={constants.IMAGE_WIDTH} height={constants.IMAGE_HEIGHT}/>
        <div>{shortenAddress(address)}</div>
        <Petitions/>
      </> : <>
        <button onClick={() => connect()}>Connect wallet</button>
      </>}
    </div>
  </>
};