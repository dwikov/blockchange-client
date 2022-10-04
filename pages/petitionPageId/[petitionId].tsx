import { useRouter } from 'next/router'
import styles from "./PageWithId.module.css"
import NavBar from '../../components/NavBar/NavBar'

const PageWithId = () => {

    const router = useRouter()
    const  petition  = router.query

    return ( 
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
                    { petition.info}
                 </p> 
              </footer>       
        </article>
      </div>
);
}
 
export default PageWithId;