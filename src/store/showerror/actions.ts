import {
    DISPLAY_ERROR,
    DisplayErrorAction,
    DisplayError
} from './types';

export const displayError = (displayError: DisplayError): DisplayErrorAction => {
    return {
        type: DISPLAY_ERROR,
        payload: displayError,
    }
}