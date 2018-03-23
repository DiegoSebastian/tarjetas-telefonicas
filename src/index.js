import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Componentes/App/App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyAH0N0v7dlez4FxeEvZjtRgn9SE1NX4UKs",
    authDomain: "tarjetas-telefonicas.firebaseapp.com",
    databaseURL: "https://tarjetas-telefonicas.firebaseio.com",
    projectId: "tarjetas-telefonicas",
    storageBucket: "tarjetas-telefonicas.appspot.com",
    messagingSenderId: "10462152638"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
