import { useState } from "react";
import styles from './Petition.module.css'
import Link from 'next/link'
import {createContext, useContext} from "react"
interface Props{
  id:string,
  image:string,
  info:string,
  name:string,
}

export const UserContext = createContext('Default') 


const petition= ({ id, image, info, name}:Props) => {

    return (  
      <>
      <UserContext.Provider value="Not default"/>
        <article className={styles.singlePetition}>
     
        <img src={image} alt={name} className={styles.singlePetitionImg}  />
        <footer>
          <div className={styles.PetitionName}>
            <h4>{name}</h4>
            
          </div>
          <p className={styles.singlePetitionInfo}>
          {  `${info.substring(0, 200)}...`}
       
          </p>
          <button className={styles.interestBtn} >
         
         <Link href={`/petitionPage/${id}`} >
         Read More
        </Link>
          </button>
        </footer>
      </article>
      </>
    
    );
}
 
export default petition;