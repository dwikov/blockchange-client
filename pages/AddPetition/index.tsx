import NavBar from "../../components/NavBar/NavBar";
import styles from './AddPetition.module.css'
import { useForm } from 'react-hook-form';
import usePetitions from "lib/hooks/usePetitions";
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface IForm{
  title: string;
  description: string;
  image: File;
}

const AddPetition = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { addPetitionCallback } = usePetitions();
  const router = useRouter();

  const handleSubmitCallback = useCallback(
    async (e: React.FormEvent) => {
      await handleSubmit(addPetitionCallback)(e);
      router.push('/feed')
    },
    [addPetitionCallback],
  );
  
  
  return ( 
       <div className={styles.container}>
         <NavBar/>
         <div>
          <h2 className={styles.CreateTitle}>Add Petition</h2>
          <form onSubmit={handleSubmitCallback}>
            <div className={styles.Title}>
                 <input
                 className={styles.TitleText}
                 type="text"
                 required
                 {...register("title", { required: true })}
                placeholder="Write your petition title here"
             />
               {errors.title && <span>This field is required</span>}
            </div>

            <div className={styles.Petition}>
                <textarea
                  className={styles.PetitionText}
                  required
                  {...register("description", { required: true })}
                  placeholder="Write your petition here"
                />
                {errors.description && <span>This field is required</span>}
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