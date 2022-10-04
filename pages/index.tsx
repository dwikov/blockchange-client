import type { NextPage } from 'next'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
    
         
     
  return (
    <div className={styles.conatiner}>
    <div className={styles.Home}>
    <div className={styles.OverLay}>
         <NavBar/>
        <div className={styles.HomeContent}>
        <h1 className={styles.Title}>we are creative agency</h1>
        <p className={styles.HomeDiscription}>We change everything WordPress.
           One WP theme at a time.</p>
        <Link href="/Feed">
        <button className={styles.BtnStart}>Get started</button>
        </Link>
    </div>
   </div>
  </div>
</div>
  )
}

export default Home
