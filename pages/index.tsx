import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import Petitions from '../components/petitions/Petitions'
import styles from '../styles/Home.module.css'
import * as types from '../components/petitions/types'

const Home: NextPage = () => {
  const url = 'https://course-api.com/react-tours-project'
   
  const [petitions, setPetitions] = useState<types.Petitions>([])  
  const fetchTours = async () => {
      const response = await fetch(url)
      const petitions = await response.json()
      setPetitions(petitions)
   
    }
    // const countInterest = (id) => {
    //   const newPetition = petitions.filter((petitions) => {
    //     if (petitions.id === id)
    //     {
    //       petitions.interest++
    //     }
    //   })
    //   setPetitions(newPetition)
    // }
    useEffect(() => {
      fetchTours()
    }, [])
    
  return (
    <>
   
    <div className={styles.container}>
    <NavBar/>
    <Petitions  petitions={petitions}/>
    </div>
    </>
    
  )
}

export default Home
