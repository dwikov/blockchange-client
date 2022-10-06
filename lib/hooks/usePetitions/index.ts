import { useContract, useSigner } from "wagmi";
import { useEffect, useState, useCallback, useContext, createContext, useMemo } from "react";
import contractJSON from "lib/contracts/Petitions/Petitions.json";
import { Petition as IPetition } from "components/Petitions/types";
import { listenToEvents, removeListeners, createEvents, clearEvents } from './eventHandlers';
import { IPetitionMap } from "./types";
import useIpfs from "lib/hooks/useIpfs";
import { getPetitionsMap } from "./utils";

interface IPetitionsContext{
  value: IPetitionMap,
  setter: (_value: IPetitionMap) => void
}

export const PetitionsContext = createContext<IPetitionsContext>({value: {}, setter: (_value: IPetitionMap) => {}});

const usePetitions = () => {
  const { value: petitions, setter: setPetitions } = useContext(PetitionsContext);
  const [petitionsList, setPetitionsList] = useState<IPetition[]>([]);

  const { data: signer, isError, isLoading } = useSigner();
  const { upload, retrieve } = useIpfs();

  const contract = useContract({ addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, contractInterface: contractJSON.abi, signerOrProvider: signer});

  useEffect(() => {
    createEvents((petitions: IPetitionMap) => setPetitions(petitions), retrieve);

    return () => clearEvents();
  }, []);

  useEffect(() => {
    setPetitionsList(Object.values(petitions));
  }, [petitions]);

  useEffect(() => {
    if(!signer)return;

    getPetitionsMap(contract, retrieve)
      .then(setPetitions)
      .catch(console.error);

  }, [signer]);

  
  useEffect(() => { 
    if(!petitions || isLoading || !signer)return;
    
    listenToEvents();
    return () => { removeListeners() };
  }, [petitions, isLoading, signer, contract]);

  const addPetitionCallback = useCallback(async (data: any) => {
    if(!signer)return;

    const title = data['title']
    const description = data['description'];
    const cid = await upload(description);

    await contract.addPetition(title, cid?.toString()).catch((e: any) => console.log(e));
  }, [signer]);

  const voteCallback = useCallback((id: number) => {
    if(!signer)return;

    contract.vote(id).catch((e: any) => console.log(e));
  }, [signer]);

  const getPetitionById = (id: string) => petitions[id];

  return {
    petitions,
    petitionsList,
    getPetitionById,
    setPetitions,
    addPetitionCallback,
    voteCallback
  }
}

export default usePetitions;