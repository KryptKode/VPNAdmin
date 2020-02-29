import {SET_SERVERS} from './types';
import Server from '../../interfaces/Server';

export const setServers = (servers: Array<Server>)=> {
    return {
        type :SET_SERVERS,
        payload: servers,
    }
}