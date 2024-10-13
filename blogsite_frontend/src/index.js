import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG02QZ1xRB37ERpcWxInU4xW2YgINQh7I",
    authDomain: "capslockcw.firebaseapp.com",
    projectId: "capslockcw",
    storageBucket: "capslockcw.appspot.com",
    messagingSenderId: "1048350002089",
    appId: "1:1048350002089:web:02443ba2d4a9b9dd4652b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
