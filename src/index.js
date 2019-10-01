import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
// import App from './pureReactClassComponent/App'; // 使用純粹react class-base component
import App from './pureReactUsingHook/App'; // 使用純粹react function component

ReactDOM.render(<App />, document.getElementById('root'));
