import React from 'react';
import ReactDOM from 'react-dom';
import '@vkontakte/vkui/dist/vkui.css';
import App from './App';
import bridge from '@vkontakte/vk-bridge';

bridge.send('VKWebAppInit'); // Инициализация VK Bridge

ReactDOM.render(<App />, document.getElementById('root'));


export { Persik } from './Persik';
export { Home } from './Home';
