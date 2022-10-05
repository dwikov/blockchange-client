import type { NextPage } from 'next'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
    
         
     
  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet"/>
    <div className={styles.conatiner}>
    <div className={styles.Home}>
    <div className={styles.OverLay}>
  
        <div className={styles.HomeContent}>
        <a className={styles.title}>Block<strong>Change</strong> </a>
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
</>
  )
}

export default Home
