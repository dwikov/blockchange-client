import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import ProfileDefault from 'assets/images/profile-default.png';
import Image from 'next/image'
import styles from './Wallet.module.css';
import * as constants from './constants';
import { shortenAddress } from './utils';

const Wallet = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return <>
     <div className={styles.walletContainer}>
     {isConnected && address ? <>
        <div>{shortenAddress(address)}</div>
      </> : <>
        <button onClick={() => connect()}>Connect wallet</button>
      </>}
    </div>
  </>
};

export default Wallet;