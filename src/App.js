import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  //обработка ввода
  const handleInputChange = (e) => {
    const value = e.target.value;
    //разрешаем только цифры
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  //установка таймера 
  const handleSetTimer = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      setTimeLeft(num);
      setSeconds(num);
      setIsActive(false);
    }
  };

  //запуск/пауза
  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  };

  //сброс
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setSeconds(0);
    setInputValue('');
  };

  //эффект
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setIsActive(false);
            alert('Время вышло!');
          }
          return next;
        });
      }, 1000);
    } else if (!isActive && timeLeft !== seconds) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, seconds]);

  return (
    <div className="App">
      <h1>Таймер обратного отсчёта</h1>
      <div className="timer-display">
        <span>{String(timeLeft).padStart(2, '0')}</span>
        <span> секунд</span>
      </div>
      {!isActive && timeLeft === 0 && (
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Введите секунды"
          />
          <button onClick={handleSetTimer}>Установить</button>
        </div>
      )}
      {timeLeft > 0 && (
        <div className="controls">
          <button onClick={toggleTimer}>
            {isActive ? 'Пауза' : 'Старт'}
          </button>
          <button onClick={handleReset}>Сброс</button>
        </div>
      )}
    </div>
  );
}

export default App;