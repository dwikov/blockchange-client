import { BigNumber } from "ethers";
import { CONTRACT_ADDRESS } from "lib/contracts/Petitions/constants";
import contractJSON from "lib/contracts/Petitions/Petitions.json";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useContract, useSigner, useContractEvent, useWebSocketProvider } from "wagmi";
import useIpfs from "lib/hooks/useIpfs";
import { PetitionInput, Petition } from "./types";
import { parsePetitionInput } from "./utils";
import { ethers } from "ethers";
import { WebSocketProvider } from '@ethersproject/providers';

export const Petitions = () => {
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({ addressOrName: CONTRACT_ADDRESS, contractInterface: contractJSON.abi, signerOrProvider: signer});
  const [petitions, setPetitions] = useState<Petition[] | null>(null);
  const { upload, retrieve } = useIpfs();
  const [webSocketProvider, setWebSocketProvider] = React.useState<WebSocketProvider | undefined>(undefined);

  useEffect(() => {
    setWebSocketProvider(new ethers.providers.WebSocketProvider('wss://eth-goerli.g.alchemy.com/v2/4O71MxXZUM45SG48jQYXt9puA81GbWzO'));
  }, []);

  useEffect(() => {
    if(!webSocketProvider || !petitions || isLoading)return;
    const filter = {
      address: CONTRACT_ADDRESS,
      topics: [
          // the name of the event, parnetheses containing the data type of each event, no spaces
          ethers.utils.id("PetitionCreated(uint256)")
      ]
    };
    webSocketProvider.on(filter, (log: any) => {
      console.log(petitions.length);
      contract.petitions(petitions.length)
        .then((petitionInput: PetitionInput) => parsePetitionInput(petitionInput, retrieve))
        .then(console.log);
    });
  }, [webSocketProvider, petitions, isLoading]);

  useEffect(() => {
    if(isLoading)return;

    contract.petitionsCount().then((len: BigNumber) => len.toNumber()).then((len: number) => {
      const indices = Array.from(Array(len).keys());
      const petitionsPromises = indices.map(index => contract.petitions(index));
      return Promise.all(petitionsPromises);
    }).then((petitionsInput: PetitionInput[]) => petitionsInput.map((petitionInput) => parsePetitionInput(petitionInput, retrieve)))
      .then((petitions: Promise<Petition>[])=> Promise.all(petitions))
      .then(setPetitions)
      .catch(console.error);
  }, [isLoading]);

  const addPetitionCallback = useCallback(async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(isLoading || !upload )return;
    const title = (event.target[0] as HTMLInputElement).value;;
    const description = (event.target[1] as HTMLInputElement).value;
    const cid = await upload(description);

    contract.addPetition(title, cid?.toString()).catch(e => console.log(e));
  }, [isLoading, upload]);

  const voteCallback = useCallback((id: number) => {
    if(isLoading)return;

    contract.vote(id).catch(e => console.log(e));
  }, [isLoading]);

  return <>
    <form onSubmit={addPetitionCallback}>
      <input type="text" name="title"/>
      <input type="text" name="description"/>
      <input type="submit"/>
    </form>
    { petitions && petitions.map((petition: Petition, index) => <button onClick={() => voteCallback(index)} key={index}>{petition.title}</button>) }
  </>;
};