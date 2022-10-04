import { useRouter } from 'next/router'
import * as types from '../../components/petitions/types'
import styles from "./id.module.css"
import NavBar from '../../components/NavBar/NavBar'
const id = () => {

    const router = useRouter()

    const  petition  = router.query
    return ( 
    
               <>
                <NavBar/>
               <article className={styles.singlePetition}>
               <div className={styles.PetitionName}>
               
                   <h4>{ petition.name}</h4>
             
                 </div>
           
                 <div className={styles.imgParent}>
               <img src={ petition.image} alt={ petition.name} className={styles.singlePetitionImg}  />
               </div>
               <button className={styles.interestBtn}>Follow</button>
               <button  className={styles.interestBtn}>like</button>
               
               <footer>
            
                 <p className={styles.singlePetitionInfo}>
                 { petition.info}
          
                 </p>
           
               </footer>
          
             </article>
             </>
);
}
 
export default id;