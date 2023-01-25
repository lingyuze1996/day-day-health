import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    userPoolId: 'ap-southeast-2_8wQY7je7w',
    region: 'ap-southeast-2',
    userPoolWebClientId: '1ulb350s6u8a4efebc44la1ku4',
  },
  // API: {
  //   endpoints: [
  //     {
  //       name: '',
  //       endpoint: '',
  //     },
  //   ],
  // },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
