import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import Petitions from "components/Petitions/Petitions"
import styles from './feed.module.css'
import * as types from '../../components/Petitions/types'

const feed = () => {
  return ( 
      <div className={styles.container}>
        <NavBar/>
        <Petitions/>
      </div>
    );
}
 
export default feed;