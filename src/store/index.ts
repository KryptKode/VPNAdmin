import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { setServerReducer } from "./servers/reducers";
import { toggleLoadingReducer } from "./loading/reducers";
import { displayErrorReducer} from "./showerror/reducers";

const rootReducer = combineReducers({
  servers: setServerReducer,
  loading:toggleLoadingReducer,
  showError:displayErrorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
