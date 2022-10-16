import { useRouter } from 'next/router'
import styles from './PageWithId.module.css'
import NavBar from '../../components/NavBar/NavBar'
import usePetitions from 'lib/hooks/usePetitions'
import { useEffect, useState } from 'react';
import { Petition } from 'components/Petitions/types';

const PageWithId = () => {
   const router = useRouter();
   const { petitionId } = router.query;

   const { getPetitionById, voteCallback } = usePetitions();
   const [currentPetition, setCurrentPetition] = useState<Petition | undefined>(undefined);
   
   const petitionIdIsString = (petitionId: string | string[]): petitionId is string => {
      return (petitionId as string) !== undefined;
   }
   
   useEffect(() => {
      petitionId && petitionIdIsString(petitionId) && setCurrentPetition(getPetitionById(petitionId));
   }, [petitionId, getPetitionById]);
   
   if(!petitionId || !petitionIdIsString(petitionId))return null;

   return ( 
      <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
   <link rel="preconnect" href="https://fonts.gstatic.com" />
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet"/>
      <div className={styles.container}>
         <NavBar/>
         { currentPetition && <article className={styles.singlePetition}>
      <div className={styles.PetitionName}>          
         <h4>{ currentPetition.title}</h4>
      </div>

      {/* <div className={styles.imgParent}>
         <img alt={ currentPetition.title} src={ petition.image} className={styles.singlePetitionImg}  />
      </div> */}

      <button className={styles.interestBtn}>Follow</button>
      <button  className={styles.interestBtn} onClick={() => voteCallback(Number(petitionId))}>Sign this petition</button>
      <div> { currentPetition.votersCount } </div> 
      <footer>         
         <p className={styles.singlePetitionInfo}>
            <strong>{ currentPetition.description}</strong>
         </p> 
      </footer>       
   </article>}
      </div>
      </>
);
}
 
export default PageWithId;