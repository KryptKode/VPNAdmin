import Server from "../../interfaces/Server";

export const SET_SERVERS = 'SET_SERVERS';


export interface SetServerAction{
    type: typeof SET_SERVERS,
    payload: Array<Server>

}


export interface ServersObj {
    [key: string]: Server
}


export interface ServerState{
    servers: ServersObj
}


