import { applyMiddleware, compose, createStore } from "redux";

import { createLogger } from "redux-logger";
import rootReducer from './reducers';
import thunk from "redux-thunk";

let logger = createLogger({
    timestamps: true,
    duration: true
});

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk, logger))
)
export default store