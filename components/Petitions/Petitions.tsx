import { BigNumber } from "ethers";
import { CONTRACT_ADDRESS } from "lib/contracts/Petitions/constants";
import contractJSON from "lib/contracts/Petitions/Petitions.json";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useContract, useSigner, useContractEvent } from "wagmi";
import { IPFS, create } from "ipfs-core";

export const Petitions = () => {
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({ addressOrName: CONTRACT_ADDRESS, contractInterface: contractJSON.abi, signerOrProvider: signer});
  const [petitions, setPetitions] = useState([]);
  const [node, setNode] = useState<IPFS | null>(null);

  useContractEvent({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractJSON.abi,
    eventName: 'PetitionCreated',
    listener: (event) => console.log(event),
  });

  useEffect(() => {
    create().then((_node: IPFS)  => setNode(_node));
  }, []);

  useEffect(() => {
    if(isLoading)return;

    contract.petitionsCount().then((len: BigNumber) => len.toNumber()).then((len: number) => {
      const indices = Array.from(Array(len).keys());
      console.log(indices)
      const petitionsPromises = indices.map(index => contract.petitions(index));
      return Promise.all(petitionsPromises);
    }).then(setPetitions);
  }, [isLoading]);

  const addPetitionCallback = useCallback((event: FormEvent) => {
    if(isLoading)return;
    const title = event.target;
    console.log(title);
    contract.addPetition().catch(e => console.log(e));
    
  }, [isLoading]);

  const voteCallback = useCallback((id: number) => {
    if(isLoading)return;

    contract.vote(id).catch(e => console.log(e));
  }, [isLoading]);

  return <>
    <form onSubmit={addPetitionCallback}>
      <input type="text" name="title"/>
      <input type="submit"/>
    </form>
    { petitions.map((petition, index) => <button onClick={() => voteCallback(index)} key={index}>{index}</button>) }
  </>;
};