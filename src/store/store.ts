import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import tabReducer from "./tab/tabReducer";
import marketReducer from "./market/marketReducer";

const rootReducer = combineReducers({ tabReducer, marketReducer });

export type rootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
