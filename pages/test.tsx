import { Wallet } from "components/Wallet/Wallet";
import { Petitions } from "components/Petitions/Petitions";
import { NextPage } from "next";
import Head from 'next/head'
import styles from '../styles/Home.module.css'


const Test: NextPage = () => {
  return <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <Wallet/>
    </main>
  </div>
}

export default Test;