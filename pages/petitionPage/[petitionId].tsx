import { useRouter } from 'next/router'
import { useContext } from 'react';
import { UserContext } from "../../components/petitions/Petition"

const id = () => {

    const name =  useContext(UserContext);

    const router = useRouter()
    const { petitionId } = router.query
   
    return ( 
     
     <h1>Hi {name}</h1>
     );
}
 
export default id;