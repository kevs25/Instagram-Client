import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginComponent/LoginPage';
import App from './App'
import SignupPage from './LoginComponent/SignupPage';
import ImageUploadPage from './ImageUploadModal';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/App" element={<App />} />
      <Route path="/SignUpPage" element={<SignupPage />}/>
      <Route path="/ImageUploadPage" element={<ImageUploadPage />} />
      
    </Routes>
  </Router>
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

