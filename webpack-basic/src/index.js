import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProfileImage from './assets/user.png';
import './index.css';
function App(){
  return (
    <div className='app'>
      <h1>hello,world</h1>
      <img src={UserProfileImage} />
      <img src="/public/assets/user.png" />
    </div>
  )
}

const container = document.querySelector('#root');
ReactDOM.createRoot(container).render(<App />);