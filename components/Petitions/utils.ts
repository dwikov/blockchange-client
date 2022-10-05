import { CID } from "ipfs-http-client";
import { PetitionInput, Petition } from "./types";

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