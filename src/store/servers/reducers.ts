import {
    SET_SERVERS,
    ServerState,
    SetServerAction,
    ServersObj,
} from './types';
import Server from '../../interfaces/Server';

const initialState: ServerState = {
    servers: {}
}

const convertServerToObjects = (servers: Array<Server>) : ServersObj => {
    const serverObj: ServersObj = {}
    servers.forEach((server) => {
        if(server.id){
            serverObj[server.id] = server
        }
    })

    return serverObj
}


export const setServerReducer = (state = initialState, action:SetServerAction) : ServerState => {
    switch (action.type) {
        case SET_SERVERS:
          return {
            ...state,
            servers: convertServerToObjects(action.payload)
          };
        default:
          return state;
      }
}