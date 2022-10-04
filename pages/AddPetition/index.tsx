import NavBar from "../../components/NavBar/NavBar";
import styles from './AddPetition.module.css'
import { useForm } from 'react-hook-form';
const AddPetition = () => {
    const { register, handleSubmit,formState: { errors } } = useForm();

    const onSubmit = async () => {
    
          window.location.pathname = "/Feed";     
      };

    return ( 
       
       <div className={styles.container}>
         <NavBar/>
         <div>
          <h2 className={styles.CreateTitle}>Add Petition</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.Title}>
                 <input
                 className={styles.TitleText}
                 type="text"
                 required
                 {...register("Title", { required: true })}
                placeholder="Write your petition title here"
             />
               {errors.Title && <span>This field is required</span>}
            </div>

            <div className={styles.Petition}>
                 <textarea
                 className={styles.PetitionText}
                 required
                 {...register("Body", { required: true })}
                 placeholder="Write your petition here"
                 />
                {errors.Body && <span>This field is required</span>}
                <br/>
                <br/>    
                <input type="file" id="imageupload" multiple accept="image/*"  required {...register('image')}  className={styles.Upload}/>
                {errors.image && <span>This field is required</span>}
             </div>

            <div className={styles.bottom}>
                <button
                className={styles.button}
                type="submit">
                Submit
                </button>
            </div>
        </form>
      </div>
  </div>
       
     );
}
 
export default AddPetition;