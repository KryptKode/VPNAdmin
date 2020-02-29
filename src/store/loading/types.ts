export const TOGGLE_LOADING = 'TOGGLE_LOADING';


export interface ToggleLoadingAction{
    type: typeof TOGGLE_LOADING,
    payload: boolean

}

export interface ToggleLoadingState{
    isLoading:boolean
}