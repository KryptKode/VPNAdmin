import {
    DISPLAY_ERROR,
    DisplayErrorAction,
    DisplayErrorState,
} from './types';

const initialState: DisplayErrorState = {
    displayError: {
      message: '',
      show: false
    }
}


export const displayErrorReducer = (state = initialState, action:DisplayErrorAction) : DisplayErrorState => {
    switch (action.type) {
        case DISPLAY_ERROR:
          return {
            displayError: action.payload
          };
        default:
          return state;
      }
}