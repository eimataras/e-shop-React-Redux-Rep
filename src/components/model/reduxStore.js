import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import  rootReducer from './root-reducer';



const composerEnhancer = composeWithDevTools({});

export default function configureStore () {
    return createStore(
        rootReducer,
        composerEnhancer(
            applyMiddleware(thunk)
        )
    )
}