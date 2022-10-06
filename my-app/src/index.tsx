import React from 'react';
import ReactDOM from 'react-dom/client';
import './css-files/index.css';
import App from './components/App';
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import UserReducer from './features/UserReducer';
import Theme from './features/Teme'


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


