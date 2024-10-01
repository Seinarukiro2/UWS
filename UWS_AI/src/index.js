// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Импортируем главный компонент приложения
import './index.css'; // Стили по умолчанию

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Рендерим приложение в корневой элемент
);
