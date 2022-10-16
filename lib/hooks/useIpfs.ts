import { CID, create } from "ipfs-http-client";
import { ImportCandidate } from "ipfs-core-types/src/utils";

const projectId = '2Fgq02xbWsiyBTRLoAIo7Svf1Lv';
const projectSecret = '6282b9fa5b8f11fcbdc7097b546cdfe3';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});

const useIpfs = () => {
  const upload = async (file: ImportCandidate) => {
    try {
      const { cid } = await client.add(file);
      return cid;
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const retrieve = async (cid: CID): Promise<string> => {
    try {
      const stream = client.cat(cid);
      const decoder = new TextDecoder();
      let data = '';

      for await (const chunk of stream) {
        // chunks of data are returned as a Uint8Array, convert it back to a string
        data += decoder.decode(chunk, { stream: true })
      }

      return data;
    } catch (error){
      return Promise.resolve('');
    }
  };

  return {
    upload,
    retrieve
  };
};

export default useIpfs;