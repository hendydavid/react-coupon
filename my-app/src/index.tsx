import React from 'react';
import ReactDOM from 'react-dom/client';
import './General/css-files/index.css';
import App from './General/App';
import { Provider } from 'react-redux';
import UserReducer from './General/forLearning/features/UserReducer';
import Theme from './General/forLearning/features/Teme'
import UpdateCompanySlice from './General/Redux/UpdateCompanySlice'
import UpdateCustomerSlice from './General/Redux/UpdateCustomerSlice'
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
reducer:{
user:UserReducer,
theme:Theme,
companyUpdate:UpdateCompanySlice,
updateCustomer:UpdateCustomerSlice,
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


