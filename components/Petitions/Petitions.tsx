import React from "react";
import { Petition as IPetition } from "./types";
import styles from './Petitions.module.css'
import Link from "next/link";
import Petition from "./Petition/Petition";
import usePetitions from "lib/hooks/usePetitions";
import styled from "styled-components";
import Loading from "components/Loading/Loading";

const Container = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Petitions = () => {
  const { petitionsList } = usePetitions();

  return <div>
    <Container>
      { petitionsList.map( (petition: IPetition) => {
          return <Petition key={petition.id.toString()}  item={petition}  />;
        })
      }
    </Container>
  </div>;
};

export default Petitions;