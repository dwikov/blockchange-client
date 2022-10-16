import { ethers } from "ethers";
import { WebSocketProvider } from '@ethersproject/providers';
import contractJSON from "lib/contracts/Petitions/Petitions.json";
import { Petition } from "components/Petitions/types";

interface IEventHandler{
  filter: {
    address: string,
    topics: string[]
  },
  cb: (log: any) => any
}

export const parseEventHandler = (eventInterface: string, cb: (log: any) => any): IEventHandler => {
  return {
    filter: {
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      topics: [
        ethers.utils.id(eventInterface)
      ]
    },
    cb: cb
  }
}

function eventHandlers(_webSocketProvider: WebSocketProvider) {
  let webSocketProvider: WebSocketProvider | undefined = _webSocketProvider;
  let events: IEventHandler[] = [];
  
  const addEvent = (eventInterface: string, cb: any) => {
    events.push(parseEventHandler(eventInterface, cb));
  }

  const clearEvents = () => {
    events = [];
  }

  const setWebSocket = (_webSocketProvider: WebSocketProvider) => {
    webSocketProvider = _webSocketProvider;
  }

  const listenToEvents = () => {
    events.forEach(event => webSocketProvider && webSocketProvider.on(event.filter, event.cb));
  }

  const removeListeners = () => {
    events.forEach(event => webSocketProvider && webSocketProvider.off(event.filter, event.cb));
  }

  return {
    addEvent,
    clearEvents,
    setWebSocket,
    listenToEvents,
    removeListeners
  }
} 

const eventHandlersInstance = eventHandlers(new ethers.providers.WebSocketProvider(process.env.NEXT_PUBLIC_WEBSOCKET_API_KEY));

export const createEvents = (setter: any, retriever: any) => {
  [
    {
      eventInterface: 'PetitionCreated(uint256,uint256,string,string)',
      cb: async (log: any) => {
        const iface = new ethers.utils.Interface(contractJSON.abi);
        const event = iface.parseLog(log);
      
        const newPetition: Petition = {
          id: parseInt(event.args[0]._hex.toString()),
          votersCount: 0,
          timeCreated: parseInt(event.args[1]._hex.toString()),
          title: event.args[2],
          description: await retriever(event.args[3]),
        }
      
        setter((prev: any) => prev && {...prev, [newPetition.id]: newPetition });
      }
    },
    {
      eventInterface: 'UserVoted(uint256,uint256)',
      cb: async (log: any) => {
        const iface = new ethers.utils.Interface(contractJSON.abi);
        const event = iface.parseLog(log);
        const id = parseInt(event.args[0]._hex.toString());
        const votersCount = parseInt(event.args[1]._hex.toString());

        setter((prev: any) => prev && {...prev, [id]: { ...prev[id],  votersCount: votersCount }});
      }
    },
    
  ].forEach(({ eventInterface, cb }) => eventHandlersInstance.addEvent(eventInterface, cb));
} 

export const { clearEvents, setWebSocket, listenToEvents, removeListeners } = eventHandlersInstance;