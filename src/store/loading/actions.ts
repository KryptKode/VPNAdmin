import {TOGGLE_LOADING, ToggleLoadingAction} from './types';

export const toggleLoading = (isLoading:boolean) : ToggleLoadingAction=> {
    return {
        type :TOGGLE_LOADING,
        payload: isLoading,
    }
}