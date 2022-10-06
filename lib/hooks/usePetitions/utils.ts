import { CID } from "ipfs-http-client";
import { PetitionInput, Petition } from "components/Petitions/types";
import { IPetitionMap } from "./types";

export const parsePetitionInput = async (petition: PetitionInput, retrieve: (cid: CID) => Promise<string>): Promise<Petition> => {
  const description = await retrieve(petition.ipfsCID);

  return {
    id: petition._id.toNumber(),
    title: petition.title,
    timeCreated: petition.timeCreated.toNumber(),
    votersCount: petition.votersCount.toNumber(),
    description,
  }
}

export const getPetitionsMap = async (contract: any, retrieve: any) => {
  const petitionsLength = await contract.petitionsCount();
  const indices = Array.from(Array(petitionsLength.toNumber()).keys());
  const petitionsPromises = indices.map(index => contract.petitions(index));

  const petitionsInput = await Promise.all(petitionsPromises);

  const petitionsList = await Promise.all(petitionsInput.map((petitionInput) => parsePetitionInput(petitionInput, retrieve)));

  return petitionsList.reduce((map: IPetitionMap, petition: Petition) => ({ ...map, [petition.id]: petition}), {});
}