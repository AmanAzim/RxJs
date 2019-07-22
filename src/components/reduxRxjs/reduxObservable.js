import {createStore, applyMiddleware} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import reducer from './store'

const epicMiddleWare=createEpicMiddleware();

const store=createStore(reducer, applyMiddleware(epicMiddleWare));

epicMiddleWare.run(vvv);

store.dispatch({type:'INCREMENT'})