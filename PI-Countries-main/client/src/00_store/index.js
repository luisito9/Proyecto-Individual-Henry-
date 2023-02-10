import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //middleware que nos permite retornar funciones, en lugar
//                                 de solo acciones en Redux. Esto nos permite trabajar con 
//                                 acciones retrasadas y promesas.ej: axios
import rootReducer from '../01_reducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
