import  styles from './NavBar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

// {path!=='Feed' (<a className={styles.a}>Home</a>): ("")}
const NavBar = () => {
    const path=  useRouter()

    return (  
        <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet"/>
            <nav>
               <Link href="/">
                   <a className={styles.title}>Block<strong>Change</strong></a>
               </Link>
               <Link href="/Feed">
                    <div className={styles.home}>
                    {path.asPath!=='/Feed'? (<a className={styles.a}><strong>Home</strong></a>): ("")}
                    </div>
               </Link>
            </nav>
          </>
           )}
 
export default NavBar;