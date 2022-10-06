import  styles from './NavBar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Wallet from './Wallet/Wallet'

const NavBar = () => {
    const path=  useRouter()

    return (  
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet"/>
            <nav className={styles.nav}>
                <Link href="/">
                    <a className={styles.title}>Block<strong>Change</strong></a>
                </Link>
                <Link href="/feed">
                        <div className={styles.home}>
                            {path.asPath!=='/feed'? (<a className={styles.a}><strong>Home</strong></a>): ("")}
                        </div>
                </Link>
                <div className={styles.wallet}>
                    <Wallet/>
                </div>
            </nav>
        </>)};
 
export default NavBar;