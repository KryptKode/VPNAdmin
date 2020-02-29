import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { setServers } from "../store/servers/actions";
import { toggleLoading } from "../store/loading/actions";
import { displayError } from "../store/showerror/actions";
import { AppState } from "../store";
import getAPI from "./API";
import Server from "../interfaces/Server";
import { errorHandler } from "./errorHandler";

export const getServers = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    console.log("GET servers");
    try{
        dispatch(displayError({show: false}));
        dispatch(toggleLoading(true));
        const response = await getAPI().get(`/Servers`);
        dispatch(setServers(response.data as Array<Server>));
        dispatch(toggleLoading(false));
    }catch(err){
        dispatch(toggleLoading(false));
        const message = errorHandler(err)
        dispatch(displayError({message: message, show: true}))
        console.error(err);
    }
};
