import styles from './Petition.module.css'
import Link from 'next/link'
import { Petition as IPetition } from '../types';
import styled from 'styled-components';
import Image from 'next/image';
import Sample from 'assets/images/sample.png';
import { AiFillLike } from "react-icons/ai";
import { FormatVote } from './FormatVote';

interface Props {
  item: IPetition
}

const DetailsContainer = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 20px;
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  width: 60%;

`;

const Container = styled.div`
  display: flex;
  border-color: ${props => props.theme.palette.common.grey};
  border-style: solid;
  margin-top: 40px;
  width: 60%;
  height: 300px;
  
`;

const Button = styled.div`
  border-style: solid;
  text-align: center;
  line-height: 50px;
  margin-right: auto;
  width: 151px;
  background-color: ${props => props.theme.palette.primary.main};
  border-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};
  margin-bottom: 20px;
  &:hover{
    cursor: pointer;
  }
`;

const H4 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`
const H3 = styled.div`
  position:absolute;
  width:40px;
  height:40px;
  font-weight: bold;
  font-size: 20px;
  right:10%

`
const DIV=styled.div`
position:relative;
`

const Petition = ({ item }: Props) => {
 
  const shortDescription = ()=>{

   if(item.description.length>200)
    return item.description.substring(0, 200)+'...';
    else return item.description
    }
  
  
    return (  
      <Container>
          <Image src={Sample} layout="intrinsic" width={"300"} />
          <DetailsContainer>
            <H4>{item.title}</H4>  
            <div>
                {`${shortDescription()}`}
            </div>  
            <div>
           
            </div>
            <DIV>
            <AiFillLike style={{width:'40px',height:'40px',color:'#cf3636',  position:'absolute',right:'16%'}}/>
            <H3>{FormatVote(item.votersCount)}</H3>
            <Link href={{ pathname: `/petitionPageId/${item.id}` }}>
              <Button>Read More</Button>
            </Link>
            </DIV>
            
          </DetailsContainer>
      </Container>
    );
}
 
export default Petition;