import styles from './Petition.module.css'
import Link from 'next/link'
import { Petition as IPetition } from '../types';

interface Props {
  item: IPetition
}

const Petition = ({ item }: Props) => {
  const shortendDescription = item.description.substring(0, 290);

    return (  
      <>
        <article className={styles.singlePetition}>
        <footer className={styles.foot}>
          <div className={styles.PetitionName}>
            <h4>{item.title}</h4>  
          </div>
          <p className={styles.singlePetitionInfo}>
               {`${shortendDescription}...`}
          </p>  
          <button className={styles.interestBtn} >
          <Link href={{ pathname: `/petitionPageId/${item.id}` }}>
             Read More
          </Link>
         </button>
        </footer>
       </article>
      </>
    
    );
}
 
export default Petition;