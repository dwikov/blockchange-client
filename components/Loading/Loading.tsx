import LoadingGif from 'assets/images/loading.gif';
import Image from 'next/image';
import { LoadingContext } from 'pages/_app';
import { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loading = () => {
  const loading = useContext(LoadingContext);

  return <div>
    {
      loading.value && <Container>
        <Image src={LoadingGif} layout='fixed' height={100} width={100}/>
        <div>{loading.value}</div>
      </Container>
    }
  </div>  
}

export default Loading;