import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import Petitions from "../../components/Petitions/Petitions"
import styles from './Feed.module.css'
import * as types from '../../components/Petitions/types'
const Feed = () => {
    const url = 'https://course-api.com/react-tours-project'
    const [petitions, setPetitions] = useState<types.Petitions>([])  
    const fetchPetitions = async () => {
    const response = await fetch(url)
    const petitions = await response.json()
    setPetitions(petitions)
  }
  
  useEffect(() => {
    fetchPetitions()  
  }, [])
  
    return ( 
        <>

        <div className={styles.container}>
             <NavBar/>
             <Petitions  petitions={petitions}/>
        </div>
      
        </>
     );
}
 
export default Feed;