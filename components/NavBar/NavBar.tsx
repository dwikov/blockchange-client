import  styles from './NavBar.module.css'
import Link from 'next/link'


const NavBar = () => {
    return (  
        <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>  
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans&family=Quicksand:wght@300&family=Rubik+Distressed&display=swap" rel="stylesheet"/>
            <nav>
               <Link href="/">
                   <a className={styles.title}>BlockChange</a>
               </Link>
            </nav>
          </>
           )}
 
export default NavBar;