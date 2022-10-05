import { BigNumber } from "ethers";
import { CID } from "ipfs-http-client";

export interface PetitionInput{
    _id: BigNumber;
    votersCount: BigNumber;
    timeCreated: BigNumber;
    title: string;
    ipfsCID: CID;
}

export interface Petition{
    id: Number;
    votersCount: number;
    timeCreated: number;
    title: string;
    description: string;
}

export type Petitions = Petition[];

