import NavBar from "../../components/NavBar/NavBar";
import styles from './AddPetition.module.css'
import { useForm } from 'react-hook-form';
import usePetitions from "lib/hooks/usePetitions";
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
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
  const Button = styled.button`
  border-style: solid;
  text-align: center;
  line-height: 50px;
  font-size:19px;
  width: 151px;
  background-color: ${props => props.theme.palette.primary.main};
  border-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};
  margin-bottom: 20px;
  &:hover{
    cursor: pointer;
  }
  display:flex
  flex-direction: row;
  align-items: center;
   margin-top:30px;
  
 
`;
const ButtonPosition= styled.div`
padding: 4px 0;
text-align: center;
`
  
  return ( 
  

 
       <div className={styles.container}>
       <NavBar/>  
         <div style={{padding:'10%'}}>
     
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

            <ButtonPosition >
             <Button>
                 Submit  
              </Button>
            </ButtonPosition>
        </form>
      </div>
  </div>

     );
}
 
export default AddPetition;