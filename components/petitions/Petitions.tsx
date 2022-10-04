import Petition from "./Petition";
import * as types from './types'
import styles from './Petitions.module.css'

interface Props{
    petitions: types.Petitions;
}

const Petitions = ({ petitions } : Props) => {
   
    return (  
        <div >
            <select className={styles.format}>
  <option value="Recent"> Recent Petition</option>
  <option value="New"> New Petition</option>
  <option value="Your"> Your Petition</option>
</select>
       

        <div>
        {petitions.map((petition:types.Petition) => {
          return <Petition key={petition.id}{...petition}  />;
        })}
      </div>
        </div>
    );
}
 
export default Petitions;