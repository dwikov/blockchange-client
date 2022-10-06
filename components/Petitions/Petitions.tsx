import React from "react";
import { Petition as IPetition } from "./types";
import styles from './Petitions.module.css'
import Link from "next/link";
import Petition from "./Petition/Petition";
import usePetitions from "lib/hooks/usePetitions";

const Petitions = () => {
  const { petitionsList } = usePetitions();

  return <div>
      <select className={styles.format}>
          <option value="Recent"> Recent Petition</option>
          <option value="New"> New Petition</option>
          <option value="Your"> Your Petition</option>
      </select>
      <Link href="/AddPetition">
      <button className={styles.Btn}>
        Add Petition
      </button>
      </Link>
    <div>
      { petitionsList.map( (petition: IPetition) => {
          return <Petition key={petition.id.toString()}  item={petition}  />;
        })
      }
    </div>
  </div>;
};

export default Petitions;