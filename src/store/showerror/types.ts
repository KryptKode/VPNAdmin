export const DISPLAY_ERROR = 'DISPLAY_ERROR';

export interface DisplayError{
    message?:string,
    show:boolean
}

export interface DisplayErrorAction{
    type: typeof DISPLAY_ERROR,
    payload: DisplayError

}

export interface DisplayErrorState{
    displayError:DisplayError
}