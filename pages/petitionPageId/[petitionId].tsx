import { useRouter } from 'next/router'
import styles from "./PageWithId.module.css"
import NavBar from '../../components/NavBar/NavBar'

const PageWithId = () => {

    const router = useRouter()
    const  petition  = router.query

    return ( 
      <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
   <link rel="preconnect" href="https://fonts.gstatic.com" />
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet"/>
      <div className={styles.container}>
                <NavBar/>
        <article className={styles.singlePetition}>

               <div className={styles.PetitionName}>          
                  <h4>{ petition.name}</h4>
               </div>
    
               <div className={styles.imgParent}>
                  <img alt={ petition.name} src={ petition.image} className={styles.singlePetitionImg}  />
               </div>

               <button className={styles.interestBtn}>Follow</button>
               <button  className={styles.interestBtn}>like</button>

               <footer>         
                 <p className={styles.singlePetitionInfo}>
                    <strong>{ petition.info}</strong>
                 </p> 
              </footer>       
        </article>
      </div>
      </>
);
}
 
export default PageWithId;