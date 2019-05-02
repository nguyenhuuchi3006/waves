import React from 'react';
import ReactDOM from 'react-dom';

import './Resources/css/styles.css';

import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';                          // 2 cái này chưa hiểu
import ReduxThunk from 'redux-thunk';

import Routes from './routes';
import Reducer from './reducers';

const createStoreWithMiddleware =  applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);

ReactDOM.render(                                    //      này để dùng cho redux dev tool trên chrome
    <Provider store={createStoreWithMiddleware(Reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
    

, document.getElementById('root'));



// dùng react-router thì 
// - gói tất cả vào <BrowserRouter/>