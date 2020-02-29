import {
    TOGGLE_LOADING,
    ToggleLoadingState,
    ToggleLoadingAction,
} from './types';

const initialState: ToggleLoadingState = {
    isLoading: false
}


export const toggleLoadingReducer = (state = initialState, action:ToggleLoadingAction) : ToggleLoadingState => {
    switch (action.type) {
        case TOGGLE_LOADING:
          return {
            isLoading: action.payload
          };
        default:
          return state;
      }
}