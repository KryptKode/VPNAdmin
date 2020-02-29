import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { setServers } from "../store/servers/actions";
import { toggleLoading } from "../store/loading/actions";
import { displayError } from "../store/showerror/actions";
import { AppState } from "../store";
import Server from "../interfaces/Server";
import { errorHandler } from "./errorHandler";
import { doGetServers } from "./API";

export const getServers = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(displayError({ show: false }));
        dispatch(toggleLoading(true));
        const response = await doGetServers();
        dispatch(setServers(response.data as Array<Server>));
        dispatch(toggleLoading(false));
    } catch (err) {
        dispatch(toggleLoading(false));
        const message = errorHandler(err)
        dispatch(displayError({ message: message, show: true }))
    }
};
