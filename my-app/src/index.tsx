import React from 'react';
import ReactDOM from 'react-dom/client';
import './css-files/index.css';
import App from './General/App';
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import UserReducer from './General/forLearning/features/UserReducer';
import Theme from './General/forLearning/features/Teme'


const store = configureStore({
reducer:{

user: UserReducer,
theme:Theme,
}  

})




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
   
  </React.StrictMode>
);


